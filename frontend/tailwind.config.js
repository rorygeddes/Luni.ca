/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'luni-gold': '#C9A96E',
        'luni-red': '#8B4513',
        'luni-dark-gold': '#A68B5B',
        'luni-dark-red': '#654321',
        'luni-accent': '#D4AF37',
        'luni-warm': '#B8860B'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

