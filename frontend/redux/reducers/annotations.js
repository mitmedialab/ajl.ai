/**
 * This reducer is responsible for maintaining a running log of the annotations
 * that have been submitted by a person using the application, for a specific
 * workload. Whenever a new workload is received the state is cleared and we
 * prepare for a new set of answers for the new workload; additionally, this
 * object is designed to conform to the format the API expects to receive, so
 * that it can be shipped to our backend without transformation.
 */
import { combineReducers } from 'redux';
import {
  SAVE_DEMOGRAPHIC_ANNOTATIONS,
  RECEIVE_WORKLOAD,
} from '../actions';

// Each of these methods reduces the state property that shares its name

function workloadId(state = null, action) {
  if (action.type === RECEIVE_WORKLOAD) {
    return action.payload[0].id;
  }
  return state;
}

function images(state = [], action) {
  if (action.type === RECEIVE_WORKLOAD) {
    return [];
  }
  if (action.type === SAVE_DEMOGRAPHIC_ANNOTATIONS) {
    return state.concat({
      id: action.payload.id,
      annotations: action.payload.demographics,
    });
  }
  return state;
}

export default combineReducers({
  workloadId,
  images,
});
