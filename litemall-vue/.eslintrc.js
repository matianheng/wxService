module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends: ['plugin:vue/essential', '@vue/prettier'],
  // rules: {
  //   camelcase: 'off',
  //   quotes: ['error', 'single'],
  //   indent: ['error', 2, { SwitchCase: 1 }],
  //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  // },
  parserOptions: {
    parser: 'babel-eslint',  // 使用 Babel 解析器
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/essential',  // 支持 Vue 文件
    'eslint:recommended',
  ],
};
