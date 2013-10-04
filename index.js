var fs = require('fs');
var React = require('react-tools');

var installed = false;

function install() {
  if (installed) {
    return;
  }

  // Import everything in the transformer codepath before we add the import hook
  React.transform('');

  require.extensions['.js'] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    src = React.transform(src);
    module._compile(src, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};