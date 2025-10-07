const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const { sendToZapier, formatSurveyDataForEmail } = require('./zapier-integration');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// Log environment on startup
console.log(`🚀 Starting Luni Backend in ${NODE_ENV.toUpperCase()} mode`);

// Initialize Supabase client (with proper validation)
let supabase = null;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (supabaseUrl && supabaseKey && 
    supabaseUrl.trim() !== '' && supabaseKey.trim() !== '' &&
    supabaseUrl !== 'your_supabase_project_url' && 
    supabaseKey !== 'your_supabase_service_role_key' &&
    !supabaseUrl.includes('your-project-url')) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized');
} else {
  if (IS_PRODUCTION) {
    console.error('❌ PRODUCTION WARNING: Supabase not configured! Survey data will not be saved.');
  } else {
    console.log('⚠️  Supabase not configured - running in development mode');
  }
}

// Initialize Plaid client
let plaidClient = null;
const plaidClientId = process.env.PLAID_CLIENT_ID;
const plaidSecret = process.env.PLAID_SECRET;
const plaidEnv = process.env.PLAID_ENV || 'sandbox';

if (plaidClientId && plaidSecret && 
    plaidClientId !== 'your-plaid-client-id' &&
    plaidSecret !== 'your-plaid-secret' &&
    plaidSecret !== 'your-plaid-production-secret') {
  const configuration = new Configuration({
    basePath: PlaidEnvironments[plaidEnv],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': plaidClientId,
        'PLAID-SECRET': plaidSecret,
      },
    },
  });
  plaidClient = new PlaidApi(configuration);
  console.log(`✅ Plaid client initialized (${plaidEnv} environment)`);
  
  // Warn if production app is using test environment
  if (IS_PRODUCTION && plaidEnv !== 'production') {
    console.warn(`⚠️  WARNING: Running in PRODUCTION mode but Plaid is set to '${plaidEnv}' environment!`);
    console.warn(`⚠️  Change PLAID_ENV to 'production' and use production Plaid credentials.`);
  }
} else {
  if (IS_PRODUCTION) {
    console.error('❌ PRODUCTION WARNING: Plaid not configured! Banking features will not work.');
  } else {
    console.log('⚠️  Plaid not configured - OAuth endpoints will not work');
  }
}

// Middleware
app.use(helmet());

// CORS configuration - allow multiple origins
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',');
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow Vercel deployments, localhost, and luni.ca domains (with and without www)
    if (allowedOrigins.indexOf(origin) !== -1 || 
        origin.includes('vercel.app') || 
        origin.includes('localhost') ||
        origin.includes('luni.ca')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Luni Backend API is running' });
});

// Plaid link token creation endpoint
// This creates a link_token for initializing Plaid Link in the mobile app
app.post('/api/plaid/link/token/create', async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    if (!plaidClient) {
      return res.status(503).json({ error: 'Plaid is not configured on the server' });
    }

    // Create a link token
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user_id,
      },
      client_name: 'Luni',
      products: ['transactions'],
      country_codes: ['CA'], // Canada
      language: 'en',
      redirect_uri: 'https://luni.ca/plaid-oauth', // OAuth redirect URI
    });

    res.json({ 
      link_token: response.data.link_token,
      expiration: response.data.expiration,
      request_id: response.data.request_id,
      success: true 
    });

  } catch (error) {
    console.error('Plaid link token creation error:', error);
    res.status(500).json({ 
      error: error.response?.data?.error_message || 'Failed to create link token',
      details: error.message 
    });
  }
});

// Plaid public token exchange endpoint
// This exchanges a public_token (from Plaid Link) for an access_token
app.post('/api/plaid/token/exchange', async (req, res) => {
  try {
    const { public_token, user_id } = req.body;

    if (!public_token) {
      return res.status(400).json({ error: 'public_token is required' });
    }

    if (!plaidClient) {
      return res.status(503).json({ error: 'Plaid is not configured on the server' });
    }

    // Exchange the public_token for an access_token
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: public_token
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    
    // Here you would typically save the access_token and item_id to your database
    // associated with the user_id
    if (supabase && user_id) {
      try {
        await supabase
          .from('plaid_items')
          .insert([{
            user_id: user_id,
            access_token: accessToken,
            item_id: itemId,
            created_at: new Date().toISOString()
          }]);
        console.log('✅ Plaid item saved to database');
      } catch (dbError) {
        console.error('⚠️  Failed to save to database:', dbError.message);
        // Don't fail the request if DB save fails
      }
    }
    
    res.json({ 
      access_token: accessToken,
      item_id: itemId,
      success: true 
    });

  } catch (error) {
    console.error('Plaid token exchange error:', error);
    res.status(500).json({ 
      error: error.response?.data?.error_message || 'Failed to exchange public token',
      details: error.message 
    });
  }
});

// Survey submission endpoint
app.post('/api/survey', async (req, res) => {
  try {
    const surveyData = req.body;
    
    // Validate required fields
    if (!surveyData.name && !surveyData.email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Prepare data for your table structure
    const userId = crypto.randomUUID(); // Generate a user ID
    const answers = {
      name: surveyData.name,
      email: surveyData.email,
      q1: surveyData.q1,
      q2: surveyData.q2,
      q3: surveyData.q3,
      q4: surveyData.q4,
      q5: surveyData.q5,
      q6: surveyData.q6,
      q7: surveyData.q7,
      q8: surveyData.q8,
      q9: surveyData.q9,
      q10: surveyData.q10,
      q11: surveyData.q11,
      q12: surveyData.q12
    };

    const dbData = {
      user_id: userId,
      answers: answers,
      created_at: new Date().toISOString()
    };

    // Save to Supabase (if configured)
    if (supabase) {
      // Try different possible table names
      const possibleTableNames = ['survey_responses', 'surveys', 'responses'];
      let saved = false;
      
      for (const tableName of possibleTableNames) {
        try {
          const { data, error } = await supabase
            .from(tableName)
            .insert([dbData]);

          if (!error) {
            console.log(`✅ Survey data saved to ${tableName}`);
            saved = true;
            break;
          }
        } catch (tableError) {
          console.log(`⚠️  Table ${tableName} not found, trying next...`);
        }
      }
      
      if (!saved) {
        console.log('⚠️  Could not save to any table - continuing without database save');
        console.log('📊 Survey data:', JSON.stringify(dbData, null, 2));
      }
    } else {
      console.log('⚠️  Supabase not configured - skipping database save');
      console.log('📊 Survey data:', JSON.stringify(dbData, null, 2));
    }

    // Trigger Zapier webhook with formatted data
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        const formattedData = formatSurveyDataForEmail(surveyData);
        const zapierResult = await sendToZapier(formattedData, process.env.ZAPIER_WEBHOOK_URL);
        
        if (zapierResult.success) {
          console.log('✅ Survey data sent to Zapier successfully');
        } else {
          console.error('❌ Zapier webhook failed:', zapierResult.error);
        }
      } catch (zapierError) {
        console.error('❌ Zapier integration error:', zapierError.message);
        // Don't fail the request if Zapier fails
      }
    } else {
      console.log('⚠️  Zapier webhook URL not configured');
    }

    res.status(201).json({ 
      message: 'Survey submitted successfully',
      user_id: userId
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get survey responses (for admin purposes)
app.get('/api/survey', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    // Try different possible table names
    const possibleTableNames = ['survey_responses', 'surveys', 'responses'];
    let data = null;
    
    for (const tableName of possibleTableNames) {
      try {
        const { data: tableData, error } = await supabase
          .from(tableName)
          .select('*')
          .order('created_at', { ascending: false });

        if (!error) {
          data = tableData;
          console.log(`✅ Fetched data from ${tableName}`);
          break;
        }
      } catch (tableError) {
        console.log(`⚠️  Table ${tableName} not found, trying next...`);
      }
    }
    
    if (!data) {
      return res.status(404).json({ error: 'No survey table found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  const separator = '='.repeat(60);
  console.log(`\n${separator}`);
  console.log(`🚀 Luni Backend API running on port ${PORT}`);
  console.log(`📊 Environment: ${NODE_ENV.toUpperCase()}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  
  if (IS_PRODUCTION) {
    console.log(`\n⚠️  PRODUCTION MODE ACTIVE`);
    console.log(`   - Ensure all production credentials are configured`);
    console.log(`   - Plaid should use production environment`);
    console.log(`   - CORS configured for production URLs`);
  }
  console.log(`${separator}\n`);
});
