/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'media',
  theme: {
    extend: {
          colors: {
            // White theme colors
            'luni-gold': '#B8860B',
            'luni-gold-light': '#F8F8F8',
            'luni-gold-medium': '#E5E5E5',
            'luni-gold-dark': '#CCCCCC',
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
            'system-gold-dark': 'var(--system-gold-dark)',
            // Red glow effect colors
            'red-glow-primary': 'var(--red-glow-primary)',
            'red-glow-secondary': 'var(--red-glow-secondary)',
            'red-glow-soft': 'var(--red-glow-soft)',
            'red-glow-subtle': 'var(--red-glow-subtle)'
          },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-theme': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, var(--system-gold-light), var(--system-gold-medium))',
        'gradient-red-glow': 'linear-gradient(135deg, var(--red-glow-primary), var(--red-glow-secondary), var(--red-glow-soft), var(--red-glow-subtle))',
        'gradient-red-soft': 'radial-gradient(ellipse at center, var(--red-glow-soft) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}

