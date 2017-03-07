/* eslint-disable import/prefer-default-export */
import db from '../../services/db';
import queries from './queries';
import { apiDatabaseError } from '../../base/controller';

export function getTypes(req, res) {
  db.query(queries.getTypes)
    .then(data => res.send(data));
}

export function getWorkload(req, res) {

  const limit = req.session.enrolled ? 3 : 12;

  db.query(queries.getWorkload, { limit })
    .then(data => res.send(data));
}

export function postAnnotations(req, res) {
  const session = req.session;
  const annotatorId = session.annotatorId;
  const allQueries = [];

  req.body.forEach(({ image_id: imageId, demographics }) => {
    demographics.forEach(({ name, option }) => {
      const params = {
        annotatorId,
        imageId,
        name,
        option,
      };
      allQueries.push(db.query(queries.postAnnotations, params));
    });
  });

  Promise.all(allQueries).then(() => {
    session.enrolled = true;

    res.status(201).send();
  }).catch(e => apiDatabaseError(e, req, res));
}
