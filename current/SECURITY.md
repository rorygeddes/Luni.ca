# 🔒 Security Guidelines for Luni App

## ⚠️ CRITICAL: Environment Variables

**NEVER commit `.env` files to git!** This contains sensitive credentials that could compromise your application.

### Backend Environment Setup

1. Copy the example file:
   ```bash
   cd backend
   cp env.example .env
   ```

2. Fill in your actual values in `.env`:
   ```env
   PORT=5001
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your_webhook_id/
   FRONTEND_URL=http://localhost:3000
   ```

### Frontend Environment Setup

1. Create a `.env` file in the frontend directory:
   ```bash
   cd frontend
   touch .env
   ```

2. Add your values:
   ```env
   REACT_APP_API_URL=http://localhost:5001
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   ```

## 🚨 If You've Already Committed Credentials

If you've accidentally committed sensitive data:

1. **Immediately rotate your credentials** in Supabase and Zapier
2. Remove the sensitive files from git history
3. Update your `.env` files with new credentials
4. Never commit `.env` files again

## 📁 Files That Should Never Be Committed

- `.env` (any environment file)
- `.env.local`
- `.env.production`
- `node_modules/`
- `build/`
- `.DS_Store`
- Any files containing API keys, passwords, or tokens

## ✅ What IS Safe to Commit

- `.env.example` (template files with placeholder values)
- Source code (without hardcoded credentials)
- Configuration files (without secrets)
- Documentation

Remember: When in doubt, add it to `.gitignore`!
