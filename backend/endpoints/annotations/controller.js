/* eslint-disable import/prefer-default-export */
import { isEqual } from 'lodash';
import db from '../../services/db';
import queries from './queries';
import { apiDatabaseError } from '../../base/controller';

export function getTypes(req, res) {
  db.query(queries.getTypes)
    .then(data => res.send(data));
}

export function getWorkload(req, res) {
  const limit = req.session.enrolled ? 3 : 12;

  // get a set of images from the db
  // limit is based on enrollment status
  db.query(queries.getImages, { limit })
  // then store those images as a workload so we can use the workload to
  // validate that the annotations which come back
  // are for a valid workload that the session should have had access to
  .then((images) => {
    return db.query(queries.storeWorkload, {
      annotatorId: req.session.annotatorId,
      images,
    });
  })
  // then send the workload to the user with the workload id from the
  // prior storeWorload query
  .then((data) => {
    res.send(data);
  })
  // Respond with an error if it doesn't work
  .catch(e => apiDatabaseError(e, req, res));
}

export function postAnnotations(req, res) {
  const session = req.session;
  const annotatorId = session.annotatorId;
  const allQueries = [];

  // get the current annotator's workload out of the DB
  db.query(queries.getWorkload, {
    annotatorId,
    workloadId: req.body.workloadId,
  })
  // Then validate that the images ids in the current annotator's stored workload
  // match the image ids whose annotations are being submitted
  .then((data) => {
    if (! data.length) {
      throw new Error('unknown workload: no stored workload');
    }
    const images = data[0].images;
    const storedIds = images.map(image => image.id);
    const submittedIds = req.body.images.map(image => image.id);
    if (! isEqual(storedIds.sort(), submittedIds.sort())) {
      throw new Error(`unknown workload: session workload of #s ${submittedIds} did not match stored workload #s ${storedIds}`);
    }
  })
  // then if the workload is valid, store the annotations in the db
  .then(() => {
    const workloadId = req.body.workloadId;
    req.body.images.forEach(({ id: imageId, demographics }) => {
      demographics.forEach(({ name, option }) => {
        const params = {
          annotatorId,
          imageId,
          workloadId,
          name,
          option,
        };
        allQueries.push(db.query(queries.postAnnotations, params));
      });
    });

    return Promise.all(allQueries);
  })
  /*
  TODO:
  .then(() => {
    // check if they got the 8 ground truths correct
    // if they didn't get 8 right then have them start over
    // if they did, then check if the 4 unknown images have 4 agreeing submissions
    // and make a new ground truth
  })
  */
  // if they did 12 and got 8 right, now they are enrolled
  .then(() => {
    session.enrolled = true;

    // now we want to return a new workload in the 201 success created response
    // start by gettting a set of images from the db
    db.query(queries.getImages, { limit: 1 })
    // then store those images as a workload so we can use the workload to
    // validate that the annotations which come back
    // are for a valid workload that the session should have had access to
    .then((images) => {
      return db.query(queries.storeWorkload, {
        annotatorId: req.session.annotatorId,
        images,
      });
    })
    // now we can respond 201 with the new workload
    .then((data) => {
      res.status(201).send(data);
    });
  })
  // Respond with an error if it doesn't work
  .catch(e => apiDatabaseError(e, req, res));
}
