import { RECEIVE_ANNOTATIONS } from '../actions';

const defaultState = {
  demographicsOrder: [],
  demographics: {},
  regions: {},
  landmarks: {},
};

export default function annotationsReducer(state = defaultState, action) {
  if (action.type === RECEIVE_ANNOTATIONS) {
    // We want to end up with
    // {
    //   demographicsOrder: ['a', 'b', 'c'],
    //   demographics: {
    //     a: { name: 'a', options: [] },
    //     b: { name: 'b', options: [] },
    //     c: { name: 'c', options: [] },
    //   },
    // }
    return action.payload.demographics.reduce((newState, item) => ({
      demographicsOrder: newState.demographicsOrder.concat(item.name),
      demographics: {
        ...newState.demographics,
        [item.name]: item,
      },
    }), {
      ...state,
    });
  }

  return state;
}
