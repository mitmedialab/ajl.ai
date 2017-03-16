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

/** @prop {string} Action to trigger a request for workload data */
export const REQUEST_WORKLOAD = 'REQUEST_WORKLOAD';
export const requestWorkload = () => ({
  type: REQUEST_WORKLOAD,
});

/** @prop {string} Action to populate the workload within the store when the request succeeds */
export const RECEIVE_WORKLOAD = 'RECEIVE_WORKLOAD';
export const receiveWorkload = workload => ({
  type: RECEIVE_WORKLOAD,
  payload: workload,
});

/** @prop {string} Action to signal a data request failed */
export const REQUEST_WORKLOAD_FAILED = 'REQUEST_WORKLOAD_FAILED';
export const requestWorkloadFailed = error => ({
  type: REQUEST_WORKLOAD_FAILED,
  payload: error,
  error: true,
});

/** @prop {string} Action to trigger a request for face data */
export const REQUEST_ATTRIBUTES = 'REQUEST_ATTRIBUTES';
export const requestAttributes = () => ({
  type: REQUEST_ATTRIBUTES,
});

/** @prop {string} Action to populate the annotations within the store when the request succeeds */
export const RECEIVE_ATTRIBUTES = 'RECEIVE_ATTRIBUTES';
export const receiveAttributes = annotations => ({
  type: RECEIVE_ATTRIBUTES,
  payload: annotations,
});

/** @prop {string} Action to signal a data request failed */
export const REQUEST_ATTRIBUTES_FAILED = 'REQUEST_ATTRIBUTES_FAILED';
export const requestAttributesFailed = error => ({
  type: REQUEST_ATTRIBUTES_FAILED,
  payload: error,
  error: true,
});

export const SAVE_DEMOGRAPHIC_ANNOTATIONS = 'SAVE_DEMOGRAPHIC_ANNOTATIONS';
export const saveDemographicAnnotations = ({ id, annotations }) => ({
  type: SAVE_DEMOGRAPHIC_ANNOTATIONS,
  payload: {
    id,
    annotations,
  },
});

export const COMPLETE_WORKLOAD = 'COMPLETE_WORKLOAD';
export const completeWorkload = workload => ({
  type: COMPLETE_WORKLOAD,
  payload: workload,
});

export const COMPLETE_WORKLOAD_FAILED = 'COMPLETE_WORKLOAD_FAILED';
export const completeWorkloadFailed = error => ({
  type: COMPLETE_WORKLOAD_FAILED,
  payload: error,
  error: true,
});
