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
      workload: false,
      attributes: false,
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = loadingReducer(undefined, {});
    const nextState = loadingReducer(initialState, {});
    expect(nextState).toBe(initialState);
  });

  describe('attributes actions', () => {

    const { REQUEST_ATTRIBUTES } = actions;
    describe(`on ${REQUEST_ATTRIBUTES}`, () => {

      it('flags the attributes as loading', () => {
        const initialState = loadingReducer({
          attributes: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_ATTRIBUTES,
        });
        expect(nextState.attributes).toBe(true);
      });

      it('does not change the loading flag if it is already true', () => {
        const initialState = loadingReducer({
          attributes: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_ATTRIBUTES,
        });
        expect(nextState.attributes).toBe(true);
      });

    });

    const { RECEIVE_ATTRIBUTES } = actions;
    describe(`on ${RECEIVE_ATTRIBUTES}`, () => {

      it('flags the attributes as not loading', () => {
        const initialState = loadingReducer({
          attributes: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: RECEIVE_ATTRIBUTES,
        });
        expect(nextState.attributes).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          attributes: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: RECEIVE_ATTRIBUTES,
        });
        expect(nextState.attributes).toBe(false);
      });

    });

    const { REQUEST_ATTRIBUTES_FAILED } = actions;
    describe(`on ${REQUEST_ATTRIBUTES_FAILED}`, () => {

      it('flags the attributes as not loading', () => {
        const initialState = loadingReducer({
          attributes: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_ATTRIBUTES_FAILED,
        });
        expect(nextState.attributes).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          attributes: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_ATTRIBUTES_FAILED,
        });
        expect(nextState.attributes).toBe(false);
      });

    });

  });

  describe('workload actions', () => {

    const { REQUEST_WORKLOAD } = actions;
    describe(`on ${REQUEST_WORKLOAD}`, () => {

      it('flags the workload as loading', () => {
        const initialState = loadingReducer({
          workload: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_WORKLOAD,
        });
        expect(nextState.workload).toBe(true);
      });

      it('does not change the loading flag if it is already true', () => {
        const initialState = loadingReducer({
          workload: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_WORKLOAD,
        });
        expect(nextState.workload).toBe(true);
      });

    });

    const { COMPLETE_WORKLOAD } = actions;
    describe(`on ${COMPLETE_WORKLOAD}`, () => {

      it('flags the workload as loading', () => {
        const initialState = loadingReducer({
          workload: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: COMPLETE_WORKLOAD,
        });
        expect(nextState.workload).toBe(true);
      });

      it('does not change the loading flag if it is already true', () => {
        const initialState = loadingReducer({
          workload: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: COMPLETE_WORKLOAD,
        });
        expect(nextState.workload).toBe(true);
      });

    });

    const { RECEIVE_WORKLOAD } = actions;
    describe(`on ${RECEIVE_WORKLOAD}`, () => {

      it('flags the workload as not loading', () => {
        const initialState = loadingReducer({
          workload: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: RECEIVE_WORKLOAD,
        });
        expect(nextState.workload).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          workload: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: RECEIVE_WORKLOAD,
        });
        expect(nextState.workload).toBe(false);
      });

    });

    const { REQUEST_WORKLOAD_FAILED } = actions;
    describe(`on ${REQUEST_WORKLOAD_FAILED}`, () => {

      it('flags the workload as not loading', () => {
        const initialState = loadingReducer({
          workload: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_WORKLOAD_FAILED,
        });
        expect(nextState.workload).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          workload: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: REQUEST_WORKLOAD_FAILED,
        });
        expect(nextState.workload).toBe(false);
      });

    });

    const { COMPLETE_WORKLOAD_FAILED } = actions;
    describe(`on ${COMPLETE_WORKLOAD_FAILED}`, () => {

      it('flags the workload as not loading', () => {
        const initialState = loadingReducer({
          workload: true,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: COMPLETE_WORKLOAD_FAILED,
        });
        expect(nextState.workload).toBe(false);
      });

      it('does not change the loading flag if it is already false', () => {
        const initialState = loadingReducer({
          workload: false,
        }, {});
        const nextState = loadingReducer(initialState, {
          type: COMPLETE_WORKLOAD_FAILED,
        });
        expect(nextState.workload).toBe(false);
      });

    });

  });

});
