module.exports = {
  env: { es2021: true, node: true },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    'prettier/prettier': ['error', { singleQuote: true }],
    semi: ['error', 'always'],
  },
};
