import { RECEIVE_FACES, SELECT_FACE, NEXT_FACE, PREVIOUS_FACE } from '../actions';

const defaultState = {
  list: [],
  selected: null,
};

export default function facesReducer(state = defaultState, action) {
  if (action.type === RECEIVE_FACES) {
    return Object.assign({}, state, {
      list: action.payload,
      // Auto-select the first face
      selected: 0,
    });
  }

  // TODO: This is a bit YAGNI; being able to select face by index OR by object
  // reference is a bit of premature flexibility
  if (action.type === SELECT_FACE) {
    // If a numeric index was provided, and that index is within the bounds of
    // the faces list array, store that index directly
    if (
      typeof action.payload === 'number' &&
      action.payload >= 0 &&
      action.payload < state.list.length
    ) {
      return Object.assign({}, state, {
        selected: action.payload,
      });
    }
    // Otherwise, figure out which face was passed in and set that
    const idx = state.list.indexOf(action.payload);
    return Object.assign({}, state, {
      // If the object was not found, make no change
      selected: idx > -1 ? idx : state.selected,
    });
  }

  if (action.type === NEXT_FACE) {
    return Object.assign({}, state, {
      selected: (state.selected + 1 < state.list.length) ?
        state.selected + 1 :
        0,
    });
  }

  if (action.type === PREVIOUS_FACE) {
    return Object.assign({}, state, {
      selected: (state.selected > 0) ?
        state.selected - 1 :
        state.list.length - 1,
    });
  }

  return state;
}
