/**
 * This reducer manages UI state, such as whether a specific modal is open.
 */
import { combineReducers } from 'redux';
import {
  SHOW_FAQ_MODAL,
  HIDE_FAQ_MODAL,
  SHOW_AGE_CONSENT_MODAL,
  HIDE_AGE_CONSENT_MODAL,
} from '../actions';

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

function AgeConsentModal(state = false, action) {
  switch (action.type) {
  case SHOW_AGE_CONSENT_MODAL:
    return true;

  case HIDE_AGE_CONSENT_MODAL:
    return false;

  default:
    return state;
  }
}

export default combineReducers({
  FAQModal,
  AgeConsentModal,
});
