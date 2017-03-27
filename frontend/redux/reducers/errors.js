/**
 * This reducer is responsible for maintaining a running list of errors
 * reported by the application, usually received from API responses.
 */
import {
  REQUEST_ATTRIBUTES, RECEIVE_ATTRIBUTES, REQUEST_ATTRIBUTES_FAILED,
  REQUEST_WORKLOAD, RECEIVE_WORKLOAD, REQUEST_WORKLOAD_FAILED,
  COMPLETE_WORKLOAD, COMPLETE_WORKLOAD_FAILED,
} from '../actions';

function filterOutErrorsOfTypes(state, types = []) {
  return state.filter((err) => {
    // Filter out any error matching the provided type
    for (let i = 0; i < types.length; i += 1) {
      if (err.type === types[i]) {
        return false;
      }
    }

    return true;
  });
}

export default function errors(state = [], action) {
  switch (action.type) {

  // If any API error occurred, persist that error into the store
  case REQUEST_ATTRIBUTES_FAILED:
  case REQUEST_WORKLOAD_FAILED:
  case COMPLETE_WORKLOAD_FAILED:
    return state.concat({
      ...action.payload,
      type: action.type,
    });

  // If Attributes are being requested anew, or have been received,
  // clear any errors that would prompt to re-fetch attributes
  case REQUEST_ATTRIBUTES:
  case RECEIVE_ATTRIBUTES:
    return filterOutErrorsOfTypes(state, [
      REQUEST_ATTRIBUTES_FAILED,
    ]);

  // If a Workload is being requested anew, or has been received,
  // clear any errors that would prompt to re-fetch a workload
  case REQUEST_WORKLOAD:
  case RECEIVE_WORKLOAD:
  case COMPLETE_WORKLOAD:
    return filterOutErrorsOfTypes(state, [
      REQUEST_WORKLOAD_FAILED,
      COMPLETE_WORKLOAD_FAILED,
    ]);

  default:
    return state;
  }
}
