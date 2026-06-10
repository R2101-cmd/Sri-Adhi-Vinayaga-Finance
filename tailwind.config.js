/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emeraldDeep: '#0F4C45',
        gold: '#D4AF37',
        ivory: '#FAF9F6',
        charcoal: '#1E1E1E',
        mist: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        premium: '0 24px 70px rgba(15, 76, 69, 0.16)',
        glow: '0 16px 44px rgba(212, 175, 55, 0.22)',
      },
    },
  },
  plugins: [],
};
