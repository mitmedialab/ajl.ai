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
  FLAG_IMAGE,
} from '../actions';

function id(state = null, action) {
  switch (action.type) {
  case RECEIVE_WORKLOAD:
    return action.payload[0].id;

  default:
    return state;
  }
}

function todo(state = [], action) {
  switch (action.type) {
  case REQUEST_WORKLOAD:
    return [];

  case SAVE_DEMOGRAPHIC_ANNOTATIONS:
  case FLAG_IMAGE:
    return state.slice(1);

  case RECEIVE_WORKLOAD:
    return action.payload[0].images.map(item => item.id);

  default:
    return state;
  }
}

function byId(state = {}, action) {
  switch (action.type) {
  case RECEIVE_WORKLOAD:
    return action.payload[0].images.reduce((newState, item) => ({
      ...newState,
      [item.id]: item,
    }), {});

  default:
    return state;
  }
}

function complete(state = [], action) {
  switch (action.type) {
  case SAVE_DEMOGRAPHIC_ANNOTATIONS:
  case FLAG_IMAGE:
    return state.concat(action.payload.id);

  case RECEIVE_WORKLOAD:
    return [];

  default:
    return state;
  }
}

function completeCount(state = 0, action) {
  switch (action.type) {
  case RECEIVE_WORKLOAD:
    return action.payload[0].completeCount;

  default:
    return state;
  }
}

export default combineReducers({
  id,
  todo,
  byId,
  complete,
  completeCount,
});
