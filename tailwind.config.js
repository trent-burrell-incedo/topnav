// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        'menuColor': '#4A4A4A',
        'menuHover': '#3670E3',
        'custom': 'blue'
      },
    },
  },
  plugins: [],
}