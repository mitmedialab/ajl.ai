import config from '../../config';
import session from 'express-session';
import PGSession from 'connect-pg-simple';
const pgSession = PGSession(session);

export default session({
  store: new pgSession({
    conString: config.db.url || config.db
  }),
  saveUninitialized: false,
  secret: config.SESSION_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
});
