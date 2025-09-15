# Luni - Smart Budgeting for Students

A modern, responsive website for Luni, a budgeting app designed specifically for students to help them track spending, develop good financial habits, and manage their money with real-time insights.

## 🚀 Features

- **Modern Design**: Beautiful, gradient-based UI with glass-morphism effects
- **Mobile-First**: Fully responsive design that works seamlessly on all devices
- **Student-Focused**: Tailored features for student life and budgeting needs
- **Real-Time Tracking**: Live spending insights and notifications
- **Smart Savings**: AI-powered recommendations for better financial habits

## 🛠️ Tech Stack

- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Font Awesome**: Beautiful icons throughout the interface
- **Vanilla JavaScript**: Smooth scrolling and interactive elements

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Luni.ca
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The website will be available at `http://localhost:3000`

4. **Alternative: Direct file opening**
   You can also simply open `index.html` in your browser for quick preview.

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```
   
   Follow the prompts to link your project to Vercel.

3. **Automatic deployments**
   - Connect your GitHub repository to Vercel
   - Every push to main branch will automatically deploy
   - Preview deployments for pull requests

### Deploy to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Your site will be available at `https://yourusername.github.io/your-repo-name`

## 📱 Mobile Optimization

The website is fully optimized for mobile devices with:
- Responsive breakpoints for all screen sizes
- Touch-friendly navigation and buttons
- Optimized typography and spacing
- Fast loading times on mobile networks

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (`#6366f1`)
- **Secondary**: Purple (`#8b5cf6`)
- **Accent**: Cyan (`#06b6d4`)
- **Dark**: Slate (`#1e293b`)
- **Light**: Slate (`#f8fafc`)

### Typography
- Clean, modern font stack
- Responsive text sizing
- Gradient text effects for headings

## 📂 Project Structure

```
Luni.ca/
├── index.html          # Main website file
├── Luni.png           # Logo image
├── package.json       # Project dependencies and scripts
├── vercel.json        # Vercel deployment configuration
├── .gitignore         # Git ignore rules
├── README.md          # Project documentation
└── Prd/
    └── Overview.md    # Product requirements document
```

## 🚀 Available Scripts

- `npm run dev` - Start development server with live reload
- `npm start` - Start production server
- `npm run build` - Build the project (static site, no build step needed)
- `npm run preview` - Preview the built site

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please contact [your-email@example.com]

---

**Luni** - Making student budgeting simple, smart, and sustainable. 🎓💰
