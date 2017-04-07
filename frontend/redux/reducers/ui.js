/**
 * This reducer manages UI state, such as whether a specific modal is open.
 */
import { combineReducers } from 'redux';
import { SHOW_FAQ_MODAL, HIDE_FAQ_MODAL } from '../actions';

// Each of these methods reduces the state property that shares its name

function FAQModal(state = false, action) {
  switch (action.type) {
  case SHOW_FAQ_MODAL:
    return true;

  case HIDE_FAQ_MODAL:
    return false;

  default:
    return state;
  }
}

export default combineReducers({
  FAQModal,
});
