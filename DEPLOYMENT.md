# 🚀 Deployment Guide

This guide explains how to deploy your Luni app with frontend on Vercel and backend on Render.

## 📋 Prerequisites

- GitHub repository with your code
- Vercel account (free tier available)
- Render account (free tier available)
- Supabase project with survey_responses table
- Zapier webhook URL

## 🎨 Frontend Deployment (Vercel)

### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect this as a React app

### 2. Configure Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Deploy
- Vercel will automatically deploy on every push to main branch
- Your frontend will be available at `https://your-app.vercel.app`

## 🔧 Backend Deployment (Render)

### 1. Create Render Service
1. Go to [render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Select the `current/backend` directory as the root directory

### 2. Configure Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node

### 3. Set Environment Variables
In Render dashboard, go to Environment and add:

```
PORT=10000
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url
FRONTEND_URL=https://your-app.vercel.app,https://www.luni.ca
```

### 4. Deploy
- Render will automatically deploy on every push to main branch
- Your backend will be available at `https://your-service-name.onrender.com`

## 🔗 Connect Frontend to Backend

### 1. Update Frontend Environment
In Vercel, update the `REACT_APP_API_URL` to point to your Render backend:

```
REACT_APP_API_URL=https://your-service-name.onrender.com
```

### 2. Test the Integration
1. Visit your Vercel frontend URL
2. Try submitting the survey
3. Check that data appears in Supabase and Zapier notifications are sent

## 🧪 Local Development

### Frontend
```bash
cd /path/to/your/project
npm install
npm start
```

### Backend
```bash
cd current/backend
npm install
npm run dev
```

## 🔍 Troubleshooting

### CORS Issues
- Make sure `FRONTEND_URL` in Render includes your Vercel domain
- Check that the backend CORS configuration allows your frontend origin

### Environment Variables
- Double-check all environment variables are set correctly
- Restart services after changing environment variables

### Build Failures
- Check build logs in Vercel/Render dashboards
- Ensure all dependencies are in package.json
- Verify file paths are correct

## 📊 Monitoring

### Vercel
- Check deployment status in Vercel dashboard
- Monitor function execution and performance

### Render
- Check service health in Render dashboard
- Monitor logs for any errors

### Supabase
- Verify survey data is being saved
- Check database logs for any issues

### Zapier
- Test webhook URLs manually
- Check Zapier history for successful triggers

## 🚀 Going Live

1. **Custom Domain**: Add your custom domain in Vercel settings
2. **SSL**: Both Vercel and Render provide free SSL certificates
3. **Monitoring**: Set up monitoring and alerts for both services
4. **Backup**: Ensure Supabase backups are configured

## 💡 Tips

- Use Render's free tier for development, upgrade for production
- Vercel's free tier is generous for most projects
- Test the full flow locally before deploying
- Keep environment variables secure and rotate keys regularly
