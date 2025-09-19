/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Light gold theme colors
        'luni-gold': '#D4AF37',
        'luni-gold-light': '#F5E6A3',
        'luni-gold-medium': '#D4AF37',
        'luni-gold-dark': '#B8860B',
        'luni-red': '#8B0000',
        'luni-accent': '#B8860B',
        'luni-accent-light': '#DAA520',
        // System colors using CSS variables
        'system-bg': 'var(--system-bg)',
        'system-text': 'var(--system-text)',
        'system-text-muted': 'var(--system-text-muted)',
        'system-border': 'var(--system-border)',
        'system-accent': 'var(--system-accent)',
        'system-accent-light': 'var(--system-accent-light)',
        'system-deep-red': 'var(--system-deep-red)',
        'system-gold-light': 'var(--system-gold-light)',
        'system-gold-medium': 'var(--system-gold-medium)',
        'system-gold-dark': 'var(--system-gold-dark)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-theme': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, var(--system-gold-light), var(--system-gold-medium))',
      }
    },
  },
  plugins: [],
}

