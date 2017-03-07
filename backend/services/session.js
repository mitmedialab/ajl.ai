import session from 'express-session';
import PGSession from 'connect-pg-simple';

import config from '../../config';

const SessionConstructor = PGSession(session);

export default session({
  store: new SessionConstructor({
    conString: config.db.url || config.db,
  }),
  saveUninitialized: false,
  secret: config.SESSION_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
});
