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

  const { SELECT_FACE } = actions;
  describe(`on ${SELECT_FACE}`, () => {

    it('sets the value of the provided face\'s store index as the selected face', () => {
      const initialState = facesReducer({
        selected: 0,
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      }, {});
      expect(initialState.selected).toBe(0);
      const nextState = facesReducer(initialState, {
        type: SELECT_FACE,
        payload: initialState.list[2],
      });
      expect(nextState.selected).toBe(2);
    });

    it('does not alter the faces list reference', () => {
      const initialState = facesReducer({
        selected: 0,
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      }, {});
      const nextState = facesReducer(initialState, {
        type: SELECT_FACE,
        payload: 2,
      });
      expect(nextState.list).toBe(initialState.list);
    });

    it('sets the provided in-bounds index value as the selected face', () => {
      const initialState = facesReducer({
        selected: 0,
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      }, {});
      const nextState = facesReducer(initialState, {
        type: SELECT_FACE,
        payload: 2,
      });
      expect(nextState.selected).toBe(2);
    });

    it('ignores out-of-bounds indexes', () => {
      const initialState = facesReducer({
        selected: 1,
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      }, {});
      let nextState = facesReducer(initialState, {
        type: SELECT_FACE,
        payload: 200,
      });
      expect(nextState.selected).toBe(1);
      nextState = facesReducer(initialState, {
        type: SELECT_FACE,
        payload: -1,
      });
      expect(nextState.selected).toBe(1);
    });

    it('ignores invalid ojects', () => {
      const initialState = facesReducer({
        selected: 1,
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      }, {});
      const nextState = facesReducer(initialState, {
        type: SELECT_FACE,
        payload: { id: 'd' },
      });
      expect(nextState.selected).toBe(1);
    });

    it('updates the index of the selected face on subsequent calls, passing objects', () => {
      const initialState = facesReducer({
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        selected: 2,
      }, {});
      expect(initialState.selected).toBe(2);
      const nextState = facesReducer(initialState, {
        type: SELECT_FACE,
        payload: initialState.list[1],
      });
      expect(nextState.selected).toBe(1);
    });

    it('updates the index of the selected face on subsequent calls, passing numbers', () => {
      const initialState = facesReducer({
        list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        selected: 2,
      }, {});
      expect(initialState.selected).toBe(2);
      const nextState = facesReducer(initialState, {
        type: SELECT_FACE,
        payload: 1,
      });
      expect(nextState.selected).toBe(1);
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
