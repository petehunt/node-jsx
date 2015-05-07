var fs = require('fs');
var jstransform = require('jstransform/simple');
var path = require('path');

var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};

  // Check if module being loaded is in a path
  var isInPaths = function (paths, filename) {
   return !!paths.filter(function (path) {
      return filename.indexOf(path) === 0;
    }).length; 
  };

  // Import everything in the transformer codepath before we add the import hook
  jstransform.transform('', options);

  require.extensions[options.extension || '.js'] = function(module, filename) {

    var src = fs.readFileSync(filename, {encoding: 'utf8'});

    if (options.paths && !isInPaths(options.paths, filename)) {
      return module._compile(src, filename);
    }

    if (!options.hasOwnProperty("react"))
      options.react = true;

    if (typeof options.additionalTransform == 'function') {
      src = options.additionalTransform(src);
    }

    try {
      src = jstransform.transform(src, options).code;
    } catch (e) {
      throw new Error('Error transforming ' + filename + ' to JS: ' + e.toString());
    }
    
    module._compile(src, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};
