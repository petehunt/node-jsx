var fs = require('fs');
var React = require('react-tools');

function install(options) {
  options = options || {};

  // Import everything in the transformer codepath before we add the import hook
  React.transform('', options);

  var extension = options.extension || '.js',
      transformer = require.extensions[extension]

  if (transformer && transformer._installed) {
    throw new Error('node-jsx has already been installed for extension ' + extension)
  }

  transformer = require.extensions[extension] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    if (typeof options.additionalTransform == 'function') {
      src = options.additionalTransform(src);
    }
    try {
      src = React.transform(src, options);
    } catch (e) {
      throw new Error('Error transforming ' + filename + ' to JSX: ' + e.toString());
    }
    module._compile(src, filename);
  };

  transformer._installed = true

  return module.exports
}

module.exports = {
  install: install
};
