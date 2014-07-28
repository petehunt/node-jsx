var fs = require('fs');
var React = require('react-tools');
var docblock = require('jstransform/src/docblock');

var installed = false;

function parsePragma(data) {
  return docblock.parseAsObject(docblock.extract(data)); 
}

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};

  // Import everything in the transformer codepath before we add the import hook
  React.transform('', options);

  require.extensions[options.extension || '.js'] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    if (options.addDocblock) {
      if (typeof parsePragma(src).jsx === 'undefined') {
        src = '/** @jsx React.DOM */' + src;
      }
    }
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

  installed = true;
}

module.exports = {
  install: install
};
