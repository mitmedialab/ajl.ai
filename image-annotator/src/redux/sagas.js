import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { getAllFaces } from '../services/face-api';
import { REQUEST_FACES, receiveFaces, requestFacesFailed } from './actions';

// worker Saga: will be fired on REQUEST_FACES actions
function* requestFaces() {
  try {
    const faces = yield call(getAllFaces);
    yield put(receiveFaces(faces));
  } catch (e) {
    yield put(requestFacesFailed(e));
  }
}

/**
 * Saga to handle a request to load the face data: activates when
 * a REQUEST_FACES action is dispatched
 *
 * takeLatest does not allow concurrent fetches of user. If 'REQUEST_FACES'
 * gets dispatched while a fetch is already pending, that pending fetch is
 * canceled and only the latest one will be run.
 */
function* requestFacesSaga() {
  yield takeLatest(REQUEST_FACES, requestFaces);
}

// Export a single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    fork(requestFacesSaga),
  ];
}
