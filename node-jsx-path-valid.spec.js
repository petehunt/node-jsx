var path = require('path');

describe('node-jsx', function() {
  it('should work only on paths passed', function() {
    require('./index').install({
      paths: [__dirname]
    });
    expect(require('./test-module').indexOf('data-reactid')).toBeGreaterThan(-1);
  });
});
