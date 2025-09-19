const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const { sendToZapier, formatSurveyDataForEmail } = require('./zapier-integration');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase client (with proper validation)
let supabase = null;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (supabaseUrl && supabaseKey && 
    supabaseUrl.trim() !== '' && supabaseKey.trim() !== '' &&
    supabaseUrl !== 'your_supabase_project_url' && 
    supabaseKey !== 'your_supabase_service_role_key') {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized');
} else {
  console.log('⚠️  Supabase not configured - running in development mode');
}

// Middleware
app.use(helmet());

// CORS configuration - allow multiple origins
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',');
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
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

// Survey submission endpoint
app.post('/api/survey', async (req, res) => {
  try {
    const surveyData = req.body;
    
    // Validate required fields
    if (!surveyData.email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Prepare data for your table structure
    const userId = crypto.randomUUID(); // Generate a user ID
    const answers = {
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
        console.error('❌ Could not save to any table');
        return res.status(500).json({ error: 'Failed to save survey response' });
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
  console.log(`🚀 Luni Backend API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
