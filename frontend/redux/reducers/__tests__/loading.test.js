import loadingReducer from '../loading';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('loading reducer', () => {

  it('is a function', () => {
    expect(loadingReducer).toBeDefined();
    expect(loadingReducer).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = loadingReducer(undefined, {});
    expect(initialState).toEqual({
      faces: false,
      annotations: false,
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = loadingReducer(undefined, {});
    const nextState = loadingReducer(initialState, {});
    expect(nextState).toBe(initialState);
  });

  describe('faces actions', () => {

    const { REQUEST_FACES } = actions;
    describe(`on ${REQUEST_FACES}`, () => {

      it('flags the faces as loading', () => {
        const initialState = loadingReducer({
          faces: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_FACES,
        });
        expect(nextState.faces).toBe(true);
      });

      it('does not change the loading flag if it is already true', () => {
        const initialState = loadingReducer({
          faces: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_FACES,
        });
        expect(nextState.faces).toBe(true);
      });

    });

    const { RECEIVE_FACES } = actions;
    describe(`on ${RECEIVE_FACES}`, () => {

      it('flags the faces as not loading', () => {
        const initialState = loadingReducer({
          faces: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: RECEIVE_FACES,
        });
        expect(nextState.faces).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          faces: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: RECEIVE_FACES,
        });
        expect(nextState.faces).toBe(false);
      });

    });

    const { REQUEST_FACES_FAILED } = actions;
    describe(`on ${REQUEST_FACES_FAILED}`, () => {

      it('flags the faces as not loading', () => {
        const initialState = loadingReducer({
          faces: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_FACES_FAILED,
        });
        expect(nextState.faces).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          faces: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_FACES_FAILED,
        });
        expect(nextState.faces).toBe(false);
      });

    });

  });

  describe('annotations actions', () => {

    const { REQUEST_ANNOTATIONS } = actions;
    describe(`on ${REQUEST_ANNOTATIONS}`, () => {

      it('flags the annotations as loading', () => {
        const initialState = loadingReducer({
          annotations: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_ANNOTATIONS,
        });
        expect(nextState.annotations).toBe(true);
      });

      it('does not change the loading flag if it is already true', () => {
        const initialState = loadingReducer({
          annotations: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_ANNOTATIONS,
        });
        expect(nextState.annotations).toBe(true);
      });

    });

    const { RECEIVE_ANNOTATIONS } = actions;
    describe(`on ${RECEIVE_ANNOTATIONS}`, () => {

      it('flags the annotations as not loading', () => {
        const initialState = loadingReducer({
          annotations: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: RECEIVE_ANNOTATIONS,
        });
        expect(nextState.annotations).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          annotations: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: RECEIVE_ANNOTATIONS,
        });
        expect(nextState.annotations).toBe(false);
      });

    });

    const { REQUEST_ANNOTATIONS_FAILED } = actions;
    describe(`on ${REQUEST_ANNOTATIONS_FAILED}`, () => {

      it('flags the annotations as not loading', () => {
        const initialState = loadingReducer({
          annotations: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_ANNOTATIONS_FAILED,
        });
        expect(nextState.annotations).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          annotations: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_ANNOTATIONS_FAILED,
        });
        expect(nextState.annotations).toBe(false);
      });

    });

  });

});
