const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './index.html',
  ],
  theme: {
    colors: {
      'primary': '#3f3cbb',
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      gray: colors.gray,
    },
    extend: {
      outline: false,
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: true
  }
}
