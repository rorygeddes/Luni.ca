# Luni - React Web App

A modern React application for Luni's student budgeting platform with Supabase integration and Zapier automation.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Supabase account
- Zapier account (optional)

### Installation

1. **Install all dependencies:**
   ```bash
   npm run setup
   ```

2. **Set up environment variables:**
   
   **Backend (.env):**
   ```bash
   cp backend/env.example backend/.env
   ```
   
   Edit `backend/.env` with your credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ZAPIER_WEBHOOK_URL=your_zapier_webhook_url
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env):**
   ```bash
   echo "REACT_APP_API_URL=http://localhost:5000" > frontend/.env
   ```

3. **Set up Supabase database:**
   - Create a new Supabase project
   - Run the SQL schema from `backend/supabase-schema.sql`
   - Get your project URL and keys from Settings > API

4. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
Luni.ca/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── App.js           # Main app component
│   └── package.json
├── backend/                 # Express.js backend
│   ├── server.js           # Main server file
│   ├── zapier-integration.js # Zapier webhook handler
│   ├── supabase-schema.sql  # Database schema
│   └── package.json
└── package.json            # Root package.json with scripts
```

## 🛠 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run setup` - Install all dependencies
- `npm run build` - Build frontend for production
- `npm start` - Start production backend server

### Frontend Only
- `npm run dev:frontend` - Start React development server
- `cd frontend && npm start` - Alternative way to start frontend
- `cd frontend && npm build` - Build for production

### Backend Only
- `npm run dev:backend` - Start backend with nodemon
- `cd backend && npm start` - Start production backend

## 🔧 Features

### Frontend (React)
- **Modern UI**: Built with Tailwind CSS and Font Awesome icons
- **Responsive Design**: Mobile-first approach
- **React Router**: Client-side routing
- **Form Handling**: Controlled components with validation
- **API Integration**: Axios for HTTP requests

### Backend (Express.js)
- **RESTful API**: Clean API endpoints
- **Supabase Integration**: Real-time database operations
- **Zapier Automation**: Automatic email notifications
- **Security**: Helmet, CORS, input validation
- **Logging**: Morgan for request logging

### Database (Supabase)
- **Survey Responses**: Store all survey data
- **Row Level Security**: Secure data access
- **Indexes**: Optimized queries
- **Timestamps**: Automatic created_at/updated_at

## 📊 Survey Integration

The survey system includes:

1. **12 Questions**: Mix of multiple choice and open-ended
2. **Email Collection**: For beta program enrollment
3. **Data Storage**: All responses saved to Supabase
4. **Email Automation**: Zapier sends formatted email notifications

### Survey Questions:
1. Current spending tracking method
2. Biggest monthly expense
3. Budget overspending frequency
4. Monthly savings habits
5. Expense splitting with friends
6. Money management confidence
7. Savings motivation factors
8. Financial education importance
9. Preferred app device
10. Data import preference
11. Biggest financial problem (open-ended)
12. Ideal solution (open-ended)

## 🔗 Zapier Integration

### Setup Zapier Webhook:
1. Create a new Zap in Zapier
2. Choose "Webhooks by Zapier" as trigger
3. Select "Catch Hook" 
4. Copy the webhook URL
5. Add to backend `.env` as `ZAPIER_WEBHOOK_URL`

### Email Template Data:
The webhook receives formatted survey data including:
- User email and submission date
- All survey responses with labels
- User insights and preferences
- Formatted for easy email template creation

## 🚀 Deployment

### Frontend (Vercel/Netlify):
```bash
cd frontend
npm run build
# Deploy the build folder
```

### Backend (Railway/Heroku):
```bash
cd backend
# Set environment variables in hosting platform
npm start
```

### Environment Variables for Production:
- Update `REACT_APP_API_URL` to your production backend URL
- Ensure all Supabase credentials are correct
- Set production Zapier webhook URL

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env` files
- **CORS**: Configured for specific frontend URL
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Consider adding rate limiting for production
- **HTTPS**: Use HTTPS in production

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Check `FRONTEND_URL` in backend `.env`
2. **Supabase Connection**: Verify URL and keys are correct
3. **Zapier Not Triggering**: Check webhook URL and network connectivity
4. **Port Conflicts**: Change ports in package.json if needed

### Debug Mode:
- Frontend: Check browser console for errors
- Backend: Check terminal for server logs
- Supabase: Check dashboard for database logs

## 📝 Development Notes

- **Hot Reload**: Both frontend and backend support hot reload
- **API Testing**: Use tools like Postman to test endpoints
- **Database**: Use Supabase dashboard for data management
- **Styling**: Tailwind classes are used throughout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
