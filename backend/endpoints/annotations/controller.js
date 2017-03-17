/* eslint-disable import/prefer-default-export */
import { isEqual, omit, find } from 'lodash';
import db from '../../services/db';
import queries from './queries';
import { apiDatabaseError } from '../../base/controller';

export function getTypes(req, res) {
  db.query(queries.getTypes)
    .then(data => res.send(data));
}

export function getWorkload(req, res) {
  const numTruths = req.session.enrolled ? 2 : 8;
  const limit =  1;//req.session.enrolled ? 3 : 12;
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

    return Promise.all(allQueries).then(() => storedWorkload);
  })

  // check if they got the 8 ground truths correct
  // if they didn't get 8 right then have them start over
  // if they did, then check if the 4 unknown images have 4 agreeing submissions
  // and make a new ground truth
  .then((storedWorkload) => {
    const images = req.body.images;

    const knownImageIds = storedWorkload[0].images
      .filter(({ is_known }) => is_known)
      .map(({ id }) => id);

    return db.query(queries.getKnowns, {
      imageIds: knownImageIds,
    }).then((knownAnnotations) => {

      // go over every image that came back
      // and check it against the known truths database
      images.forEach( image => {
        image.annotations.forEach( annotation => {
          const currentKnownAnnotation = find(knownAnnotations, function(o) {
            return o.data.name === annotation.name;
          });

          const comparisonResult = currentKnownAnnotation.data.value === annotation.option;

          if(!comparisonResult) {
            throw new Error('your annotations did not match the known work of other annotators');
          }
        });
      });

      // if they didn't have any errors with the comparisons
      // now they are enrolled
      session.enrolled = true;

      // TODO query annotations table to see if there are 3+ annotations
      // that agree with each of the new annotations, and if so, store a new
      // known annotation in the known db


      // now we want to return a new workload in response
      return getWorkload(req, res);

    });
  })
  // Respond with an error if it doesn't work
  .catch(e => apiDatabaseError(e, req, res));
}
