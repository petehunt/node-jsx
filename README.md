# node-jsx

Transparently `require()` jsx from node.

## Usage

`require('node-jsx').install()`

If you want to use a different extension, do:

`require('node-jsx').install({extension: '.jsx'})`

If you want to couple with an additional transform (such as CoffeeScript), do:

```
var coffee = require('coffee-script');
require('node-jsx').install({
  extension: '.coffee',
  additionalTransform: function(src) {
    return coffee.compile(src, {
      'bare': true
    });
  }
});
```
