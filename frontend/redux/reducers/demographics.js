import { combineReducers } from 'redux';
import { RECEIVE_ANNOTATIONS, NEXT_FACE } from '../actions';

function order(state = [], action) {
  if (action.type === RECEIVE_ANNOTATIONS) {
    return action.payload.demographics.map(question => question.name);
  }
  return state;
}

function questions(state = {}, action) {
  if (action.type === RECEIVE_ANNOTATIONS) {
    return action.payload.demographics.reduce((newState, item) => ({
      ...newState,
      [item.name]: item,
    }), {});
  }
  return state;
}

function current(state = 0, action) {
  if ([
    RECEIVE_ANNOTATIONS,
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
