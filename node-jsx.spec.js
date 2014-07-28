describe('node-jsx', function() {
  it('should work', function() {
    require('./index').install({ addDocblock: true });
    expect(require('./test-module')).toBe('jonx');
  });
});