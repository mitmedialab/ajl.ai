import rootReducer from '../reducers';

describe('rootReducer', () => {

  it('is a function', () => {
    expect(rootReducer).toBeDefined();
    expect(rootReducer).toBeInstanceOf(Function);
  });

  it('returns a store state object', () => {
    const state = rootReducer(undefined, {});
    expect(state).toBeDefined();
    expect(state).toBeInstanceOf(Object);
  });

  it('does not mutate the store when no action is provided', () => {
    const state = rootReducer(undefined, {});
    Object.freeze(state);
    const nextState = rootReducer(state, {});
    expect(state).toEqual(nextState);
  });

  describe('state shape', () => {

    it('returns a state object with a loading store property', () => {
      const state = rootReducer(undefined, {});
      expect(state.loading).toBeDefined();
    });

    it('returns a state object with an image annotations store property', () => {
      const state = rootReducer(undefined, {});
      expect(state.annotations).toBeDefined();
    });

    it('returns a state object with a demographic attributes store property', () => {
      const state = rootReducer(undefined, {});
      expect(state.demographicAttributes).toBeDefined();
    });

    it('returns a state object with a workload store property', () => {
      const state = rootReducer(undefined, {});
      expect(state.workload).toBeDefined();
    });

    it('returns a state object with an errors store property', () => {
      const state = rootReducer(undefined, {});
      expect(state.errors).toBeDefined();
    });

  });

});
