# node-jsx

Transparently `require()` jsx from node.

## Usage

`require('node-jsx').install()`

If you want to use a different extension, do:

`require('node-jsx').install({extension: '.jsx'})`

## Additional Transformations

It is possible to combine node-jsx with other source transformations, by either providing a `preTransform` or `postTranform` (or both) function.

If you want to couple with an additional transform (such as CoffeeScript), do:

```javascript
var coffee = require('coffee-script');
require('node-jsx').install({
  extension: '.coffee',
  preTransform: function(src, filename) {
    return coffee.compile(src, {
      'bare': true
    });
  }
});
```

Or to use with traceur:
```javascript
var traceur = require('traceur');
require('node-jsx').install({
  extension: '.jsx',
  postTransform: traceur.compile
});
```

Or with babel:
```javascript
var babel = require('babel');
require('node-jsx').install({
  extension: '.jsx',
  postTransform: function(src, filename) {
    return babel.transform(filename).code;
  }
});
```

Traceur compiler does not enjoy JSX syntax, necessitating it being a postTransform.

*Note:* the `preTransform` option was previously called `additionalTransform`, which is soft-deprecated in this release.

## Other options

If you want to use [ES6 transforms](https://github.com/facebook/jstransform/tree/master/visitors) available in the JSX tool

`require('node-jsx').install({harmony: true})`
