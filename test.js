const idents = require('./idents');
const acorn = require('acorn/dist/acorn');
const assert = require('assert');

// collect parses the AST of the JavaScript source code and returns an array of the names of each Identifier AST node.
const collect = (source) => {
  const ast = acorn.parse(source);
  return idents.all(ast).map((id) => id.name);
};

describe('Identifiers', () => {

  it('lists identifiers in JS file', (done) => {
    const src = `
      var a={b: 3};
      var c = a.b[d];
      function f(w, x, y) {
        return z - q ? r : s;
      }
    `;
    assert.deepEqual(
      collect(src),
      ['a', 'c', 'a', 'b', 'd', 'f', 'w', 'x', 'y', 'z', 'q', 'r', 's']
    );
    done();
  });

  it('does not list null anonymous function names as identifiers', (done) => {
    const src = `
      var a = function() {};
    `;
    assert.deepEqual(collect(src), ['a']);
    done();
  });
});
