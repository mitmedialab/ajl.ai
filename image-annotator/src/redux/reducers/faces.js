import { RECEIVE_FACES, SELECT_FACE } from '../actions';

const defaultState = {
  list: [],
  selected: null,
};

export default function facesReducer(state = defaultState, action) {
  if (action.type === RECEIVE_FACES) {
    // Do not change the selected face, but initialize it if nothing's selected
    const selected = state.selected ?
      state.selected :
      // Fall back to null in case the payload is empty
      action.payload[0] || null;
    return Object.assign({}, state, {
      list: action.payload,
      selected,
    });
  }

  if (action.type === SELECT_FACE) {
    return Object.assign({}, state, {
      selected: action.payload,
    });
  }

  return state;
}
