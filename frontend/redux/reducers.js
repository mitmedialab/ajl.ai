import { combineReducers } from 'redux';

import facesReducer from './reducers/faces';
import loadingReducer from './reducers/loading';
import annotationsReducer from './reducers/annotations';
import demographicsReducer from './reducers/demographics';
import workloadReducer from './reducers/workload';

/*
 * Combine reducers to produce single reducer for state.
 * Each reducer handles a sub-tree of the state tree based
 * on its name.
 */
export default combineReducers({
  faces: facesReducer,
  loading: loadingReducer,
  annotations: annotationsReducer,
  demographics: demographicsReducer,
  workload: workloadReducer,
});
