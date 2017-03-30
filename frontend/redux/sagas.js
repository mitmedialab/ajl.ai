import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import {
  getAttributes,
  getOverallStats,
  getWorkload,
  postWorkload,
} from '../services/api';
import {
  REQUEST_ATTRIBUTES, receiveAttributes, requestAttributesFailed,
  REQUEST_OVERALL_STATS, receiveOverallStats, requestOverallStatsFailed,
  REQUEST_WORKLOAD, receiveWorkload, requestWorkloadFailed,
  COMPLETE_WORKLOAD, completeWorkloadFailed,
} from './actions';
import { imageAnnotations } from './selectors';

// worker Saga: will be fired on REQUEST_ATTRIBUTES actions
export function* requestAttributes(action) {
  try {
    const anotatableAttributes = yield call(getAttributes);
    yield put(receiveAttributes(anotatableAttributes));
  } catch (e) {
    yield put(requestAttributesFailed(e, action));
  }
}

// worker Saga: will be fired on REQUEST_OVERALL_STATS actions
export function* requestOverallStats(action) {
  try {
    const overallStats = yield call(getOverallStats);
    yield put(receiveOverallStats(overallStats[0]));
  } catch (e) {
    yield put(requestOverallStatsFailed(e, action));
  }
}

// worker Saga: will be fired on REQUEST_WORKLOAD actions
export function* requestWorkload(action) {
  try {
    const workload = yield call(getWorkload);
    yield put(receiveWorkload(workload));
  } catch (e) {
    yield put(requestWorkloadFailed(e, action));
  }
}

export function* completeWorkload(action) {
  try {
    const workloadToSend = yield select(imageAnnotations);
    const workloadPostResponse = yield call(postWorkload, workloadToSend);
    yield put(receiveWorkload(workloadPostResponse));
  } catch (e) {
    yield put(completeWorkloadFailed(e, action));
  }
}

// Export a single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    fork(takeLatest, REQUEST_ATTRIBUTES, requestAttributes),
    fork(takeLatest, REQUEST_OVERALL_STATS, requestOverallStats),
    fork(takeLatest, REQUEST_WORKLOAD, requestWorkload),
    fork(takeLatest, COMPLETE_WORKLOAD, completeWorkload),
  ];
}
