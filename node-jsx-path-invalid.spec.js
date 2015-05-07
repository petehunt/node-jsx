describe('node-jsx', function() {
  it('should not work on wrong paths passed', function() {
    require('./index').install({
      paths: ['somepath']
    });
    expect(require.bind(null, './test-module')).toThrow();
  });
});
