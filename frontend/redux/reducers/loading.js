import {
  REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS, REQUEST_ANNOTATIONS_FAILED,
  REQUEST_WORKLOAD, RECEIVE_WORKLOAD, REQUEST_WORKLOAD_FAILED,
  COMPLETE_WORKLOAD, COMPLETE_WORKLOAD_FAILED,
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

  if ([
    RECEIVE_ANNOTATIONS,
    REQUEST_ANNOTATIONS_FAILED,
  ].includes(action.type)) {
    return {
      ...state,
      annotations: false,
    };
  }

  if ([
    REQUEST_WORKLOAD,
    COMPLETE_WORKLOAD,
  ].includes(action.type)) {
    return {
      ...state,
      workload: true,
    };
  }

  if ([
    RECEIVE_WORKLOAD,
    REQUEST_WORKLOAD_FAILED,
    COMPLETE_WORKLOAD_FAILED,
  ].includes(action.type)) {
    return {
      ...state,
      workload: false,
    };
  }

  return state;
}
