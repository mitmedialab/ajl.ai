import { call/* , put*/ } from 'redux-saga/effects';
import { getAllFaces } from '../../services/face-api';
import { requestFacesSaga } from '../sagas';
import * as actions from '../actions';

const getState = () => ({ faces: [] });

describe('sagas', () => {
  describe('requestFacesSaga', () => {
    it('yields an API call to get faces', () => {
      // WIP: see example from sagas docs at
      // https://github.com/redux-saga/redux-saga/blob/master/examples/shopping-cart/test/sagas.js
      const generator = requestFacesSaga(getState);
      let next = generator.next(actions.requestFaces());
      expect(next, call(getAllFaces));
      next = generator.next();
    });
  });
});
