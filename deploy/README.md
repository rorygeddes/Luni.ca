# 🚀 Deployment Guide

Super simple deployment instructions for Luni app.

## 📁 What's in this folder?

```
deploy/
├── frontend/          # Frontend deployment files
│   ├── vercel.json    # Vercel configuration
│   └── env.example    # Environment variables
└── backend/           # Backend deployment files
    ├── server.js      # Production server
    ├── package.json   # Dependencies
    ├── zapier-integration.js
    └── env.example    # Environment variables
```

## 🎯 Quick Deploy

### 1. Frontend (Vercel)
```bash
# 1. Go to vercel.com
# 2. Connect your GitHub repo
# 3. Set these settings:
#    - Root Directory: frontend
#    - Build Command: npm run build
#    - Output Directory: build
# 4. Add environment variable:
#    - REACT_APP_API_URL=https://your-backend.onrender.com
```

### 2. Backend (Render)
```bash
# 1. Go to render.com
# 2. Create new Web Service
# 3. Connect your GitHub repo
# 4. Set these settings:
#    - Root Directory: backend
#    - Build Command: npm install
#    - Start Command: node server.js
# 5. Add environment variables from backend/env.example
```

## 🔧 Environment Setup

### Frontend (.env.production.local)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```env
PORT=10000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
ZAPIER_WEBHOOK_URL=your_zapier_webhook
FRONTEND_URL=https://your-frontend.vercel.app
```

## ✅ That's it!

Your app will be live at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.onrender.com`

## 🆘 Need Help?

Check the main README.md for detailed setup instructions.
