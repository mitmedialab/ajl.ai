import { RECEIVE_ANNOTATIONS } from '../actions';

const defaultState = {
  demographics: {},
  regions: {},
  landmarks: {},
};

const arrToDictionary = (arr, keyProp) => arr.reduce((dict, item) => ({
  ...dict,
  [item[keyProp]]: item,
}), {});

export default function annotationsReducer(state = defaultState, action) {
  if (action.type === RECEIVE_ANNOTATIONS) {
    return {
      ...state,
      demographics: arrToDictionary(action.payload.demographics, 'name'),
    };
  }

  return state;
}
