# Project Structure & Setup Documentation

This folder contains documentation about the project structure, architecture, and setup instructions for local development.

## 📚 Documentation Files

### Project Organization
- **`PROJECT_STRUCTURE.md`** - Detailed documentation of the project structure and organization
- **`SETUP.md`** - Setup instructions for local development environment

## 🚀 Getting Started

### For New Developers
1. Start with **`SETUP.md`** to set up your local development environment
2. Review **`PROJECT_STRUCTURE.md`** to understand the codebase organization
3. Check **`../plaid/PLAID_OAUTH_QUICKSTART.md`** for PLAID integration setup

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager
- Git
- Code editor (VS Code recommended)
- PLAID account (for development)
- Supabase account (for database)

## 🏗️ Project Architecture

### Monorepo Structure
The Luni.ca project is organized as a monorepo with two main components:

```
Luni.ca/
├── frontend/          # React TypeScript frontend
├── backend/           # Node.js Express backend
├── docs/              # All documentation
└── Configuration files
```

### Frontend (React + TypeScript)
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Deployment**: Vercel

Key directories:
- `src/components/` - Reusable React components
- `src/pages/` - Page components
- `src/services/` - API and service integrations
- `src/lib/` - Utility functions and helpers

### Backend (Node.js + Express)
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: JavaScript (ES6+)
- **API Integration**: PLAID

Key files:
- `server.js` - Main server entry point
- `zapier-integration.js` - Zapier webhook integration

## 📁 Directory Structure

For detailed directory structure, see **`PROJECT_STRUCTURE.md`**.

### Frontend Structure
```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   └── lib/          # Utilities
└── build/            # Production build output
```

### Backend Structure
```
backend/
├── server.js         # Main server
├── zapier-integration.js
└── Configuration files
```

### Documentation Structure
```
docs/
├── README.md
├── FILE_ORGANIZATION.md
├── plaid/            # PLAID documentation
├── deployment/       # Deployment guides
├── project/          # Project structure (this folder)
└── Prd/              # Product requirements
```

## 🔧 Development Workflow

### Local Development Setup
1. Clone the repository
2. Install dependencies: `npm install` (in both frontend and backend)
3. Configure environment variables (see `SETUP.md`)
4. Start backend: `cd backend && npm start`
5. Start frontend: `cd frontend && npm start`

### Environment Configuration
Required environment variables:
- PLAID credentials
- Supabase credentials
- API URLs
- OAuth redirect URIs

See `SETUP.md` for complete environment configuration.

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier (recommended)
- **Type Checking**: TypeScript
- **Version Control**: Git

## 🧪 Testing

### Frontend Testing
- Unit tests: Jest + React Testing Library
- Component tests: React Testing Library
- E2E tests: TBD

### Backend Testing
- API tests: TBD
- Integration tests: TBD

## 📦 Dependencies

### Frontend Key Dependencies
- React
- TypeScript
- Tailwind CSS
- Plaid Link (client-side)
- Supabase client library

### Backend Key Dependencies
- Express
- Plaid Node.js library
- CORS
- dotenv

## 🔄 Version Control

### Branching Strategy
- `main` - Production branch
- `develop` - Development branch (optional)
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Commit Conventions
Follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `style:` - Code style changes
- `test:` - Test changes

## 📖 Best Practices

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful component names
- Keep components small and focused
- Use functional components with hooks

### File Organization
- Follow the file organization rules in `../FILE_ORGANIZATION.md`
- Keep related files together
- Use clear, descriptive file names
- Organize imports consistently

### Documentation
- Document complex logic
- Update README files when structure changes
- Keep documentation in sync with code
- Use JSDoc comments for functions

## 🔗 Related Documentation

- Main README: `../../README.md`
- File Organization: `../FILE_ORGANIZATION.md`
- PLAID Integration: `../plaid/README.md`
- Deployment Guide: `../deployment/README.md`

## 🆘 Getting Help

### Internal Resources
- Documentation in `docs/`
- Code comments
- README files

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express Documentation](https://expressjs.com/)
- [PLAID Documentation](https://plaid.com/docs/)
- [Supabase Documentation](https://supabase.com/docs)

---

**Note**: This documentation is actively maintained. If you notice any discrepancies, please update accordingly.

