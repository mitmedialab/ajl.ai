import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { getAllFaces } from '../../services/face-api';
import rootSaga, { requestFaces } from '../sagas';
import * as actions from '../actions';

describe('sagas', () => {

  describe('rootSaga', () => {

    it('has a takeLatest for REQUEST_FACES', () => {
      const generator = rootSaga();
      const next = generator.next();
      const matchingTake = next.value.find(({ FORK } = {}) => (
        FORK.fn === takeLatest && FORK.args[0] === actions.REQUEST_FACES
      ));
      expect(matchingTake).toBeTruthy();
      expect(matchingTake.FORK.args).toEqual([actions.REQUEST_FACES, requestFaces]);
    });

  });

  describe('requestFaces', () => {

    it('yields an API call to get faces', () => {
      const saga = testSaga(requestFaces);
      const faces = [{ face: true }];
      saga.next()
        // Assert that getAllFaces was called
        .call(getAllFaces)
        .next(faces)
        // Assert that the returned faces are sent as a receiveFaces action
        .put(actions.receiveFaces(faces))
        .next()
        .isDone();
    });

    it('handles errors', () => {
      const saga = testSaga(requestFaces);
      const error = new Error('Test Error');
      saga.next()
        .call(getAllFaces)
        .throw(error)
        .put(actions.requestFacesFailed(error))
        .next()
        .isDone();
    });

  });

});
