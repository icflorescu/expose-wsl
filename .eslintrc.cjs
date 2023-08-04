module.exports = {
  env: { es2021: true, node: true },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'object-shorthand': 'warn'
  }
};
