/* eslint-disable no-param-reassign */
require('dotenv').config()
const path = require('path')
const fs = require('fs')
const withTM = require('next-transpile-modules')(['common-ui'])

const ENV_VARS = {
  SITE_NAME: process.env.SITE_NAME,
}

module.exports = withTM({
  env: ENV_VARS,
  publicRuntimeConfig: ENV_VARS,
  poweredByHeader: false,
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['react', ...config.externals]
    } else {
      config.node = {
        fs: 'empty',
      }
    }

    config.resolve.alias.react = path.resolve(__dirname, 'node_modules', 'react')
    config.resolve.alias['react-dom'] = path.resolve(__dirname, 'node_modules', 'react-dom')

    config.resolve.alias['@components'] = path.resolve(__dirname, 'node_modules', 'common-ui', 'src')
    config.resolve.alias['@components/'] = path.resolve(__dirname, 'node_modules', 'common-ui', 'src/')
    config.resolve.alias['@shared'] = path.resolve(__dirname, 'node_modules', 'common-ui', 'src', '_shared/')
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'node_modules', 'common-ui', 'src', '_styles')
    config.resolve.alias['@styles/'] = path.resolve(__dirname, 'node_modules', 'common-ui', 'src', '_styles/')

    const commonUiPath = fs.realpathSync(path.resolve(__dirname, 'node_modules', 'common-ui'))

    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      include: [commonUiPath],
      use: options.defaultLoaders.babel,
    })

    config.module.rules.push({
      test: /\.(tsx|jsx)$/,
      include: [commonUiPath],
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          '@babel/preset-react',
          '@babel/preset-typescript',
          // Emotion preset must run BEFORE reacts preset to properly convert css-prop.
          // Babel preset-ordering runs reversed (from last to first). Emotion has to be after React preset.
          require.resolve('@emotion/babel-preset-css-prop'),
        ],
      },
    })

    // POST CSS FIX
    const oneOf = config.module.rules.find((rule) => typeof rule.oneOf === 'object')
    const fixUse = (use) => {
      if (use.loader.indexOf('css-loader') >= 0 && use.options.modules) {
        use.options.modules.mode = 'local'
      }
    }
    if (oneOf) {
      oneOf.oneOf.forEach((rule) => {
        if (Array.isArray(rule.use)) {
          rule.use.map(fixUse)
        } else if (rule.use && rule.use.loader) {
          fixUse(rule.use)
        }
      })
    }

    return config
  },
})
