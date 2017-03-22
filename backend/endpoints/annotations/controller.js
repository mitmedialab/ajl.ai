/* eslint-disable import/prefer-default-export */
import { isEqual, omit } from 'lodash';
import db from '../../services/db';
import queries from './queries';
import { apiDatabaseError } from '../../base/controller';

export function getTypes(req, res) {
  db.query(queries.getTypes)
    .then(data => res.send(data));
}

export function getWorkload(req, res) {
  const numTruths = req.session.enrolled ? 2 : 8;
  const limit = req.session.enrolled ? 3 : 12;
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
      const images = workload.images.map(
        image => omit(image, 'is_known')
      );
      return { ...workload, images };
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

    return Promise.all(allQueries)
    // return the storedWorkload through the chain
      .then(() => storedWorkload);
  })

  // check if they got the 8 ground truths correct
  // if they didn't get 8 right then have them start over
  // if they did, then check if the 4 unknown images have 4 agreeing submissions
  // and make a new ground truth
  .then((storedWorkload) => {
    const images = req.body.images;

    const knownImageIds = storedWorkload[0].images
      .filter(({ is_known: known }) => known)
      .map(({ id }) => id);

    const annotationMap = {};
    images.forEach((image) => {
      const annotations = {};
      annotationMap[image.id] = annotations;

      image.annotations.forEach((annotation) => {
        annotations[annotation.name] = annotation;
      });
    });

    console.log('annotationMap: ', annotationMap);
    console.log('knownImageIds:', knownImageIds);

    if (!knownImageIds) {
      // if they worked through every known image in the database, give them a score of 1
      return db.query(queries.scoreWorkload, { id: storedWorkload[0].id, score: 1 });
    }

    return db.query(queries.getKnownAnnotations, {
      imageIds: knownImageIds,
    }).then((knownAnnotations) => {

      const correctKnowns = knownAnnotations.reduce((memo, known) => {
        if (annotationMap[known.image_id][known.name].option === known.data.value) {
          return memo + 1;
        }
        console.log('>>> Got one wrong', known, 'vs', annotationMap[known.image_id][known.name]);
        return memo;
      }, 0);

      // Basically a percent for now...
      const score = correctKnowns / knownAnnotations.length;

      console.log('>>> final score: ', correctKnowns, 'of', knownAnnotations.length, score);
      console.log('workload #', storedWorkload[0].id);
      db.query(queries.scoreWorkload, { id: storedWorkload[0].id, score });

      if (score === 1) {
        // if they didn't have any errors with the comparisons
        // now they are enrolled
        session.enrolled = true;
      }

      // TODO query annotations table to see if there are 3+ annotations
      // that agree with each of the new annotations, and if so, store a new
      // known annotation in the known db
    });
  })
  // the reply to submitting a workload should be getting a new one
  .then(() => getWorkload(req, res))
  // Respond with an error if it doesn't work
  .catch(e => apiDatabaseError(e, req, res));
}
