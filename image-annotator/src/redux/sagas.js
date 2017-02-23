import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { getAllFaces } from '../services/face-api';
import { REQUEST_FACES, receiveFaces, requestFacesFailed } from './actions';

// worker Saga: will be fired on REQUEST_FACES actions
export function* requestFaces() {
  try {
    const faces = yield call(getAllFaces);
    yield put(receiveFaces(faces));
  } catch (e) {
    yield put(requestFacesFailed(e));
  }
}

// Export a single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    call(takeLatest, REQUEST_FACES, requestFaces),
  ];
}
