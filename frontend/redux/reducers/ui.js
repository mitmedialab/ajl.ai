/**
 * This reducer manages UI state, such as whether a specific modal is open.
 */
import { combineReducers } from 'redux';
import { SHOW_FEEDBACK_MODAL, HIDE_FEEDBACK_MODAL } from '../actions';

// Each of these methods reduces the state property that shares its name

function feedbackModal(state = false, action) {
  switch (action.type) {
  case SHOW_FEEDBACK_MODAL:
    return true;

  case HIDE_FEEDBACK_MODAL:
    return false;

  default:
    return state;
  }
}

export default combineReducers({
  feedbackModal,
});
