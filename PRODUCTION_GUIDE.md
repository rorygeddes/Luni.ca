# Production Deployment Guide

## 🚀 Production Mode Configuration

Your Luni project is now configured for **PRODUCTION MODE** by default.

## ⚠️ Important: Production vs Development

### Production Mode Checklist

Before deploying to production, ensure you have:

- ✅ Production Plaid credentials (not sandbox)
- ✅ Production Supabase database
- ✅ Valid Zapier webhook (optional)
- ✅ Correct CORS origins (luni.ca, www.luni.ca)
- ✅ All environment variables set
- ✅ HTTPS enabled everywhere

## 📋 Step-by-Step Production Setup

### 1. Backend Production Configuration

Create `backend/.env` with **PRODUCTION** credentials:

```env
# Server Configuration
PORT=5001
NODE_ENV=production

# Supabase Configuration (REQUIRED)
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key

# Zapier Integration (Optional)
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx

# Plaid Configuration (REQUIRED - PRODUCTION KEYS)
PLAID_CLIENT_ID=your_actual_plaid_client_id
PLAID_SECRET=your_actual_production_secret
PLAID_ENV=production

# CORS Configuration
FRONTEND_URL=https://luni.ca,https://www.luni.ca
```

### 2. Frontend Production Configuration

Create `frontend/.env` with your **PRODUCTION** backend URL:

```env
# Backend API URL - PRODUCTION
REACT_APP_API_URL=https://luni-backend.onrender.com
```

Replace `luni-backend.onrender.com` with your actual backend URL.

### 3. Get Production Credentials

#### Plaid Production Setup

1. **Go to Plaid Dashboard**: https://dashboard.plaid.com/
2. **Switch to Production**: 
   - Click your environment dropdown (top right)
   - Select "Production" (or apply for production access)
3. **Get Production Keys**:
   - Go to Team Settings → Keys
   - Copy **Production** Client ID
   - Copy **Production** Secret
4. **Configure OAuth Redirect**:
   - Go to Team Settings → API
   - Add redirect URI: `https://luni.ca/plaid-oauth`
   - Save changes

#### Supabase Production Setup

1. **Go to Supabase**: https://supabase.com/
2. **Create Production Project** (or use existing)
3. **Get Credentials**:
   - Go to Settings → API
   - Copy Project URL
   - Copy Service Role Key (not anon key!)
4. **Create Tables**:
   ```sql
   -- Survey responses table
   CREATE TABLE survey_responses (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id TEXT NOT NULL,
     answers JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Plaid items table
   CREATE TABLE plaid_items (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id TEXT NOT NULL,
     access_token TEXT NOT NULL,
     item_id TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Add indexes for performance
   CREATE INDEX idx_survey_responses_user_id ON survey_responses(user_id);
   CREATE INDEX idx_plaid_items_user_id ON plaid_items(user_id);
   ```

## 🌐 Deployment Platforms

### Deploy Backend to Render

1. **Create Account**: https://render.com/
2. **New Web Service**:
   - Connect your GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`

3. **Environment Variables** (in Render dashboard):
   ```
   NODE_ENV=production
   PORT=5001
   SUPABASE_URL=https://yourproject.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   PLAID_CLIENT_ID=your_plaid_client_id
   PLAID_SECRET=your_production_secret
   PLAID_ENV=production
   FRONTEND_URL=https://luni.ca,https://www.luni.ca
   ZAPIER_WEBHOOK_URL=your_webhook_url
   ```

4. **Deploy**: Click "Create Web Service"

5. **Copy URL**: Save your backend URL (e.g., `https://luni-backend.onrender.com`)

### Deploy Frontend to Vercel

1. **Create Account**: https://vercel.com/
2. **Import Project**:
   - Connect your GitHub repo
   - Framework Preset: Create React App
   - Root Directory: `frontend`

3. **Build Settings**:
   ```
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Environment Variables** (in Vercel dashboard):
   ```
   REACT_APP_API_URL=https://luni-backend.onrender.com
   ```
   (Use your actual Render backend URL)

5. **Domain Configuration**:
   - Add custom domain: `luni.ca`
   - Add www redirect: `www.luni.ca`

6. **Deploy**: Vercel will auto-deploy

## 🔐 Security Checklist

### Before Going Live

- [ ] All `.env` files use production credentials (not placeholders)
- [ ] `PLAID_ENV=production` (not sandbox)
- [ ] Using production Plaid secret (not sandbox secret)
- [ ] HTTPS enabled on all URLs
- [ ] CORS only allows your production domains
- [ ] Supabase Row Level Security (RLS) enabled
- [ ] Access tokens encrypted in database
- [ ] No console.log of sensitive data in production
- [ ] Error messages don't expose internals
- [ ] Rate limiting configured (optional but recommended)

### Environment Variable Validation

The backend will now show **warnings** if:
- ❌ Running in PRODUCTION but Plaid is in sandbox/development
- ❌ Production mode but Supabase not configured
- ❌ Production mode but Plaid not configured

You'll see console messages like:
```
🚀 Starting Luni Backend in PRODUCTION mode
✅ Supabase client initialized
✅ Plaid client initialized (production environment)

============================================================
🚀 Luni Backend API running on port 5001
📊 Environment: PRODUCTION
📊 Health check: http://localhost:5001/health

⚠️  PRODUCTION MODE ACTIVE
   - Ensure all production credentials are configured
   - Plaid should use production environment
   - CORS configured for production URLs
============================================================
```

## 🧪 Testing Production Locally

You can test production mode locally before deploying:

```bash
# In backend/.env, set:
NODE_ENV=production
PLAID_ENV=production
# (but use sandbox credentials for testing)

# Start backend
cd backend
npm run dev

# You'll see production warnings in console
# This helps catch misconfigurations before deploy
```

## 🔄 Production Deployment Workflow

### Initial Deployment

```bash
# 1. Commit your changes
git add .
git commit -m "Configure for production"
git push origin main

# 2. Deploy backend (Render)
# - Auto-deploys from GitHub
# - Add environment variables in dashboard
# - Wait for build to complete

# 3. Deploy frontend (Vercel)
# - Auto-deploys from GitHub
# - Add REACT_APP_API_URL in dashboard
# - Configure custom domain (luni.ca)

# 4. Configure DNS
# - Point luni.ca to Vercel
# - Add OAuth redirect in Plaid: https://luni.ca/plaid-oauth

# 5. Test production
# - Visit https://luni.ca
# - Test survey submission
# - Test Plaid OAuth flow
```

### Updating Production

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main

# Both Render and Vercel will auto-deploy
# Monitor logs in their dashboards
```

## 📊 Monitoring Production

### Backend Health Check

```bash
curl https://luni-backend.onrender.com/health
# Should return: {"status":"OK","message":"Luni Backend API is running"}
```

### Test Survey Endpoint

```bash
curl -X POST https://luni-backend.onrender.com/api/survey \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","q1":"Test"}'
# Should return: {"message":"Survey submitted successfully","user_id":"..."}
```

### Test Plaid Endpoint

```bash
curl -X POST https://luni-backend.onrender.com/api/plaid/link/token/create \
  -H "Content-Type: application/json" \
  -d '{"user_id":"test_user"}'
# Should return: {"link_token":"link-production-...","success":true}
```

### Frontend

- Visit: https://luni.ca
- Test survey: https://luni.ca/survey
- Test OAuth: https://luni.ca/plaid-oauth?oauth_state_id=test

## 🆘 Troubleshooting Production

### "Plaid is not configured"
→ Check `PLAID_CLIENT_ID` and `PLAID_SECRET` in Render dashboard
→ Verify they're production keys, not placeholders

### "CORS error"
→ Check `FRONTEND_URL` includes your domain: `https://luni.ca,https://www.luni.ca`
→ No trailing slashes
→ No spaces after commas

### "Survey not saving"
→ Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Render
→ Verify tables exist in Supabase
→ Check Render logs for errors

### Backend not responding
→ Check Render dashboard for service status
→ View logs in Render dashboard
→ Verify environment variables are set
→ Check if service is suspended (free tier sleeps after inactivity)

## 💰 Cost Considerations

### Free Tier Hosting

**Render** (Backend):
- Free tier: 750 hours/month
- Service sleeps after 15 min inactivity
- Wakes on first request (slow)

**Vercel** (Frontend):
- Free tier: Unlimited bandwidth
- 100 GB bandwidth/month
- Always on, no sleep

**Supabase** (Database):
- Free tier: 500 MB database
- 2 GB bandwidth/month
- Auto-pause after 7 days inactivity

**Plaid**:
- Sandbox: Free forever
- Development: Free for 100 Items
- Production: $0-$5 per Item/month (after 100)

### Upgrade When Needed

Monitor your usage and upgrade to paid plans when you exceed free tiers.

## ✅ Production Launch Checklist

Before announcing your app:

- [ ] Backend deployed and responding to health checks
- [ ] Frontend deployed at luni.ca
- [ ] All environment variables configured with production values
- [ ] Plaid OAuth redirect working
- [ ] Survey submission working
- [ ] Supabase tables created
- [ ] Test complete user flow end-to-end
- [ ] Monitor logs for errors
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure analytics (Google Analytics, Mixpanel, etc.)
- [ ] Add status monitoring (UptimeRobot)
- [ ] Document any production-specific settings
- [ ] Backup database regularly

## 📚 Additional Resources

- **Plaid Production Checklist**: https://plaid.com/docs/launch-checklist/
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs

---

**🎉 You're Ready for Production!**

Your app is configured for production mode. Just add your credentials and deploy!

