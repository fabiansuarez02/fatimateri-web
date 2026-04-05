/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-heading': '#2C4A3B',
        'accent-color': '#D4AF37',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
