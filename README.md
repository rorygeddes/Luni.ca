# Luni - Smart Budgeting for Students

A React + Node.js budgeting app for students with survey functionality.

## 📁 Project Structure

```
├── frontend/          # React app (TypeScript + Tailwind)
├── backend/           # Node.js API (Express + Supabase)
├── docs/              # Documentation & PRD
├── deploy/            # Deployment files
└── package.json       # Monorepo config
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
npm run install:all
```

### 2. Setup Environment
```bash
# Backend
cp backend/env.example backend/.env
# Edit backend/.env with your Supabase & Zapier keys

# Frontend  
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your API URL
```

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
- **Zapier** integration for automation
- **CORS** enabled for cross-origin requests

### Documentation (`/docs`)
- Product Requirements Documents
- Survey questions and specifications
- Development guidelines

### Deployment (`/deployment`)
- Production server configurations
- Deployment scripts and instructions
- Environment-specific configurations

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
```env
PORT=5001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ZAPIER_WEBHOOK_URL=your_zapier_webhook_url
FRONTEND_URL=http://localhost:3000,https://yourdomain.com
```

### Frontend Environment Variables
```env
REACT_APP_API_URL=http://localhost:5001
```

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
- **Zapier Integration**: Automate email notifications and workflows
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Type-safe development
- **Modern UI**: Clean, professional design with gold accent colors

## 🔒 Security

- Environment variables for sensitive data
- CORS configuration for API security
- Input validation and sanitization
- Secure API endpoints

## 📝 License

MIT License - see LICENSE file for details
