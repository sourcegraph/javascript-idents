javascript-idents
=================

**javascript-idents walks a JavaScript AST and collects all Identifier AST nodes.** It relies on Marijn Haverbeke's [acorn.js](http://marijnhaverbeke.nl/acorn/) for AST walking, and it should be compatible with any [SpiderMonkey Parser API](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API)-compliant JavaScript AST.

It is intended for use in node.js but can be adapted to work in other JavaScript environments.

[![npm version](https://img.shields.io/npm/v/javascript-idents.svg)](https://www.npmjs.com/package/javascript-idents)
[![build status](https://img.shields.io/travis/sourcegraph/javascript-idents.svg)](https://travis-ci.org/sourcegraph/javascript-idents)
[![dependency status](https://img.shields.io/david/sourcegraph/javascript-idents.svg)](https://david-dm.org/sourcegraph/javascript-idents)
[![dev dependency status](https://img.shields.io/david/dev/sourcegraph/javascript-idents.svg)](https://david-dm.org/sourcegraph/javascript-idents#info=devDependencies)
![BSD-licensed](https://img.shields.io/github/license/sourcegraph/javascript-idents.svg)

Example
-------

The following example prints the name of each Identifier AST node to the console.

```javascript
const acorn = require('acorn');
const idents = require('javascript-idents');

const src = 'var c = a.b[d]; function f(w, x, y) { return z; }';
const ast = acorn.parse(src);

idents.inspect(ast, (ident) => {
  console.log('identifier found:', ident.name);
});
```

```
Ident: c
Ident: a
Ident: b
Ident: d
Ident: f
Ident: w
Ident: x
Ident: y
Ident: z
```


Running tests
=============

Run `npm test`.


Contributors
============

* Quinn Slack <sqs@sourcegraph.com>
