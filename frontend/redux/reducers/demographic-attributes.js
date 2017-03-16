/**
 * This reducer stores the perceived demographic attributes for which a person
 * will submit image annotations. An example of an attribute object:
 *
 *     {
 *       name: 'Perceived Ethnicity',
 *       options: [
 *         'black',
 *         'white',
 *         'lantino/a',
 *         'asian',
 *         'not listed'
 *        ]
 *     }
 */
import { combineReducers } from 'redux';
import {
  RECEIVE_ATTRIBUTES,
 } from '../actions';

function order(state = [], action) {
  switch (action.type) {
  case RECEIVE_ATTRIBUTES:
    return action.payload.map(question => question.name);

  default:
    return state;
  }
}

function byName(state = {}, action) {
  switch (action.type) {
  case RECEIVE_ATTRIBUTES:
    return action.payload.reduce((newState, item) => ({
      ...newState,
      [item.name]: item,
    }), {});

  default:
    return state;
  }
}

export default combineReducers({
  // A dictionary of attribute objects keyed by .name
  byName,
  // An ordered array of name keys
  order,
});
