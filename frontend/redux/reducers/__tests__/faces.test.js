import facesReducer from '../faces';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('faces reducer', () => {

  it('is a function', () => {
    expect(facesReducer).toBeDefined();
    expect(facesReducer).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = facesReducer(undefined, {});
    expect(initialState).toEqual({
      list: [],
      selected: null,
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = facesReducer(undefined, {});
    const nextState = facesReducer(initialState, {});
    expect(nextState).toBe(initialState);
  });

  const { RECEIVE_FACES } = actions;
  describe(`on ${RECEIVE_FACES}`, () => {

    it('sets the action\'s array payload as the faces property', () => {
      const initialState = facesReducer(undefined, {});
      const nextState = facesReducer(initialState, {
        type: RECEIVE_FACES,
        payload: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.list).toBeDefined();
      expect(nextState.list).not.toBe(initialState.list);
      expect(nextState.list).toEqual([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);
    });

    it('auto-selects the first face in the set', () => {
      const initialState = facesReducer(undefined, {});
      expect(initialState.selected).toBeNull();
      const nextState = facesReducer(initialState, {
        type: RECEIVE_FACES,
        payload: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      });
      expect(nextState.selected).toBe(0);
    });

    it('replaces the faces list on subsequent calls', () => {
      const initialState = facesReducer({
        selected: 0,
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      }, {});
      const action = {
        type: RECEIVE_FACES,
        payload: [{ id: 'd' }, { id: 'e' }, { id: 'f' }],
      };
      const nextState = facesReducer(initialState, action);
      expect(nextState).not.toBe(initialState);
      expect(nextState.list).toBeDefined();
      expect(nextState.list).not.toBe(initialState.list);
      expect(nextState.list).toEqual(action.payload);
    });

  });

  const { NEXT_FACE } = actions;
  describe(`on ${NEXT_FACE}`, () => {

    it('selects the next face index', () => {
      const initialState = facesReducer({
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        selected: 0,
      }, {});
      const nextState = facesReducer(initialState, {
        type: NEXT_FACE,
      });
      expect(nextState.selected).toBe(1);
    });

    it('wraps around when reaching the end of the array', () => {
      const initialState = facesReducer({
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        selected: 2,
      }, {});
      const nextState = facesReducer(initialState, {
        type: NEXT_FACE,
      });
      expect(nextState.selected).toBe(0);
    });

  });

  const { PREVIOUS_FACE } = actions;
  describe(`on ${PREVIOUS_FACE}`, () => {

    it('selects the next face index', () => {
      const initialState = facesReducer({
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        selected: 1,
      }, {});
      const nextState = facesReducer(initialState, {
        type: PREVIOUS_FACE,
      });
      expect(nextState.selected).toBe(0);
    });

    it('wraps around when reaching the beginning of the array', () => {
      const initialState = facesReducer({
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        selected: 0,
      }, {});
      const nextState = facesReducer(initialState, {
        type: PREVIOUS_FACE,
      });
      expect(nextState.selected).toBe(2);
    });

  });

});
