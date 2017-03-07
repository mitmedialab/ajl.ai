/**
 * This file defines the redux actions within the application. It should
 * eventually be split up into multiple files.
 *
 * Actions follow the Flux Standard Action format, described in more detail
 * here: https://github.com/acdlite/flux-standard-action We do not utilize
 * libraries like redux-actions at this time, as they do not provide tangible
 * benefits over manually conforming to a standard in an application of this
 * size; they could be considered later on as the application grows.
 */

/** @prop {string} Action to select the active face */
export const SELECT_FACE = 'SELECT_FACE';
export const selectFace = image => ({
  type: SELECT_FACE,
  payload: image,
});

/** @prop {string} Action to select the next available face */
export const NEXT_FACE = 'NEXT_FACE';
export const nextFace = () => ({
  type: NEXT_FACE,
});

/** @prop {string} Action to select the previous available face */
export const PREVIOUS_FACE = 'PREVIOUS_FACE';
export const previousFace = () => ({
  type: PREVIOUS_FACE,
});

/** @prop {string} Action to populate the faces within the store */
export const SET_FACES = 'SET_FACES';
export const setFaces = faces => ({
  type: SET_FACES,
  payload: faces,
});

/** @prop {string} Action to trigger a request for face data */
export const REQUEST_FACES = 'REQUEST_FACES';

export const requestFaces = () => ({
  type: REQUEST_FACES,
});

/** @prop {string} Action to populate the faces within the store when the request succeeds */
export const RECEIVE_FACES = 'RECEIVE_FACES';
export const receiveFaces = faces => ({
  type: RECEIVE_FACES,
  payload: faces,
});

/** @prop {string} Action to signal a data request failed */
export const REQUEST_FACES_FAILED = 'REQUEST_FACES_FAILED';
export const requestFacesFailed = error => ({
  type: REQUEST_FACES_FAILED,
  payload: error,
  error: true,
});

/** @prop {string} Action to trigger a request for face data */
export const REQUEST_ANNOTATIONS = 'REQUEST_ANNOTATIONS';
export const requestAnnotations = () => ({
  type: REQUEST_ANNOTATIONS,
});

/** @prop {string} Action to populate the annotations within the store when the request succeeds */
export const RECEIVE_ANNOTATIONS = 'RECEIVE_ANNOTATIONS';
export const receiveAnnotations = annotations => ({
  type: RECEIVE_ANNOTATIONS,
  payload: annotations,
});

/** @prop {string} Action to signal a data request failed */
export const REQUEST_ANNOTATIONS_FAILED = 'REQUEST_ANNOTATIONS_FAILED';
export const requestAnnotationsFailed = error => ({
  type: REQUEST_ANNOTATIONS_FAILED,
  payload: error,
  error: true,
});
