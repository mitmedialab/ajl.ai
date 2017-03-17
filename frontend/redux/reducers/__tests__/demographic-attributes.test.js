import demographicAttributes from '../demographic-attributes';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('perceived demographic attributes form reducer', () => {

  it('is a function', () => {
    expect(demographicAttributes).toBeDefined();
    expect(demographicAttributes).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = demographicAttributes(undefined, {});
    expect(initialState).toEqual({
      order: [],
      byName: {},
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = demographicAttributes(undefined, {});
    const nextState = demographicAttributes(initialState, {});
    expect(nextState).toBe(initialState);
  });

  const { RECEIVE_ATTRIBUTES } = actions;
  describe(`on ${RECEIVE_ATTRIBUTES}`, () => {

    it('populates the demographics dictionary', () => {
      const initialState = demographicAttributes(undefined, {});
      const nextState = demographicAttributes(initialState, {
        type: RECEIVE_ATTRIBUTES,
        payload: [
          { name: 'a', options: [1, 2, 3] },
          { name: 'b', options: [4, 5, 7] },
        ],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.byName).toBeDefined();
      expect(nextState.byName).not.toBe(initialState.byName);
      expect(nextState.byName).toEqual({
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

    it('populates the demographic attributes order array', () => {
      const initialState = demographicAttributes(undefined, {});
      const nextState = demographicAttributes(initialState, {
        type: RECEIVE_ATTRIBUTES,
        payload: [
          { name: 'a', options: [1, 2, 3] },
          { name: 'b', options: [4, 5, 7] },
        ],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.order).toBeDefined();
      expect(nextState.order).not.toBe(initialState.order);
      expect(nextState.order).toEqual(['a', 'b']);
    });

  });

});
