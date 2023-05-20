module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsx: true
  },
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    'react/jsx-filename-extension': [0],
    'react/react-in-jsx-scope': 'off',
    'react/display-name': [1],
    'react/prop-types': [0],
    'no-alert': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
