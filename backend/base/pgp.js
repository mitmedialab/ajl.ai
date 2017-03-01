import bluebird from 'bluebird';
import pgp from 'pg-promise';
import monitor from 'pg-monitor';

import config from '../../config';

function apiError (err) {
  if (err.constraint) { // Converting constraint violations into HTTP codes
    const key = err.constraint.split('_');
    err.statusCode = 409;
    if (err.code === '23505') { // Uniqueness violation
      err.message = `${key[0]} resource with ${key[1]} already exists`;
    } else {
      err.message = err.detail;
    }
  }
  if (err instanceof pgp.errors.QueryResultError) {
    // This means we had a query that really should have returned a result;
    // if it doesn't, that's a 404 from the API's perspective
    if (err.code === pgp.errors.queryResultErrorCode.noData) {
      err.statusCode = 404;
    }
  }
  return err;
}

const options = {
  promiseLib: bluebird,
  extend: function (obj, dc) {
    obj.apiError = apiError;
  }
};

if (config.DEBUG_SQL) {
  monitor.attach(options);
  monitor.setTheme('matrix');
}
const _pgp = pgp(options);
_pgp.pg.defaults.ssl = config.db.ssl;
export default _pgp;
