import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import { getAttributes, getWorkload, postWorkload } from '../services/api';
import {
  REQUEST_ATTRIBUTES, receiveAttributes, requestAttributesFailed,
  REQUEST_WORKLOAD, receiveWorkload, requestWorkloadFailed,
  COMPLETE_WORKLOAD, completeWorkloadFailed,
} from './actions';
import { imageAnnotations } from './selectors';

// worker Saga: will be fired on REQUEST_ATTRIBUTES actions
export function* requestAttributes() {
  try {
    const anotatableAttributes = yield call(getAttributes);
    yield put(receiveAttributes(anotatableAttributes));
  } catch (e) {
    yield put(requestAttributesFailed(e));
  }
}

// worker Saga: will be fired on REQUEST_WORKLOAD actions
export function* requestWorkload() {
  try {
    const workload = yield call(getWorkload);
    yield put(receiveWorkload(workload));
  } catch (e) {
    yield put(requestWorkloadFailed(e));
  }
}

export function* completeWorkload() {
  try {
    const workloadToSend = yield select(imageAnnotations);
    const workloadPostResponse = yield call(postWorkload, workloadToSend);
    yield put(receiveWorkload(workloadPostResponse));
  } catch (e) {
    yield put(completeWorkloadFailed(e));
  }
}

// Export a single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    fork(takeLatest, REQUEST_ATTRIBUTES, requestAttributes),
    fork(takeLatest, REQUEST_WORKLOAD, requestWorkload),
    fork(takeLatest, COMPLETE_WORKLOAD, completeWorkload),
  ];
}
