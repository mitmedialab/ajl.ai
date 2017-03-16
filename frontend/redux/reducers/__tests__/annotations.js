import annotations from '../annotations';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('image annotations reducer', () => {

  it('is a function', () => {
    expect(annotations).toBeDefined();
    expect(annotations).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = annotations(undefined, {});
    expect(initialState).toEqual({
      workloadId: null,
      images: [],
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = annotations(undefined, {});
    const nextState = annotations(initialState, {});
    expect(nextState).toBe(initialState);
  });

  const { RECEIVE_WORKLOAD } = actions;
  describe(`on ${RECEIVE_WORKLOAD}`, () => {

    it('sets the initial workloadId', () => {
      const initialState = annotations(undefined, {});
      const nextState = annotations(initialState, {
        type: RECEIVE_WORKLOAD,
        payload: [{
          id: 121,
          images: [],
        }],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.workloadId).toBeDefined();
      expect(nextState.workloadId).not.toBe(initialState.workloadId);
      expect(nextState.workloadId).toEqual(121);
    });

    it('updates the workloadId', () => {
      const initialState = annotations({
        workloadId: 121,
      }, {});
      const nextState = annotations(initialState, {
        type: RECEIVE_WORKLOAD,
        payload: [{
          id: 122,
          images: [],
        }],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.workloadId).toBeDefined();
      expect(nextState.workloadId).not.toBe(initialState.workloadId);
      expect(nextState.workloadId).toEqual(122);
    });

    it('clears the image annotations array', () => {
      const initialState = annotations({
        images: [
          { id: 1234, annotations: [{ name: 'a', value: '1' }] },
          { id: 5678, annotations: [{ name: 'b', value: '2' }] },
        ],
      }, {});
      const nextState = annotations(initialState, {
        type: RECEIVE_WORKLOAD,
        payload: [{
          id: 122,
          images: [],
        }],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.images).toBeDefined();
      expect(nextState.images).not.toBe(initialState.images);
      expect(nextState.images).toEqual([]);
    });

  });

  const { SAVE_DEMOGRAPHIC_ANNOTATIONS } = actions;
  describe(`on ${SAVE_DEMOGRAPHIC_ANNOTATIONS}`, () => {

    it('adds submitted annotations to the image annotations list', () => {
      const initialState = annotations({
        workloadId: 121,
      }, {});
      const nextState = annotations(initialState, {
        type: SAVE_DEMOGRAPHIC_ANNOTATIONS,
        payload: {
          id: 1234,
          annotations: [{
            name: 'a',
            value: '1',
          }],
        },
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.images).toBeDefined();
      expect(nextState.images).not.toBe(initialState.images);
      expect(nextState.images).toEqual([
        { id: 1234, annotations: [{ name: 'a', value: '1' }] },
      ]);
    });

    it('appends subsequent annotations to the image annotations list', () => {
      const initialState = annotations({
        workloadId: 121,
        images: [
          { id: 1234, annotations: [{ name: 'a', value: '1' }] },
        ],
      }, {});
      const nextState = annotations(initialState, {
        type: SAVE_DEMOGRAPHIC_ANNOTATIONS,
        payload: {
          id: 5678,
          annotations: [{
            name: 'b',
            value: '2',
          }],
        },
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.images).toBeDefined();
      expect(nextState.images).not.toBe(initialState.images);
      expect(nextState.images).toEqual([
        { id: 1234, annotations: [{ name: 'a', value: '1' }] },
        { id: 5678, annotations: [{ name: 'b', value: '2' }] },
      ]);
    });

  });

});
