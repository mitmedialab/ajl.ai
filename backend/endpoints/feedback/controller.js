/* eslint-disable import/prefer-default-export */
import db from '../../services/db';
import feedback from './queries';
import { apiDatabaseError } from '../../base/controller';

export function create(req, res) {
  return db.query(feedback.insert, {
    email: req.body.email,
    response: req.body.response,
  }).then(result => res.status(201).send(result[0]))
    .catch(e => apiDatabaseError(e, req, res));
}
