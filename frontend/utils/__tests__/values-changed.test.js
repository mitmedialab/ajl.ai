import valuesChanged from '../values-changed';

describe('valuesChanged utility', () => {

  it('is a function', () => {
    expect(valuesChanged).toBeDefined();
    expect(valuesChanged).toBeInstanceOf(Function);
  });

  it('returns true if a provided string property name changed', () => {
    expect(valuesChanged({ val: true }, { val: false }, 'val')).toBe(true);
  });

  it('returns false if a provided string property name did not change', () => {
    expect(valuesChanged({ val: true }, { val: true }, 'val')).toBe(false);
  });

  it('returns true if any of the properties in the provided array changed', () => {
    expect(valuesChanged(
      { val1: true, val2: 0 },
      { val1: true, val2: 1 },
      ['val1', 'val2']
    )).toBe(true);
  });

  it('returns false if none of the properties in the provided array changed', () => {
    expect(valuesChanged(
      { val1: true, val2: 1 },
      { val1: true, val2: 1 },
      ['val1', 'val2']
    )).toBe(false);
  });

  it('returns true if the provided values do not match by strict equality', () => {
    expect(valuesChanged({ val: {} }, { val: {} }, 'val')).toBe(true);
  });

});
