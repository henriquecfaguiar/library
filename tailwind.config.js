/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        'JetBrains Mono': ['JetBrains Mono', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
