import { RECEIVE_FACES, NEXT_FACE, PREVIOUS_FACE } from '../actions';

const defaultState = {
  list: [],
  selected: null,
};

export default function facesReducer(state = defaultState, action) {
  if (action.type === RECEIVE_FACES) {
    return {
      ...state,
      list: action.payload,
      // Auto-select the first face
      selected: 0,
    };
  }

  if (action.type === NEXT_FACE) {
    return {
      ...state,
      selected: (state.selected + 1 < state.list.length) ?
        state.selected + 1 :
        0,
    };
  }

  if (action.type === PREVIOUS_FACE) {
    return {
      ...state,
      selected: (state.selected > 0) ?
        state.selected - 1 :
        state.list.length - 1,
    };
  }

  return state;
}
