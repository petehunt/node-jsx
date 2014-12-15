describe('node-jsx', function() {
  it('should work', function() {
    require('./index').install();
    expect(require('./test-module')).toBe('jonx');
  });
  it('should fail with multiple invocations with the same extension', function() {
    expect(require('./index').install).toThrow();
  });
  it('should support multiple invocations with different extensions', function() {
    require('./index').install({extension: '.jsx'}).install({extension: '.jsy'});
    expect(require('./test-modulx')).toBe('konx');
    expect(require('./test-moduly')).toBe('lonx');
  });
});
