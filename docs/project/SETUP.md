# Quick Setup Guide

## ⚠️ Production Mode Notice

**This project is configured for PRODUCTION MODE by default.**

- For **production deployment**: Follow this guide
- For **local development/testing**: Use `backend/env.local.example` instead of `env.example`
- For **complete production guide**: See [`PRODUCTION_GUIDE.md`](./PRODUCTION_GUIDE.md)

## 🚀 Production Setup (5 Minutes)

### 1. Install Dependencies (1 min)

```bash
npm install
npm run install:all
```

### 2. Configure Backend (2 min)

```bash
cd backend
cp env.example .env
```

Edit `backend/.env` and add your keys:

**For PRODUCTION:**
```env
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_key
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_production_secret
PLAID_ENV=production
FRONTEND_URL=https://luni.ca,https://www.luni.ca
```

**For LOCAL TESTING** (copy from `env.local.example` instead):
```env
NODE_ENV=development
PLAID_ENV=sandbox
PLAID_SECRET=your_sandbox_secret
FRONTEND_URL=http://localhost:3000
```

**Get Plaid Keys:**
1. Sign up: https://dashboard.plaid.com/
2. Go to: Team Settings → Keys
3. Copy Client ID and Sandbox Secret
4. Add redirect URI: `https://luni.ca/plaid-oauth`

### 3. Configure Frontend (1 min)

```bash
cd frontend
cp env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5001
```

### 4. Start Development (1 min)

From project root:

```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## ✅ Verify It's Working

### Test 1: Health Check
```bash
curl http://localhost:5001/health
# Should return: {"status":"OK","message":"Luni Backend API is running"}
```

### Test 2: Frontend
Open http://localhost:3000
- Should see Luni homepage
- Click "Become a Beta Access User"
- Fill survey and submit
- Check backend console for "Survey submitted"

### Test 3: Plaid OAuth Page
Open http://localhost:3000/plaid-oauth?oauth_state_id=test123
- Should see success message
- Should attempt deep link to `luni://plaid-oauth`

## 🎯 What's Configured

### Survey System ✅
- Endpoint: `POST /api/survey`
- Storage: Supabase
- Notifications: Zapier (optional)
- Frontend: `/survey` route

### Plaid Integration ✅
- OAuth redirect: https://luni.ca/plaid-oauth
- Link token: `POST /api/plaid/link/token/create`
- Token exchange: `POST /api/plaid/token/exchange`
- Deep linking: `luni://plaid-oauth`

## 📚 Documentation

- **Main README**: `README.md` - Overview
- **Structure**: `PROJECT_STRUCTURE.md` - File organization
- **Plaid Setup**: `docs/PLAID_CONFIGURATION_CHECKLIST.md`
- **Quick Ref**: `docs/PLAID_OAUTH_QUICKSTART.md`
- **Complete Guide**: `docs/PLAID_OAUTH_SETUP.md`

## 🔧 Deployment

### Frontend → Vercel
```bash
# From Vercel dashboard:
Build Command: cd frontend && npm run build
Output Directory: frontend/build
Environment Variables: REACT_APP_API_URL=https://your-backend-url
```

### Backend → Render/Railway
```bash
# From hosting dashboard:
Start Command: cd backend && node server.js
Environment Variables: Copy all from backend/.env
```

## 🆘 Common Issues

**"Plaid is not configured"**
→ Add `PLAID_CLIENT_ID` and `PLAID_SECRET` to `backend/.env`

**Survey won't submit**
→ Check backend is running and `REACT_APP_API_URL` is set

**Port already in use**
→ Kill existing process: `pkill -f "node.*server.js"`

## ✨ You're Ready!

The project is now:
- ✅ Organized and clean
- ✅ Survey integration working
- ✅ Plaid OAuth ready (add credentials)
- ✅ Documentation complete
- ✅ Ready to deploy

**Next Step**: Add your Plaid credentials to `backend/.env` and test!

