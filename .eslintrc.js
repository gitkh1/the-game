module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'eol-last': 2,
    'prefer-const': 2,
    'no-eval': 2,
    'no-var': 2,
    'no-multi-str': 2,
    semi: 2,
    eqeqeq: 2,
  },
};
