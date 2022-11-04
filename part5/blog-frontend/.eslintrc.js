module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsx: true,
  },
  plugins: [
    'react', 'jest',
  ],
  rules: {
    'react/jsx-filename-extension': [0],
    'react/react-in-jsx-scope': 'off',
    'react/display-name': [1],
    'react/prop-types': [0],
    'no-alert': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
