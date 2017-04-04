/* eslint-disable import/prefer-default-export */
import { isEqual, omit } from 'lodash';
import db from '../../services/db';
import queries from './queries';
import { apiDatabaseError } from '../../base/controller';

export function getAttributes(req, res) {
  db.query(queries.getAttributes)
    .then(data => res.send(data));
}

export function getOverallStats(req, res) {
  db.query(queries.getOverallStats)
    .then(data => res.send(data));
}

export function getWorkload(req, res) {
  // First time users see 8 truths, 4 new images.
  // Every workload after the first should get 2 truths, 1 new image.
  const numTruths = req.session.repeatAnnotator ? 2 : 8;
  const limit = req.session.repeatAnnotator ? 3 : 12;
  const annotatorId = req.session.annotatorId;

  // get a set of images from the db
  // limit is based on enrollment status
  db.query(queries.getImages, { annotatorId, numTruths, limit })
  // then store those images as a workload so we can use the workload to
  // validate that the annotations which come back
  // are for a valid workload that the session should have had access to
  .then((images) => {
    return db.query(queries.storeWorkload, {
      annotatorId,
      images,
    });
  })
  // then send the workload to the user with the workload id from the
  // prior storeWorload query
  .then((workloads) => {
    const response = workloads.map((workload) => {
      const { id, complete_count: completeCount } = workload;
      const images = workload.images.map(
        image => omit(image, 'is_known')
      );
      return { id, images, completeCount };
    });

    res.send(response);
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
  .then((storedWorkload) => {
    if (! storedWorkload.length) {
      throw new Error('unknown workload: no stored workload');
    }
    const images = storedWorkload[0].images;
    const storedIds = images.map(image => image.id);
    const submittedIds = req.body.images.map(image => image.id);
    if (! isEqual(storedIds.sort(), submittedIds.sort())) {
      throw new Error(`unknown workload: session workload of #s ${submittedIds} did not match stored workload #s ${storedIds}`);
    }

    return storedWorkload;
  })

  // then if the workload is valid, store the annotations in the db
  .then((storedWorkload) => {
    const workloadId = req.body.workloadId;
    req.body.images.forEach(({ id: imageId, annotations }) => {
      annotations.forEach(({ name, value }) => {
        const params = {
          annotatorId,
          imageId,
          workloadId,
          name,
          value,
        };
        allQueries.push(db.query(queries.postAnnotations, params));
      });
    });

    allQueries.push(
      db.query(queries.completeWorkload, { id: workloadId })
    );

    return Promise.all(allQueries);
  })
  .then(() => {
    session.repeatAnnotator = true;

    // the reply to submitting a workload should be getting a new one
    return getWorkload(req, res);
  })
  // Respond with an error if it doesn't work
  .catch(e => apiDatabaseError(e, req, res));
}
