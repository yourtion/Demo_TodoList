module.exports = {
  extends: 'guo/vue',
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
    sessionStorage: false,
    localStorage: false,
    commit: false,
  },
};
