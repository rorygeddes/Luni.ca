# Luni - Smart Budgeting for Students

A React + Node.js budgeting app for students with survey functionality and Plaid banking integration.

**🚀 Now configured for PRODUCTION MODE** - See [`docs/deployment/PRODUCTION_GUIDE.md`](./docs/deployment/PRODUCTION_GUIDE.md) for deployment instructions.

## 📁 Project Structure

```
Luni.ca/
├── frontend/          # React app (TypeScript + Tailwind)
├── backend/           # Node.js API (Express + Supabase + Plaid)
├── docs/              # Documentation & PRD
└── package.json       # Monorepo config
```

## 🚀 Quick Start

⚠️ **This project is configured for PRODUCTION mode by default.**

For production deployment, see **[`docs/deployment/PRODUCTION_GUIDE.md`](./docs/deployment/PRODUCTION_GUIDE.md)**

For local development:

### 1. Install Dependencies
```bash
npm install
npm run install:all
```

### 2. Setup Environment

**Backend** - Create `backend/.env`:
```bash
cp backend/env.example backend/.env
```

Edit `backend/.env` and add your credentials:
- For **production**: Use production Plaid keys, set `PLAID_ENV=production`
- For **local testing**: Use sandbox keys, set `PLAID_ENV=sandbox`, `NODE_ENV=development`

**Frontend** - Create `frontend/.env`:
```bash
cp frontend/env.example frontend/.env
```

Edit `frontend/.env`:
- For **production**: Use your deployed backend URL
- For **local testing**: Use `http://localhost:5001`

### 3. Start Development
```bash
npm run dev
```

**Access your app:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## 📁 Directory Details

### Frontend (`/frontend`)
- **React TypeScript** application
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Font Awesome** for icons

### Backend (`/backend`)
- **Express.js** REST API
- **Supabase** integration for database
- **Plaid** integration for banking/financial data
- **Zapier** integration for automation
- **CORS** enabled for cross-origin requests

### Documentation (`/docs`)
- **[Documentation Index](./docs/README.md)** - Complete documentation overview
- **[PLAID Integration](./docs/plaid/)** - PLAID setup and configuration guides
- **[Deployment](./docs/deployment/)** - Production deployment and configuration
- **[Project Structure](./docs/project/)** - Project organization and setup
- **[Product Requirements](./docs/Prd/)** - PRD and specifications

## 🛠️ Available Scripts

### Root Level Commands
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run setup` - Clean install all dependencies
- `npm run clean` - Remove all node_modules

### Frontend Commands
- `npm run dev:frontend` - Start frontend development server
- `npm run build:frontend` - Build frontend for production

### Backend Commands  
- `npm run dev:backend` - Start backend development server
- `npm run build:backend` - Build backend for production

## 🔧 Environment Configuration

### Backend Environment Variables
Create `backend/.env` from `backend/env.example`:

```env
PORT=5001

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Zapier Integration (for survey notifications)
ZAPIER_WEBHOOK_URL=your_zapier_webhook_url

# Plaid Configuration (for banking integration)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
# PLAID_ENV options: sandbox, development, production

# CORS Configuration
FRONTEND_URL=http://localhost:3000,https://yourdomain.com
```

### Frontend Environment Variables
Create `frontend/.env` from `frontend/env.example`:

```env
REACT_APP_API_URL=http://localhost:5001
```

### Getting Plaid Credentials
1. Sign up at https://dashboard.plaid.com/
2. Get your Client ID and Secret from Team Settings → Keys
3. Add OAuth redirect URI: `https://luni.ca/plaid-oauth`
4. See [`docs/plaid/PLAID_OAUTH_QUICKSTART.md`](./docs/plaid/PLAID_OAUTH_QUICKSTART.md) for complete setup

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/build`
4. Configure environment variables in Vercel dashboard

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && node server.js`
4. Configure environment variables in Render dashboard

## 📊 Features

- **Survey System**: Collect user feedback with Supabase storage
- **Plaid Banking Integration**: Connect bank accounts via OAuth for transaction data
- **Zapier Integration**: Automate email notifications and workflows
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Type-safe development
- **Modern UI**: Clean, professional design with gold accent colors
- **OAuth Redirect Page**: Seamless deep linking for Flutter mobile app integration

## 🔒 Security

- Environment variables for sensitive data
- CORS configuration for API security
- Input validation and sanitization
- Secure API endpoints

## 📝 License

MIT License - see LICENSE file for details
