import { combineReducers } from 'redux';
import { RECEIVE_WORKLOAD, SAVE_DEMOGRAPHIC_ANNOTATIONS, COMPLETE_WORKLOAD } from '../actions';

function id(state = null, action) {
  if (action.type === RECEIVE_WORKLOAD) {
    return action.payload[0].id;
  }
  return state;
}

function todo(state = [], action) {
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
  if (action.type === COMPLETE_WORKLOAD) {
    console.log('COMPLETE_WORKLOAD IS HAPPENDING', state, action);
  }
  return state;
}

export default combineReducers({
  id,
  todo,
  byId,
  complete,
});
