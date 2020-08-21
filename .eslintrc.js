const { mode } = require('./utils')

module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 11
  },
  settings: {
    'import/resolver': 'webpack'
  },
  rules: {
    'no-console': mode.prod ? 'warn' : 'off',
    'no-debugger': mode.prod ? 'warn' : 'off'
  }
}
