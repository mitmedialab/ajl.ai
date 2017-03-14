/**
 * This reducer manages UI flags that indicate whether any AJAX requests are
 * currently in-flight within the application.
 */
import {
  REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS, REQUEST_ANNOTATIONS_FAILED,
  REQUEST_WORKLOAD, RECEIVE_WORKLOAD, REQUEST_WORKLOAD_FAILED,
  COMPLETE_WORKLOAD, COMPLETE_WORKLOAD_FAILED,
} from '../actions';

const defaultState = {
  faces: false,
  annotations: false,
};

export default function loadingReducer(state = defaultState, action) {
  switch (action.type) {

  case REQUEST_ANNOTATIONS:
    return {
      ...state,
      annotations: true,
    };

  case RECEIVE_ANNOTATIONS:
  case REQUEST_ANNOTATIONS_FAILED:
    return {
      ...state,
      annotations: false,
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
