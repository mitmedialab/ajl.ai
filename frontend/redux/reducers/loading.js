/**
 * This reducer manages UI flags that indicate whether any AJAX requests are
 * currently in-flight within the application.
 */
import {
  REQUEST_ATTRIBUTES, RECEIVE_ATTRIBUTES, REQUEST_ATTRIBUTES_FAILED,
  REQUEST_WORKLOAD, RECEIVE_WORKLOAD, REQUEST_WORKLOAD_FAILED,
  COMPLETE_WORKLOAD, COMPLETE_WORKLOAD_FAILED,
} from '../actions';

const defaultState = {
  faces: false,
  attributes: false,
};

export default function loadingReducer(state = defaultState, action) {
  switch (action.type) {

  case REQUEST_ATTRIBUTES:
    return {
      ...state,
      attributes: true,
    };

  case RECEIVE_ATTRIBUTES:
  case REQUEST_ATTRIBUTES_FAILED:
    return {
      ...state,
      attributes: false,
    };

  case REQUEST_WORKLOAD:
  case COMPLETE_WORKLOAD:
    return {
      ...state,
      workload: true,
    };

  case RECEIVE_WORKLOAD:
  case REQUEST_WORKLOAD_FAILED:
  case COMPLETE_WORKLOAD_FAILED:
    return {
      ...state,
      workload: false,
    };

  default:
    return state;
  }
}
