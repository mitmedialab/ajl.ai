import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllFaces } from '../../services/face-api';
import rootSaga, { requestFaces } from '../sagas';
import * as actions from '../actions';

describe('sagas', () => {
  describe('rootSaga', () => {
    it('has a takeLatest for REQUEST_FACES', () => {
      const generator = rootSaga();

      let next = generator.next();
      const matchingTake = next.value.find(({ CALL: { args, fn } = {} }) =>
        fn === takeLatest && args[0] === actions.REQUEST_FACES)
      expect(matchingTake).toBeTruthy()

      expect(matchingTake.CALL.args[1]).toEqual(requestFaces);
    })
  })

  describe('requestFaces', () => {
    it('yields an API call to get faces', () => {
      // WIP: see example from sagas docs at
      // https://github.com/redux-saga/redux-saga/blob/master/examples/shopping-cart/test/sagas.js
      const generator = requestFaces();

      let next = generator.next();
      expect(next.value).toEqual(call(getAllFaces));

      const faces = [{ face: true }]
      next = generator.next(faces);

      expect(next.value).toEqual(put(actions.receiveFaces(faces)))

      next = generator.next();
      expect(next.done).toBeTruthy();
    });

    it('handles errors', () => {
      // WIP: see example from sagas docs at
      // https://github.com/redux-saga/redux-saga/blob/master/examples/shopping-cart/test/sagas.js
      const generator = requestFaces();

      let next = generator.next();
      expect(next.value).toEqual(call(getAllFaces));

      const error = new Error('Test Error')
      next = generator.throw(error);

      expect(next.value).toEqual(put(actions.requestFacesFailed(error)))

      next = generator.next();
      expect(next.done).toBeTruthy();
    });
  });
});
