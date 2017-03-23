import errors from '../errors';

// Import action labels & action creators for use in specs
import * as actions from '../../actions';

describe('errors reducer', () => {

  it('is a function', () => {
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Function);
  });

  it('initializes a default state object', () => {
    const initialState = errors(undefined, {});
    expect(initialState).toEqual([]);
  });

});
