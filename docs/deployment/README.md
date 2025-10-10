# Deployment & Production Documentation

This folder contains all documentation related to deploying and running the Luni.ca application in production environments.

## 📚 Documentation Files

### Production Deployment
- **`PRODUCTION_GUIDE.md`** - Comprehensive guide for deploying to production
- **`PRODUCTION_MODE_SUMMARY.md`** - Summary of production mode configuration and settings

### Project Management
- **`REORGANIZATION_SUMMARY.md`** - Documentation of project reorganization efforts and structure changes

## 🚀 Deployment Workflow

### 1. Pre-Deployment Checklist
Before deploying to production:
- [ ] Environment variables configured
- [ ] PLAID production credentials obtained
- [ ] Database migrations completed
- [ ] Frontend build tested locally
- [ ] Backend endpoints verified
- [ ] Security review completed

### 2. Deployment Process
1. Review **`PRODUCTION_GUIDE.md`** for step-by-step instructions
2. Configure production environment variables
3. Deploy backend to hosting service
4. Deploy frontend to Vercel
5. Verify deployment and test critical flows

### 3. Post-Deployment
- Monitor application logs
- Test PLAID integration in production
- Verify OAuth redirects
- Check database connections

## 🏗️ Architecture Overview

### Frontend Deployment
- **Platform**: Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `build/`
- **Environment**: Production environment variables

### Backend Deployment
- **Platform**: TBD (Node.js hosting)
- **Entry Point**: `server.js`
- **Port**: Environment-configured
- **Environment**: Production environment variables

## 🔧 Production Configuration

### Environment Variables
See `PRODUCTION_MODE_SUMMARY.md` for complete list of required environment variables.

Key variables:
```bash
NODE_ENV=production
PLAID_ENV=production
PLAID_CLIENT_ID=prod_client_id
PLAID_SECRET=prod_secret
PLAID_REDIRECT_URI=https://luni.ca/plaid-oauth
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

### Security Considerations
- Use HTTPS for all production endpoints
- Store secrets in secure environment variable services
- Enable CORS only for trusted domains
- Implement rate limiting on API endpoints
- Use secure session management

## 📊 Monitoring & Maintenance

### Health Checks
- Frontend availability
- Backend API response times
- PLAID API connectivity
- Database connection status

### Logging
- Application error logs
- PLAID API request logs
- User authentication logs
- Transaction sync logs

### Backup & Recovery
- Database backup schedule
- Environment configuration backup
- Deployment rollback procedure

## 🔄 Continuous Deployment

### Git Workflow
1. Develop on feature branches
2. Test locally with sandbox/development environment
3. Merge to `main` branch
4. Automatic deployment to production (if configured)

### Vercel Integration
- Frontend automatically deploys on push to `main`
- Preview deployments for pull requests
- Environment variables managed in Vercel dashboard

## 🚨 Troubleshooting

### Common Production Issues

#### PLAID OAuth Redirect Errors
- Verify redirect URI matches PLAID dashboard configuration
- Check HTTPS certificate is valid
- Ensure OAuth HTML page is accessible

#### Backend Connection Issues
- Verify backend URL in frontend configuration
- Check CORS settings
- Validate SSL/TLS certificates

#### Database Connection Errors
- Verify Supabase credentials
- Check network connectivity
- Review connection pool settings

See individual documentation files for detailed troubleshooting.

## 📖 Related Documentation

- PLAID Configuration: `../plaid/PLAID_CONFIGURATION_CHECKLIST.md`
- Project Setup: `../project/SETUP.md`
- Project Structure: `../project/PROJECT_STRUCTURE.md`

## 🔗 External Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [PLAID Production Setup](https://plaid.com/docs/production/)

---

**Note**: Always test deployments in a staging environment before pushing to production.

