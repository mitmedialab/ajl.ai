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
  FLAG_IMAGE,
  RECEIVE_WORKLOAD,
} from '../actions';

// Each of these methods reduces the state property that shares its name

function workloadId(state = null, action) {
  switch (action.type) {
  case RECEIVE_WORKLOAD:
    return action.payload[0].id;

  default:
    return state;
  }
}

function images(state = [], action) {
  switch (action.type) {
  case RECEIVE_WORKLOAD:
    return [];

  case SAVE_DEMOGRAPHIC_ANNOTATIONS:
  case FLAG_IMAGE:
    return state.concat({
      id: action.payload.id,
      annotations: action.payload.annotations,
    });

  default:
    return state;
  }
}

export default combineReducers({
  workloadId,
  images,
});
