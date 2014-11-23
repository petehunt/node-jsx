var fs = require('fs');
var React = require('react-tools');

var installed = false;

var DEFAULT_EXTENSION = '.js';

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};

  // Import everything in the transformer codepath before we add the import hook
  React.transform('', options);

  var extension = options.extension || DEFAULT_EXTENSION;

  require.extensions[extension] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    if (typeof options.additionalTransform == 'function') {
      src = options.additionalTransform(src);
    }

    if (extension !== DEFAULT_EXTENSION || src.indexOf('@jsx') > -1) {
      try {
        src = React.transform(src, options);
      } catch (e) {
        throw new Error('Error transforming ' + filename + ' to JSX: ' + e.toString());
      }
    }

    module._compile(src, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};
