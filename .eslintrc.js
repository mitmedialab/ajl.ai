module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2, { SwitchCase: 0 }],
    'no-console': ['off'],
    'padded-blocks': ['off'],
    'quote-props': ['error', 'as-needed'],
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
      '*.js',
      '**/__tests__/*',
      'jest/**/*',
      '**/*.stories.jsx',
      '.storybook/**/*'
    ] }],
  }
};
