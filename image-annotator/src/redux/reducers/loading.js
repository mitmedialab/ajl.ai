import { REQUEST_FACES, RECEIVE_FACES, REQUEST_FACES_FAILED } from '../actions';

const defaultState = {
  faces: false,
};

export default function loadingReducer(state = defaultState, action) {

  if (action.type === REQUEST_FACES) {
    return Object.assign({}, state, {
      faces: true,
    });
  }

  if (action.type === RECEIVE_FACES) {
    return Object.assign({}, state, {
      faces: false,
    });
  }

  if (action.type === REQUEST_FACES_FAILED) {
    return Object.assign({}, state, {
      faces: false,
    });
  }

  return state;
}
