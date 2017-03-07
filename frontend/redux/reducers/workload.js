import { combineReducers } from 'redux';
import { RECEIVE_WORKLOAD } from '../actions';

function id(state = null, action) {
  if (action.type === RECEIVE_WORKLOAD) {
    return action.payload[0].id;
  }
  return state;
}

function todo(state = [], action) {
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
