/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f9ff',
          100: '#e8f2ff',
          200: '#cfe5ff',
          300: '#a6d1ff',
          400: '#6db3ff',
          500: '#318dff',
          600: '#1f6ee6',
          700: '#1756b4',
          800: '#164a91',
          900: '#153f75',
          950: '#0e284b'
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")], // Add this line
};
