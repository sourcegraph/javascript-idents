javascript-idents
=================

**javascript-idents walks a [JS abstract syntax tree (AST)](https://github.com/estree/estree) and returns all identifiers the code uses.**

It relies on Marijn Haverbeke's [Acorn](https://github.com/ternjs/acorn#acorn) for AST walking, and should work with any [ESTree](https://github.com/estree/estree#the-estree-spec)-compliant JavaScript AST.

[![npm version](https://img.shields.io/npm/v/javascript-idents.svg)](https://www.npmjs.com/package/javascript-idents)
[![build status](https://img.shields.io/travis/sourcegraph/javascript-idents.svg)](https://travis-ci.org/sourcegraph/javascript-idents)
[![dependency status](https://img.shields.io/david/sourcegraph/javascript-idents.svg)](https://david-dm.org/sourcegraph/javascript-idents)
[![dev dependency status](https://img.shields.io/david/dev/sourcegraph/javascript-idents.svg)](https://david-dm.org/sourcegraph/javascript-idents#info=devDependencies)
![BSD-licensed](https://img.shields.io/github/license/sourcegraph/javascript-idents.svg)

Example
-------

The following example prints the name of each `Identifier` node to the console.

```javascript
const acorn = require('acorn/dist/acorn');
const idents = require('javascript-idents');

acorn.parse(`
    const c = a.b[d];
    function f (w, x, y) {
        return z;
    }
`);

idents.inspect(ast, (identifier) => {
  console.log('identifier found:', identifier.name);
});
```

```
identifier found: a
identifier found: d
identifier found: c
identifier found: z
identifier found: f
identifier found: w
identifier found: x
identifier found: y
```


Running tests
=============

Run `npm test`.


Contributors
============

* Quinn Slack <sqs@sourcegraph.com>
* Jannis R <mail@jannisr.de>
