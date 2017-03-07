import {
  REQUEST_FACES, RECEIVE_FACES, REQUEST_FACES_FAILED,
  REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS, REQUEST_ANNOTATIONS_FAILED,
} from '../actions';

const defaultState = {
  faces: false,
  annotations: false,
};

export default function loadingReducer(state = defaultState, action) {

  if (action.type === REQUEST_FACES) {
    return {
      ...state,
      faces: true,
    };
  }

  if (action.type === RECEIVE_FACES) {
    return {
      ...state,
      faces: false,
    };
  }

  if (action.type === REQUEST_FACES_FAILED) {
    return {
      ...state,
      faces: false,
    };
  }

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
