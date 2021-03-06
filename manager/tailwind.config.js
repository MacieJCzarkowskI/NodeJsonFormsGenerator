// eslint-disable-next-line global-require
const theme = require('./tailwind.theme')

module.exports = {
  purge: {
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  },
  theme: {
    extend: theme,
  },
  variants: {},
  plugins: [],
  /**
   * Only have the one below till TailwindCSS V2.0 releases:
   * https://tailwindcss.com/docs/upcoming-changes#remove-deprecated-gap-utilities.
   */
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
