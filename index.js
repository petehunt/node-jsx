var fs = require('fs');
var React = require('react-tools');

var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};

  // Import everything in the transformer codepath before we add the import hook
  React.transform('');

  if (options.extension === '.coffee') {
    var coffee = require('coffee-script');
  }

  require.extensions[options.extension || '.js'] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    if (options.extension === '.coffee') {
      src = coffee.compile(src, {'bare': true});
    }
    src = React.transform(src);
    module._compile(src, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};
