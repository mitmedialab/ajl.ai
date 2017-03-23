/**
 * This reducer is responsible for maintaining a running list of errors
 * reported by the application, usually received from API responses.
 */
import {
  REQUEST_ATTRIBUTES, RECEIVE_ATTRIBUTES, REQUEST_ATTRIBUTES_FAILED,
  REQUEST_WORKLOAD, RECEIVE_WORKLOAD, REQUEST_WORKLOAD_FAILED,
  COMPLETE_WORKLOAD, COMPLETE_WORKLOAD_FAILED,
} from '../actions';

function filterOutErrorsOfRetryTypes(state, types = []) {
  return state.filter((err) => {
    if (! err.retryAction) {
      // Do not filter out errors without a retryAction
      return true;
    }

    // Filter out any error matching the provided retryAction
    for (let i = 0; i < types.length; i += 1) {
      if (err.retryAction.type === types[i]) {
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
    return state.concat(action.payload);

  // If Attributes are being requested anew, or have been received,
  // clear any errors that would prompt to re-fetch attributes
  case REQUEST_ATTRIBUTES:
  case RECEIVE_ATTRIBUTES:
    return filterOutErrorsOfRetryTypes(state, [
      REQUEST_ATTRIBUTES,
    ]);

  // If a Workload is being requested anew, or has been received,
  // clear any errors that would prompt to re-fetch a workload
  case REQUEST_WORKLOAD:
  case RECEIVE_WORKLOAD:
    return filterOutErrorsOfRetryTypes(state, [
      COMPLETE_WORKLOAD,
      REQUEST_WORKLOAD,
    ]);

  default:
    return state;
  }
}
