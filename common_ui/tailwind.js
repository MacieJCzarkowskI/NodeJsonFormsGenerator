// eslint-disable-next-line global-require
const theme = require('./tailwind.theme')

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
  theme: {
    extend: theme,
  },
  variants: {},
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
