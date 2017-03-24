import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { getAttributes, getWorkload, postWorkload } from '../../services/api';
import rootSaga, {
  requestWorkload,
  requestAttributes,
  completeWorkload,
} from '../sagas';
import * as actions from '../actions';
import { imageAnnotations } from '../selectors';

describe('sagas', () => {

  describe('rootSaga', () => {

    it('has a takeLatest for REQUEST_ATTRIBUTES', () => {
      const generator = rootSaga();
      const next = generator.next();
      const matchingTake = next.value.find(({ FORK } = {}) => (
        FORK.fn === takeLatest && FORK.args[0] === actions.REQUEST_ATTRIBUTES
      ));
      expect(matchingTake).toBeTruthy();
      expect(matchingTake.FORK.args).toEqual([actions.REQUEST_ATTRIBUTES, requestAttributes]);
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

  describe('requestAttributes', () => {

    it('yields an API call to get attributes', () => {
      const saga = testSaga(requestAttributes);
      const attributes = [{ id: 1, name: 'Perceived Age', options: [] }];
      saga.next()
        // Assert that the attributes API was called
        .call(getAttributes)
        .next(attributes)
        // Assert that the returned attributes are dispatched
        .put(actions.receiveAttributes(attributes))
        .next()
        .isDone();
    });

    it('handles errors', () => {
      const action = {};
      const saga = testSaga(requestAttributes, action);
      const error = new Error('Test Error');
      saga.next()
        .call(getAttributes)
        .throw(error)
        .put(actions.requestAttributesFailed(error, action))
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
      const action = {};
      const saga = testSaga(requestWorkload, action);
      const error = new Error('Test Error');
      saga.next()
        .call(getWorkload)
        .throw(error)
        .put(actions.requestWorkloadFailed(error, action))
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
        .select(imageAnnotations)
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
      const action = {};
      const saga = testSaga(completeWorkload, action);
      const error = new Error('Test Error');
      saga.next()
        .select(imageAnnotations)
        .next({})
        .call(postWorkload, {})
        .throw(error)
        .put(actions.completeWorkloadFailed(error, action))
        .next()
        .isDone();
    });

  });

});
