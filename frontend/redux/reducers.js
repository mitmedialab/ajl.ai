import { combineReducers } from 'redux';

import loading from './reducers/loading';
import demographicAttributes from './reducers/demographic-attributes';
import workload from './reducers/workload';
import annotations from './reducers/annotations';
import overallStats from './reducers/overall-stats';
import errors from './reducers/errors';

/*
 * Combine reducers to produce single reducer for state.
 * Each reducer handles a sub-tree of the state tree based
 * on its name.
 */
export default combineReducers({
  // UI state indicating whether any AJAX calls are pending
  loading,
  // annotatable demographic attributes and their options
  demographicAttributes,
  // The workload of images currently being annotated
  workload,
  // The image annotations to be submitted to the server
  annotations,
  // Global "overall" statistics so users can see global contribution to the
  // project
  overallStats,
  // The error reducer stores API errors and any viable actions
  // a user could take to resolve the error
  errors,
});
