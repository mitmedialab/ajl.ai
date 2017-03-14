import { combineReducers } from 'redux';
import {
  RECEIVE_ANNOTATIONS,
  NEXT_FACE,
  SAVE_DEMOGRAPHIC_ANNOTATIONS,
 } from '../actions';

function order(state = [], action) {
  if (action.type === RECEIVE_ANNOTATIONS) {
    return action.payload.map(question => question.name);
  }
  return state;
}

function questions(state = {}, action) {
  if (action.type === RECEIVE_ANNOTATIONS) {
    return action.payload.reduce((newState, item) => ({
      ...newState,
      [item.name]: item,
    }), {});
  }
  return state;
}

function current(state = 0, action) {
  if ([
    RECEIVE_ANNOTATIONS,
    SAVE_DEMOGRAPHIC_ANNOTATIONS,
    NEXT_FACE,
  ].includes(action.type)) {
    return 0;
  }
  return state;
}

export default combineReducers({
  order,
  questions,
  current,
});
