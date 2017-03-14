/**
 * This reducer contains a workload of images to be annotated, which are
 * loaded from the server in a batch whenever the prior workload is completed
 * (i.e., fully annotated & posted back to the API).
 */
import { combineReducers } from 'redux';
import {
  REQUEST_WORKLOAD,
  RECEIVE_WORKLOAD,
  SAVE_DEMOGRAPHIC_ANNOTATIONS,
} from '../actions';

function id(state = null, action) {
  if (action.type === RECEIVE_WORKLOAD) {
    return action.payload[0].id;
  }
  return state;
}

function todo(state = [], action) {
  if (action.type === REQUEST_WORKLOAD) {
    return [];
  }
  if (action.type === SAVE_DEMOGRAPHIC_ANNOTATIONS) {
    return state.slice(1);
  }
  if (action.type === RECEIVE_WORKLOAD) {
    return action.payload[0].images.map(item => item.id);
  }
  return state;
}

function byId(state = {}, action) {
  if (action.type === RECEIVE_WORKLOAD) {
    return action.payload[0].images.reduce((newState, item) => ({
      ...newState,
      [item.id]: item,
    }), {});
  }
  return state;
}

function complete(state = [], action) {
  if (action.type === SAVE_DEMOGRAPHIC_ANNOTATIONS) {
    return state.concat(action.payload.id);
  }
  if (action.type === RECEIVE_WORKLOAD) {
    return [];
  }
  return state;
}

export default combineReducers({
  id,
  todo,
  byId,
  complete,
});
