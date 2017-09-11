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

// Helper functions

function findFlagAttributeName(attributes) {
  const flagAttr = attributes.find(attr => attr.flag);
  return flagAttr ? flagAttr.name : null;
}

// Each of these methods reduces the state property that shares its name

function order(state = [], action) {
  switch (action.type) {
  case RECEIVE_ATTRIBUTES:
    return action.payload
      .sort((a, b) => a.sort_order - b.sort_order)
      .filter(question => ! question.flag)
      .map(question => question.name);

  default:
    return state;
  }
}

function flagAttribute(state = '', action) {
  switch (action.type) {
  case RECEIVE_ATTRIBUTES:
    return findFlagAttributeName(action.payload) || state;

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
  // The name of the attribute to be used for flagging an invalid or otherwise
  // inappropriate image
  flagAttribute,
});
