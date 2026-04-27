/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,js}'],
  theme: {
    fontFamily: {
      'montserrat': [ 'Montserrat', 'sans-serif' ]
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["dark", "cupcake"],
  }
};
