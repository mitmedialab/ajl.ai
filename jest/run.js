process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

const jest = require('jest');

const argv = process.argv.slice(2);

jest.run(argv);
