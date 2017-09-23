/*
 * A reducer to manage global "overall" statistic on the site so users can see
 * the global contribution to the project.
 */

import { RECEIVE_OVERALL_STATS } from '../actions';

export default (state = {}, action) => {
  if (action.type === RECEIVE_OVERALL_STATS) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};
