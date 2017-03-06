module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'padded-blocks': ['off'],
    'space-unary-ops': ['error', {
      words: true,
      nonwords: false,
      overrides: {
        '!': true
      }
    }],
    'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'ignore'
    }],
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: true
    }],
    'arrow-body-style': ['off'],
    // Allow importing devDependencies at the top level: rule is re-enabled
    // within the frontend and backend directories
    'import/no-extraneous-dependencies': ['off'],
  }
};
