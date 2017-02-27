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

/** @type {string} Action to select the active face */
export const SELECT_FACE = 'SELECT_FACE';
/** SELECT_FACE action creator */
export const selectFace = image => ({
  type: SELECT_FACE,
  payload: image,
});

/** @type {string} Action to select the next available face */
export const NEXT_FACE = 'NEXT_FACE';
/** NEXT_FACE action creator */
export const nextFace = () => ({
  type: NEXT_FACE,
});

/** @type {string} Action to select the previous available face */
export const PREVIOUS_FACE = 'PREVIOUS_FACE';
/** PREVIOUS_FACE action creator */
export const previousFace = () => ({
  type: PREVIOUS_FACE,
});

/** @type {string} Action to populate the faces within the store */
export const SET_FACES = 'SET_FACES';
/** SET_FACES action creator */
export const setFaces = faces => ({
  type: SET_FACES,
  payload: faces,
});

/** @type {string} Action to trigger a request for face data */
export const REQUEST_FACES = 'REQUEST_FACES';
/** REQUEST_FACES action creator */
export const requestFaces = () => ({
  type: REQUEST_FACES,
});

/** @type {string} Action to populate the faces within the store when the request succeeds */
export const RECEIVE_FACES = 'RECEIVE_FACES';
/** RECEIVE_FACES action creator */
export const receiveFaces = faces => ({
  type: RECEIVE_FACES,
  payload: faces,
});

/** @type {string} Action to signal a data request failed */
export const REQUEST_FACES_FAILED = 'REQUEST_FACES_FAILED';
/** REQUEST_FACES_FAILED action creator */
export const requestFacesFailed = error => ({
  type: REQUEST_FACES_FAILED,
  payload: error,
  error: true,
});
