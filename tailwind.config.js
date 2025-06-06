/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'objetiva-orange': '#c84a20',
        'objetiva-gray': '#333333',
      },
    },
  },
  plugins: [],
}