module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '@shared/(.*)$': ['<rootDir>/src/_shared/$1'],
    '@styles': ['<rootDir>/src/_styles'],
    '@styles/(.*)$': ['<rootDir>/src/_styles/$1'],
    '@components': ['<rootDir>/src'],
    '@components/(.*)$': ['<rootDir>/src/$1'],
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.jest.json',
      babelConfig: true,
      diagnostics: false,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/*.(test|spec).(js|jsx|ts|tsx)'],
}
