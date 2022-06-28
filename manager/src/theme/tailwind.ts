import resolveConfig from 'tailwindcss/resolveConfig'
// eslint-disable-next-line import/extensions
import tailwindConfig from '../../tailwind.config.js'

export const tailwind = resolveConfig(tailwindConfig)

export const tailwindColors = tailwind.theme.colors
