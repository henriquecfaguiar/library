/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}', './node_modules/flowbite/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        jetbrainsMono: ['JetBrains Mono', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
