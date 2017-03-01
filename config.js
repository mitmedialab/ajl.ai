require('dotenv').config({
  silent: true
});
const ENV = process.env.NODE_ENV || 'development';

const DEV = ENV === 'development';
const PROD = ENV === 'production';
const TEST = ENV === 'test';

const NAME = 'image-annotator';

module.exports = {
  NAME: NAME,
  ENV: ENV,
  DEV: DEV,
  PROD: PROD,
  TEST: TEST,
  HTTP_HOST: process.env.HTTP_HOST || '0.0.0.0',
  HTTP_PORT: process.env.HTTP_PORT || 8000,
  DEBUG_SQL: process.env.DEBUG_SQL,
  SESSION_SECRET: process.env.SESSION_SECRET || 'we shall never surrender',
  SHOW_ERRORS: process.env.SHOW_ERRORS || DEV,
  HTTP_QUIET: process.env.HTTP_QUIET || PROD,
  db: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGNAME || process.env.DB_NAME || NAME,
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    url: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE || PROD
  }
};

