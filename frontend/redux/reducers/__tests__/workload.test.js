import workloadReducer from '../workload';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('workload reducer', () => {

  it('is a function', () => {
    expect(workloadReducer).toBeDefined();
    expect(workloadReducer).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = workloadReducer(undefined, {});
    expect(initialState).toEqual({
      id: null,
      todo: [],
      byId: {},
      complete: [],
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = workloadReducer(undefined, {});
    const nextState = workloadReducer(initialState, {});
    expect(nextState).toBe(initialState);
  });

  const { RECEIVE_WORKLOAD } = actions;
  describe(`on ${RECEIVE_WORKLOAD}`, () => {
    const initialState = workloadReducer(undefined, {});
    const payload = [{
      id: 121,
      images: [
        { id: 1594, url: '0001.jpg', width: 250, height: 250 },
        { id: 28, url: '0002.jpg', width: 250, height: 250 },
        { id: 1998, url: '0003.jpg', width: 250, height: 250 },
        { id: 991, url: '0004.jpg', width: 250, height: 250 },
      ],
    }];

    it('populates the workload ID', () => {
      const nextState = workloadReducer(initialState, {
        type: RECEIVE_WORKLOAD,
        payload,
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.id).toBeDefined();
      expect(nextState.id).not.toBe(initialState.id);
      expect(nextState.id).toBe(121);
    });

    it('populates the byId dictionary', () => {
      const nextState = workloadReducer(initialState, {
        type: RECEIVE_WORKLOAD,
        payload,
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.byId).toBeDefined();
      expect(nextState.byId).not.toBe(initialState.byId);
      expect(nextState.byId).toEqual({
        1594: { id: 1594, url: '0001.jpg', width: 250, height: 250 },
        28: { id: 28, url: '0002.jpg', width: 250, height: 250 },
        1998: { id: 1998, url: '0003.jpg', width: 250, height: 250 },
        991: { id: 991, url: '0004.jpg', width: 250, height: 250 },
      });
    });

    it('populates the todo ID array', () => {
      const nextState = workloadReducer(initialState, {
        type: RECEIVE_WORKLOAD,
        payload,
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.todo).toBeDefined();
      expect(nextState.todo).not.toBe(initialState.todo);
      expect(nextState.todo).toEqual([1594, 28, 1998, 991]);
    });

    it('resets the complete ID array', () => {
      const initialComplete = [94, 8, 1997];
      const nextState = workloadReducer({
        complete: initialComplete,
      }, {
        type: RECEIVE_WORKLOAD,
        payload,
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.complete).toBeDefined();
      expect(nextState.complete).not.toBe(initialComplete);
      expect(nextState.complete).toEqual([]);
    });

  });

  const { SAVE_DEMOGRAPHIC_ANNOTATIONS } = actions;
  describe(`on ${SAVE_DEMOGRAPHIC_ANNOTATIONS}`, () => {

    it('moves a workload item from todo to complete', () => {
      const initialState = workloadReducer({
        todo: [4, 5, 6],
        complete: [1, 2, 3],
      }, {});
      const nextState = workloadReducer(initialState, {
        type: SAVE_DEMOGRAPHIC_ANNOTATIONS,
        payload: {
          id: 4,
        },
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.todo).toBeDefined();
      expect(nextState.todo).not.toBe(initialState.todo);
      expect(nextState.todo).toEqual([5, 6]);
      expect(nextState.complete).toBeDefined();
      expect(nextState.complete).not.toBe(initialState.complete);
      expect(nextState.complete).toEqual([1, 2, 3, 4]);
    });

  });

});
