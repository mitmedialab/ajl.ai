import strToId from '../str-to-id';

describe('strToId utility', () => {

  it('is a function', () => {
    expect(strToId).toBeDefined();
    expect(strToId).toBeInstanceOf(Function);
  });

  it('properly formats an input string into an ID-compatible value', () => {
    expect(strToId('  Some! comPlex\n\n\tString value\t ;')).toBe('some_complex_string_value');
  });

});
