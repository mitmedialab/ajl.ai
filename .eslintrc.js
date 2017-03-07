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

    'import/no-extraneous-dependencies': ['error', { devDependencies: [
      // only allow devDependencies in these folders:
      '*.js', '**/__tests__/*', 'frontend/**/*', 'jest/**/*'
    ] }],
  }
};
