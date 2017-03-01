const config = require('../../../config');

const connect = (config.db.url) ?  { url : config.db.url } : config.db;

module.exports = {
  client: {
    name: 'postgresql',
    config: connect,
    'journalTable': 'schema_journal'
  },
  files: {
    directory: __dirname,
  },
};
