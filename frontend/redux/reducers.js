import { combineReducers } from 'redux';

import loadingReducer from './reducers/loading';
import demographicsReducer from './reducers/demographics';
import workloadReducer from './reducers/workload';
import annotations from './reducers/annotations';

/*
 * Combine reducers to produce single reducer for state.
 * Each reducer handles a sub-tree of the state tree based
 * on its name.
 */
export default combineReducers({
  loading: loadingReducer,
  demographics: demographicsReducer,
  workload: workloadReducer,
  // The image annotations to be submitted to the server
  annotations,
});
