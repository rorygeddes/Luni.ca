# 🚀 Luni Backend API

Express.js backend server for the Luni budgeting app, handling survey submissions, Supabase integration, and Zapier automation.

## 🏗️ Deployment on Render

### Configuration:
- **Root Directory**: `/` (this directory)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Environment Variables:
Set these in your Render dashboard:

```
PORT=5001
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ZAPIER_WEBHOOK_URL=your-zapier-webhook-url
FRONTEND_URL=http://localhost:3000,https://your-frontend.vercel.app
```

### Health Check:
- **Health Endpoint**: `GET /health`
- **Survey Endpoint**: `POST /api/survey`

## 🔧 Local Development

```bash
npm install
npm run dev
```

Server runs on `http://localhost:5001`
