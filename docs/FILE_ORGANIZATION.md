# File Organization Rules

## 📋 Where to Save New Files

### PLAID Documentation → `docs/plaid/`
**All PLAID-related documentation** for integration, setup, OAuth, configuration, etc.

Examples:
- `PLAID_*_SETUP.md`
- `PLAID_*_GUIDE.md`
- `PLAID_*_CHECKLIST.md`
- `PLAID_*_COMPARISON.md`
- Any other PLAID-specific documentation

### Deployment Documentation → `docs/deployment/`
**All deployment and production-related documentation**.

Examples:
- `PRODUCTION_*.md`
- `*_MODE_SUMMARY.md`
- `DEPLOYMENT_*.md`
- `REORGANIZATION_*.md`
- CI/CD and hosting guides

### Project Documentation → `docs/project/`
**Project structure, setup, and general documentation**.

Examples:
- `PROJECT_STRUCTURE.md`
- `SETUP.md`
- Architecture documentation
- Development guidelines

### Product Requirements → `docs/Prd/`
**Product requirements, specifications, and planning documents**.

Examples:
- Feature specifications
- User stories
- Product roadmap
- Survey questions
- Design prompts

## 🚫 Root Directory Rules

**DO NOT** save these in the root `Luni.ca/` directory:
- ❌ PLAID documentation (`.md` files)
- ❌ Deployment guides (`.md` files)
- ❌ Project documentation (`.md` files)
- ❌ Product requirements

**ONLY** these should be in root:
- ✅ `README.md` (main project readme)
- ✅ `package.json`
- ✅ `vercel.json`
- ✅ `.gitignore`
- ✅ Source code directories (`frontend/`, `backend/`)
- ✅ Configuration files (`.eslintrc.json`, etc.)

## 📁 Directory Structure

```
Luni.ca/
├── README.md                          ✅ Main readme only
├── docs/
│   ├── README.md                      ✅ Documentation index
│   ├── FILE_ORGANIZATION.md           ✅ This file
│   ├── plaid/                         ✅ All PLAID docs here
│   │   ├── PLAID_OAUTH_SETUP.md
│   │   ├── PLAID_CONFIGURATION_CHECKLIST.md
│   │   ├── PLAID_IMPLEMENTATION_SUMMARY.md
│   │   └── ...
│   ├── deployment/                    ✅ Deployment docs here
│   │   ├── PRODUCTION_GUIDE.md
│   │   ├── PRODUCTION_MODE_SUMMARY.md
│   │   └── ...
│   ├── project/                       ✅ Project structure docs
│   │   ├── PROJECT_STRUCTURE.md
│   │   ├── SETUP.md
│   │   └── ...
│   └── Prd/                           ✅ Product requirements
│       ├── Overview.md
│       ├── home.md
│       └── ...
├── frontend/                          ✅ React frontend
├── backend/                           ✅ Node.js backend
└── ...                                ✅ Other project files
```

## 🔄 Workflow

When creating new files:

1. **New PLAID documentation?**
   - Save to: `docs/plaid/FILENAME.md`
   - Update: `docs/plaid/README.md` if major

2. **New deployment guide?**
   - Save to: `docs/deployment/FILENAME.md`
   - Update: `docs/deployment/README.md` if major

3. **New project documentation?**
   - Save to: `docs/project/FILENAME.md`
   - Update: `docs/README.md` if major

4. **New product requirement?**
   - Save to: `docs/Prd/FILENAME.md`
   - Update: `docs/Prd/Overview.md` if major

## 🧹 Cleanup

If you find files in the wrong place:

```bash
# Move PLAID files
mv PLAID_*.md docs/plaid/

# Move deployment files
mv PRODUCTION_*.md DEPLOYMENT_*.md docs/deployment/

# Move project files
mv PROJECT_*.md SETUP.md docs/project/
```

## 📝 Notes

- This organization was established to keep the root directory clean
- All documentation is now centralized in `docs/` with logical subdirectories
- Makes it easier to find and maintain files
- Follows best practices for project structure
- Consistent with the luni_app project organization


