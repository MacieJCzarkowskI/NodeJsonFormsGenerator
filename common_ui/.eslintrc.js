module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig-eslint.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'plugin:jsx-a11y/recommended',
    'prettier/react',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', 'jest', 'react'],
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    "react/require-default-props": "off",
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'import/no-cycle': 'off',
    'no-multi-assign': 'off',
    'import/imports-first': ['error', 'absolute-first'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: ['error', 'never'],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
    'import/resolver': {
      'babel-module': {},
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
}
