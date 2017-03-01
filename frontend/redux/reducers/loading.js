import { REQUEST_FACES, RECEIVE_FACES, REQUEST_FACES_FAILED } from '../actions';

const defaultState = {
  faces: false,
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

  return state;
}
