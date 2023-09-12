/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}',
  ],

  theme: {
    colors: {
      orange: {
        300: '#E1956B',
        400: '#BD6737',
        600: '#C64B07',
        700: '#7E3106',
      },
      brown: {
        50: '#A59F9A',
        100: '#76706A',
        200: '#605B56',
        300: '#443F39',
        600: '#292522',
        700: '#26221F',
      },
      blue: {
        500: '#3781BD',
        600: '#2D88AF',
        700: '#0C5177',
      },
      green: {
        600: '#80822D',
      },
      pink: {
        400: '#C65A89',
      },
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },
    fontFamily: {
      quicksand: ['Quicksand', 'sans-serif'],
      londrina: ['Londrina Solid', 'cursive'],
    },
  },

  plugins: [],
}
