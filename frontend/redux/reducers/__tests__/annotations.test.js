import annotations from '../annotations';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('annotations reducer', () => {

  it('is a function', () => {
    expect(annotations).toBeDefined();
    expect(annotations).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = annotations(undefined, {});
    expect(initialState).toEqual({
      demographicsOrder: [],
      demographics: {},
      regions: {},
      landmarks: {},
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = annotations(undefined, {});
    const nextState = annotations(initialState, {});
    expect(nextState).toBe(initialState);
  });

  const { RECEIVE_ANNOTATIONS } = actions;
  describe(`on ${RECEIVE_ANNOTATIONS}`, () => {

    it('populates the demographics dictionary', () => {
      const initialState = annotations(undefined, {});
      const nextState = annotations(initialState, {
        type: RECEIVE_ANNOTATIONS,
        payload: {
          demographics: [{
            name: 'a',
            options: [1, 2, 3],
          }, {
            name: 'b',
            options: [4, 5, 7],
          }],
        },
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.demographics).toBeDefined();
      expect(nextState.demographics).not.toBe(initialState.demographics);
      expect(nextState.demographics).toEqual({
        a: {
          name: 'a',
          options: [1, 2, 3],
        },
        b: {
          name: 'b',
          options: [4, 5, 7],
        },
      });
    });

    it('populates the demographics order array', () => {
      const initialState = annotations(undefined, {});
      const nextState = annotations(initialState, {
        type: RECEIVE_ANNOTATIONS,
        payload: {
          demographics: [{
            name: 'a',
            options: [1, 2, 3],
          }, {
            name: 'b',
            options: [4, 5, 7],
          }],
        },
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.demographicsOrder).toBeDefined();
      expect(nextState.demographicsOrder).not.toBe(initialState.demographicsOrder);
      expect(nextState.demographicsOrder).toEqual(['a', 'b']);
    });

  });

});
