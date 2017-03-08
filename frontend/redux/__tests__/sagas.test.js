import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { getWorkload } from '../../services/face-api';
import rootSaga, { requestWorkload } from '../sagas';
import * as actions from '../actions';

describe('sagas', () => {

  describe('rootSaga', () => {

    it('has a takeLatest for REQUEST_WORKLOAD', () => {
      const generator = rootSaga();
      const next = generator.next();
      const matchingTake = next.value.find(({ FORK } = {}) => (
        FORK.fn === takeLatest && FORK.args[0] === actions.REQUEST_WORKLOAD
      ));
      expect(matchingTake).toBeTruthy();
      expect(matchingTake.FORK.args).toEqual([actions.REQUEST_WORKLOAD, requestWorkload]);
    });

  });

  describe('requestWorkload', () => {

    it('yields an API call to get workload', () => {
      const saga = testSaga(requestWorkload);
      const workload = [{ id: 1 }];
      saga.next()
        // Assert that getAllFaces was called
        .call(getWorkload)
        .next(workload)
        // Assert that the returned workload are sent as a receiveFaces action
        .put(actions.receiveWorkload(workload))
        .next()
        .isDone();
    });

    it('handles errors', () => {
      const saga = testSaga(requestWorkload);
      const error = new Error('Test Error');
      saga.next()
        .call(getWorkload)
        .throw(error)
        .put(actions.requestWorkloadFailed(error))
        .next()
        .isDone();
    });

  });

});
