import uiReducer from '../ui';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('ui reducer', () => {

  it('is a function', () => {
    expect(uiReducer).toBeDefined();
    expect(uiReducer).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = uiReducer(undefined, {});
    expect(initialState).toEqual({
      feedbackModal: false,
    });
  });

  it('does not mutate state when receiving an irrelevant action', () => {
    const initialState = uiReducer(undefined, {});
    const nextState = uiReducer(initialState, {});
    expect(nextState).toBe(initialState);
  });

  const { SHOW_FEEDBACK_MODAL } = actions;
  describe(`on ${SHOW_FEEDBACK_MODAL}`, () => {

    it('sets a state flag to display a feedback modal', () => {
      const initialState = uiReducer(undefined, {});
      const nextState = uiReducer(initialState, {
        type: SHOW_FEEDBACK_MODAL,
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.feedbackModal).toBeDefined();
      expect(nextState.feedbackModal).not.toBe(initialState.feedbackModal);
      expect(nextState.feedbackModal).toBe(true);
    });

  });

  const { HIDE_FEEDBACK_MODAL } = actions;
  describe(`on ${HIDE_FEEDBACK_MODAL}`, () => {

    it('sets a state flag to hide a feedback modal', () => {
      const initialState = uiReducer({
        feedbackModal: true,
      }, {});
      const nextState = uiReducer(initialState, {
        type: HIDE_FEEDBACK_MODAL,
      });
      expect(nextState).not.toBe(initialState);
      expect(nextState.feedbackModal).toBeDefined();
      expect(nextState.feedbackModal).not.toBe(initialState.feedbackModal);
      expect(nextState.feedbackModal).toBe(false);
    });

  });

});
