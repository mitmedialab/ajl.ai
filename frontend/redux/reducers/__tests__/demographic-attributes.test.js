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
      flagAttribute: '',
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
          { name: 'a', options: [1, 2, 3], flag: false },
          { name: 'b', options: [4, 5, 7], flag: true },
        ],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.byName).toBeDefined();
      expect(nextState.byName).not.toBe(initialState.byName);
      expect(nextState.byName).toEqual({
        a: {
          name: 'a',
          options: [1, 2, 3],
          flag: false,
        },
        b: {
          name: 'b',
          options: [4, 5, 7],
          flag: true,
        },
      });
    });

    it('stores the ID of any received flag attribute', () => {
      const initialState = demographicAttributes(undefined, {});
      const nextState = demographicAttributes(initialState, {
        type: RECEIVE_ATTRIBUTES,
        payload: [
          { name: 'a', options: [1, 2, 3], flag: false },
          { name: 'b', options: [3, 2, 1], flag: true },
          { name: 'c', options: [4, 5, 7], flag: false },
        ],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.flagAttribute).toBeDefined();
      expect(nextState.flagAttribute).not.toBe(initialState.flagAttribute);
      expect(nextState.flagAttribute).toEqual('b');
    });

    it('does not set the flag attribute name if no flag attribute is present', () => {
      const initialState = demographicAttributes(undefined, {});
      const nextState = demographicAttributes(initialState, {
        type: RECEIVE_ATTRIBUTES,
        payload: [
          { name: 'a', options: [1, 2, 3], flag: false },
          { name: 'c', options: [4, 5, 7], flag: false },
        ],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.flagAttribute).toBeDefined();
      expect(nextState.flagAttribute).toBe(initialState.flagAttribute);
      expect(nextState.flagAttribute).toBe('');
    });

    it('populates the demographic attributes order array, omitting flag attributes', () => {
      const initialState = demographicAttributes(undefined, {});
      const nextState = demographicAttributes(initialState, {
        type: RECEIVE_ATTRIBUTES,
        payload: [
          { name: 'a', options: [1, 2, 3], flag: false },
          { name: 'b', options: [3, 2, 1], flag: true },
          { name: 'c', options: [4, 5, 7], flag: false },
        ],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.order).toBeDefined();
      expect(nextState.order).not.toBe(initialState.order);
      expect(nextState.order).toEqual(['a', 'c']);
    });

  });

});
