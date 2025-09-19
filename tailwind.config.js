/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'media', // Use system preference
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        'luni-gold': '#C9A96E',
        'luni-red': '#8B4513',
        'luni-dark-gold': '#A68B5B',
        'luni-dark-red': '#654321',
        'luni-accent': '#D4AF37',
        'luni-warm': '#B8860B',
        // Light mode colors
        'luni-gold-light': '#8B6914',
        'luni-red-light': '#5D2F08',
        'luni-accent-light': '#B8941F',
        // Darker red from your color scheme
        'luni-dark-red': '#4A1A1A',
        'luni-deep-red': '#3D1515',
        // System colors
        'system-bg': 'var(--system-bg)',
        'system-text': 'var(--system-text)',
        'system-text-muted': 'var(--system-text-muted)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-theme': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

