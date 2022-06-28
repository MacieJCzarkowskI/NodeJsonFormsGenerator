const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            compilerOptions: {},
        },
    },
    webpackFinal: async (config) => {
        config.resolve.plugins.push(
            // @ts-ignore
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
            }),
        )

        config.module.rules.push({
            test: /\.(ts|js|tsx|jsx)$/,
            include: [path.resolve(__dirname, '..', 'src')],
            loader: require.resolve('babel-loader'),
            options: {
                plugins: ['emotion'],
                presets: [
                    require.resolve('@babel/preset-react'),
                    require.resolve('@babel/preset-typescript'),
                    require.resolve('@emotion/babel-preset-css-prop'),
                ],
            },
        })

        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
        })

        return config
    },
    babel: async (options) => {
        return options
    },
}
