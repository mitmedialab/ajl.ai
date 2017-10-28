/* eslint-disable import/prefer-default-export */
import db from '../../services/db';
import queries from './queries';

export function postAnnotatorDemographics(req, res) {
  const session = req.session;
  const annotatorId = session.annotatorId;
  const annotatorDemographics = req.body;

  db.query(queries.postAnnotatorDemographics, {
    id: annotatorId,
    age: annotatorDemographics.age,
    gender: annotatorDemographics.gender,
    ethnicity: annotatorDemographics.ethnicity,
    country: annotatorDemographics.country,
  });

  res.send(204, '');
}
