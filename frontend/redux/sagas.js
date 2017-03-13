import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import { getAnnotations, getWorkload, postWorkload } from '../services/face-api';
import {
  REQUEST_ANNOTATIONS, receiveAnnotations, requestAnnotationsFailed,
  REQUEST_WORKLOAD, receiveWorkload, requestWorkloadFailed,
  COMPLETE_WORKLOAD, completeWorkloadFailed,
} from './actions';
import { selectWorkload } from './selectors';

// worker Saga: will be fired on REQUEST_ANNOTATIONS actions
export function* requestAnnotations() {
  try {
    const annotations = yield call(getAnnotations);
    yield put(receiveAnnotations(annotations));
  } catch (e) {
    yield put(requestAnnotationsFailed(e));
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
    const workloadToSend = yield select(selectWorkload);
    const workloadPostResponse = yield call(postWorkload, workloadToSend);
    yield put(receiveWorkload(workloadPostResponse));
  } catch (e) {
    yield put(completeWorkloadFailed(e));
  }
}

// Export a single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    fork(takeLatest, REQUEST_ANNOTATIONS, requestAnnotations),
    fork(takeLatest, REQUEST_WORKLOAD, requestWorkload),
    fork(takeLatest, COMPLETE_WORKLOAD, completeWorkload),
  ];
}
