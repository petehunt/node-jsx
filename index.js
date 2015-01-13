var fs = require('fs');
var React = require('react-tools');
var watch = require('node-watch');

var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};

  // Import everything in the transformer codepath before we add the import hook
  React.transform('', options);

  require.extensions[options.extension || '.js'] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    if (typeof options.additionalTransform == 'function') {
      src = options.additionalTransform(src);
    }
    try {
      src = React.transform(src, options);
    } catch (e) {
      throw new Error('Error transforming ' + filename + ' to JSX: ' + e.toString());
    }

    // Watch the fie we just transformed and expire it
    if (options.watch) {
      watch(filename, watchFn);
    }

    module._compile(src, filename);
  };

  installed = true;
}

function watchFn(filename) {
  expire(filename, true);
}

function expire(id, recursive) {
  var modules = [id];
  var module = require.cache[id];

  // Go through all the module's parents. Seems to be necessary to clear the cache
  while (recursive && module && module.parent) {
    module = module.parent;

    modules.unshift(module.id);
    hasParents = module.parent;
  }

  for (var i = 0; i < modules.length; i++) {
    delete require.cache[modules[i]];
  }
}

module.exports = {
  install: install
};
