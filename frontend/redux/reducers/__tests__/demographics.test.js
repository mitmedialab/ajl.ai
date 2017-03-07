import demographics from '../demographics';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('perceived demographics form reducer', () => {

  it('is a function', () => {
    expect(demographics).toBeDefined();
    expect(demographics).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = demographics(undefined, {});
    expect(initialState).toEqual({
      order: [],
      questions: {},
      current: 0,
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = demographics(undefined, {});
    const nextState = demographics(initialState, {});
    expect(nextState).toBe(initialState);
  });

  const { RECEIVE_ANNOTATIONS } = actions;
  describe(`on ${RECEIVE_ANNOTATIONS}`, () => {

    it('populates the demographics dictionary', () => {
      const initialState = demographics(undefined, {});
      const nextState = demographics(initialState, {
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
      expect(nextState.questions).toBeDefined();
      expect(nextState.questions).not.toBe(initialState.questions);
      expect(nextState.questions).toEqual({
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

    it('populates the question order array', () => {
      const initialState = demographics(undefined, {});
      const nextState = demographics(initialState, {
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
      expect(nextState.order).toBeDefined();
      expect(nextState.order).not.toBe(initialState.order);
      expect(nextState.order).toEqual(['a', 'b']);
    });

    it('resets the current question index', () => {
      const initialState = demographics({
        current: 3,
      }, {});
      const nextState = demographics(initialState, {
        type: RECEIVE_ANNOTATIONS,
        payload: {
          demographics: [],
        },
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.current).toBeDefined();
      expect(nextState.current).toBe(0);
    });

  });

  const { NEXT_FACE } = actions;
  describe(`on ${NEXT_FACE}`, () => {

    it('resets the current question index', () => {
      const initialState = demographics({
        current: 3,
      }, {});
      const nextState = demographics(initialState, {
        type: NEXT_FACE,
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.current).toBeDefined();
      expect(nextState.current).toBe(0);
    });

  });

});
