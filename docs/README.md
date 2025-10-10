# Luni.ca Documentation

This folder contains all documentation for the Luni.ca web application, including PLAID integration, deployment guides, project structure, and product requirements.

## 📁 Folder Structure

### `/plaid` - PLAID Integration Documentation
All documentation related to PLAID integration for connecting financial institutions.

#### Configuration & Setup
- `PLAID_CONFIGURATION_CHECKLIST.md` - Complete checklist for PLAID configuration
- `PLAID_OAUTH_SETUP.md` - PLAID OAuth setup guide
- `PLAID_OAUTH_QUICKSTART.md` - Quick start guide for PLAID OAuth
- `PLAID_OAUTH_HTML_GUIDE.md` - HTML implementation guide for PLAID OAuth

#### Implementation & Comparison
- `PLAID_IMPLEMENTATION_SUMMARY.md` - Summary of PLAID implementation
- `PLAID_OAUTH_COMPARISON.md` - Comparison of different PLAID OAuth approaches

### `/deployment` - Deployment & Production Documentation
Documentation for deploying and running the application in production.

#### Production Setup
- `PRODUCTION_GUIDE.md` - Complete guide for production deployment
- `PRODUCTION_MODE_SUMMARY.md` - Summary of production mode configuration

#### Project Management
- `REORGANIZATION_SUMMARY.md` - Summary of project reorganization efforts

### `/project` - Project Structure & Setup
General project documentation, architecture, and setup guides.

#### Project Organization
- `PROJECT_STRUCTURE.md` - Detailed project structure documentation
- `SETUP.md` - Setup instructions for local development

### `/Prd` - Product Requirements & Specifications
Product requirements documents, feature specifications, and planning materials.

#### Core Documentation
- `Overview.md` - Product overview and high-level requirements
- `home.md` - Home page specifications
- `survey_questions.md` - Survey questions and data collection
- `survey_screen.md` - Survey screen specifications

#### Subdirectories
- `prompts/` - AI prompts and templates
  - `supabase_start.md` - Supabase setup prompts

## 📝 Quick Start

### For Developers
1. **Initial Setup**: Start with `project/SETUP.md` for local development setup
2. **Project Structure**: Review `project/PROJECT_STRUCTURE.md` to understand the codebase
3. **PLAID Integration**: Follow `plaid/PLAID_OAUTH_QUICKSTART.md` for PLAID setup
4. **Production**: Review `deployment/PRODUCTION_GUIDE.md` for deployment

### For Product Managers
1. **Product Overview**: Start with `Prd/Overview.md`
2. **Feature Specs**: Review specific feature documentation in `Prd/`

## 🔧 Common Tasks

### PLAID Configuration
1. Review `plaid/PLAID_CONFIGURATION_CHECKLIST.md`
2. Follow `plaid/PLAID_OAUTH_SETUP.md` for OAuth setup
3. Use `plaid/PLAID_OAUTH_HTML_GUIDE.md` for frontend implementation

### Deploying to Production
1. Review `deployment/PRODUCTION_MODE_SUMMARY.md`
2. Follow `deployment/PRODUCTION_GUIDE.md` step by step
3. Verify deployment using production checklist

### Understanding Project Structure
1. Read `project/PROJECT_STRUCTURE.md`
2. Review `FILE_ORGANIZATION.md` for file organization rules

## 🗂️ Documentation Standards

All documentation follows these standards:

### File Naming Convention
- Use UPPERCASE for major documentation files
- Use descriptive names that clearly indicate content
- Use underscores for word separation
- Add appropriate prefixes (PLAID_, PRODUCTION_, etc.)

### Organization Rules
See `FILE_ORGANIZATION.md` for detailed rules on where to save new documentation.

### Document Structure
- Start with a clear title
- Include a brief description
- Use clear headings and subheadings
- Include code examples where relevant
- Add troubleshooting sections for technical guides

## 📚 Related Resources

- **Main README**: `../README.md` (project overview and quick start)
- **Frontend Documentation**: `../frontend/README.md`
- **Backend Documentation**: `../backend/README.md`

## 🏗️ Architecture Overview

### Frontend
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel
- **Port**: 3000 (development)

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Services**: PLAID API integration
- **Database**: Supabase

### PLAID Integration
- OAuth flow for bank authentication
- Transaction data synchronization
- Account balance tracking
- Multi-institution support

## 📖 Contributing

When adding new documentation:

1. Follow the file organization rules in `FILE_ORGANIZATION.md`
2. Place files in the appropriate subdirectory
3. Update the relevant README.md files
4. Use clear, descriptive file names
5. Follow the documentation standards above

## 🔄 Maintenance

This documentation structure was established to:
- Keep the root directory clean and focused
- Organize documentation by logical categories
- Make it easy to find relevant information
- Follow best practices for project organization
- Maintain consistency with other Luni projects (luni_app)

---

**Last Updated**: October 9, 2025  
**Organization Version**: 1.0

