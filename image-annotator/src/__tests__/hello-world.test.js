// This test file ensures Jest is working correctly
describe('Hello World tests', () => {
  it('should pass synchronously', () => {
    expect('foo').toBe('foo');
  });

  it('should pass asynchronously', () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('foo'), 10);
    }).then((result) => {
      expect(result).toBe('foo');
    });
  });
});
