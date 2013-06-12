var idents = require('./idents');
var acorn = require('acorn'), assert = require('assert');

// identNames parses the AST of the JavaScript source code and returns an array of the names of each
// Identifier AST node.
function identNames(source) {
  return idents.all(acorn.parse(source)).map(function(id) { return id.name; });
}

describe('Identifiers', function() {
  it('lists identifiers in JS file', function(done) {
    var src = 'var a={b: 3}; var c = a.b[d]; function f(w, x, y) { return z - q ? r : s; }';
    assert.deepEqual(
      identNames(src),
      ['a', 'c', 'a', 'b', 'd', 'f', 'w', 'x', 'y', 'z', 'q', 'r', 's']
    );
    done();
  });
  it('does not list null anonymous function names as identifiers', function(done) {
    var src = 'var a = function() {};';
    assert.deepEqual(identNames(src), ['a']);
    done();
  });
});
