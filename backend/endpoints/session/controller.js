/* eslint-disable import/prefer-default-export */
import db from '../../services/db';
import queries from './queries';

export function ensureSession(req, res, next) {

  const { session } = req;

  if (session.annotatorId) {
    return next();
  }

  return db.query(queries.createAnnotator, { city: req.ip })
    .then((data) => {
      session.annotatorId = data[0].id;
      next();
    });

}
