import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { getAnnotations, getWorkload, postWorkload } from '../../services/face-api';
import rootSaga, {
  requestWorkload,
  requestAnnotations,
  completeWorkload,
} from '../sagas';
import * as actions from '../actions';
import { selectWorkload } from '../selectors';

describe('sagas', () => {

  describe('rootSaga', () => {

    it('has a takeLatest for REQUEST_ANNOTATIONS', () => {
      const generator = rootSaga();
      const next = generator.next();
      const matchingTake = next.value.find(({ FORK } = {}) => (
        FORK.fn === takeLatest && FORK.args[0] === actions.REQUEST_ANNOTATIONS
      ));
      expect(matchingTake).toBeTruthy();
      expect(matchingTake.FORK.args).toEqual([actions.REQUEST_ANNOTATIONS, requestAnnotations]);
    });

    it('has a takeLatest for REQUEST_WORKLOAD', () => {
      const generator = rootSaga();
      const next = generator.next();
      const matchingTake = next.value.find(({ FORK } = {}) => (
        FORK.fn === takeLatest && FORK.args[0] === actions.REQUEST_WORKLOAD
      ));
      expect(matchingTake).toBeTruthy();
      expect(matchingTake.FORK.args).toEqual([actions.REQUEST_WORKLOAD, requestWorkload]);
    });

    it('has a takeLatest for COMPLETE_WORKLOAD', () => {
      const generator = rootSaga();
      const next = generator.next();
      const matchingTake = next.value.find(({ FORK } = {}) => (
        FORK.fn === takeLatest && FORK.args[0] === actions.COMPLETE_WORKLOAD
      ));
      expect(matchingTake).toBeTruthy();
      expect(matchingTake.FORK.args).toEqual([actions.COMPLETE_WORKLOAD, completeWorkload]);
    });

  });

  describe('requestAnnotations', () => {

    it('yields an API call to get annotations', () => {
      const saga = testSaga(requestAnnotations);
      const annotations = [{ id:1, name: 'Perceived Age', options: [] }];
      saga.next()
        // Assert that the annotations API was called
        .call(getAnnotations)
        .next(annotations)
        // Assert that the returned annotations are dispatched
        .put(actions.receiveAnnotations(annotations))
        .next()
        .isDone();
    });

    it('handles errors', () => {
      const saga = testSaga(requestAnnotations);
      const error = new Error('Test Error');
      saga.next()
        .call(getAnnotations)
        .throw(error)
        .put(actions.requestAnnotationsFailed(error))
        .next()
        .isDone();
    });

  });

  describe('requestWorkload', () => {

    it('yields an API call to get workload', () => {
      const saga = testSaga(requestWorkload);
      const workload = [{ id: 1 }];
      saga.next()
        // Assert that the workload API method was called
        .call(getWorkload)
        .next(workload)
        // Assert that the returned workload is dispatched
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

  describe('completeWorkload', () => {

    it('yields an API call to get workload', () => {
      const saga = testSaga(completeWorkload);
      const workload = [{ id: 1 }];
      saga.next()
        // Assert that the workload API object is selected
        .select(selectWorkload)
        .next(workload)
        // Assert that the workload is posted to the server
        .call(postWorkload, workload)
        .next(workload)
        // Assert that the next workload is returned & dispatched
        .put(actions.receiveWorkload(workload))
        .next()
        .isDone();
    });

    it('handles errors', () => {
      const saga = testSaga(completeWorkload);
      const error = new Error('Test Error');
      saga.next()
        .select(selectWorkload)
        .next({})
        .call(postWorkload, {})
        .throw(error)
        .put(actions.completeWorkloadFailed(error))
        .next()
        .isDone();
    });

  });

});
