import {
  REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS, REQUEST_ANNOTATIONS_FAILED,
} from '../actions';

const defaultState = {
  faces: false,
  annotations: false,
};

export default function loadingReducer(state = defaultState, action) {

  if (action.type === REQUEST_ANNOTATIONS) {
    return {
      ...state,
      annotations: true,
    };
  }

  if (action.type === RECEIVE_ANNOTATIONS) {
    return {
      ...state,
      annotations: false,
    };
  }

  if (action.type === REQUEST_ANNOTATIONS_FAILED) {
    return {
      ...state,
      annotations: false,
    };
  }

  return state;
}
