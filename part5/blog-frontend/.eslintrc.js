module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
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
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [0],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': [0],
  },
};
