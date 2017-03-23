/**
 * This reducer manages UI flags that indicate whether any AJAX requests are
 * currently in-flight within the application.
 */
import { combineReducers } from 'redux';
import {
  REQUEST_ATTRIBUTES, RECEIVE_ATTRIBUTES, REQUEST_ATTRIBUTES_FAILED,
  REQUEST_WORKLOAD, RECEIVE_WORKLOAD, REQUEST_WORKLOAD_FAILED,
  COMPLETE_WORKLOAD, COMPLETE_WORKLOAD_FAILED,
} from '../actions';

// Each of these methods reduces the state property that shares its name

function attributes(state = false, action) {
  switch (action.type) {

  case REQUEST_ATTRIBUTES:
    return true;

  case RECEIVE_ATTRIBUTES:
  case REQUEST_ATTRIBUTES_FAILED:
    return false;

  default:
    return state;
  }
}

function workload(state = false, action) {
  switch (action.type) {

  case REQUEST_WORKLOAD:
  case COMPLETE_WORKLOAD:
    return true;

  case RECEIVE_WORKLOAD:
  case REQUEST_WORKLOAD_FAILED:
  case COMPLETE_WORKLOAD_FAILED:
    return false;

  default:
    return state;
  }
}

export default combineReducers({
  attributes,
  workload,
});
