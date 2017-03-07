/* eslint-disable import/prefer-default-export */
import db from '../../services/db';
import queries from './queries';

export function getTypes(req, res) {
  db.query(queries.getTypes)
    .then(data => res.send(data));
}
