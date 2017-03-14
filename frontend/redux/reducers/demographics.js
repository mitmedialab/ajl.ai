/**
 * This reducer contains the annotation types and annotation options relating
 * to the Perceived Demographics screen within the application.
 */
import { combineReducers } from 'redux';
import {
  RECEIVE_ANNOTATIONS,
  SAVE_DEMOGRAPHIC_ANNOTATIONS,
 } from '../actions';

function order(state = [], action) {
  switch (action.type) {
  case RECEIVE_ANNOTATIONS:
    return action.payload.map(question => question.name);

  default:
    return state;
  }
}

function questions(state = {}, action) {
  switch (action.type) {
  case RECEIVE_ANNOTATIONS:
    return action.payload.reduce((newState, item) => ({
      ...newState,
      [item.name]: item,
    }), {});

  default:
    return state;
  }
}

function current(state = 0, action) {
  switch (action.type) {
  case RECEIVE_ANNOTATIONS:
  case SAVE_DEMOGRAPHIC_ANNOTATIONS:
    return 0;

  default:
    return state;
  }
}

export default combineReducers({
  order,
  questions,
  current,
});
