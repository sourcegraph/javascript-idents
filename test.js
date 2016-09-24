const idents = require('./idents');
const acorn = require('acorn/dist/acorn');
const assert = require('assert');

// collect parses the AST of the JavaScript source code and returns an array of the names of each Identifier AST node.
const collect = (source) => {
  const ast = acorn.parse(source);
  return idents.all(ast).map((id) => id.name);
};



describe('collects', () => {

  it('parenthesis', () => {
    assert.deepEqual(collect(`(a)`), ['a']);
  });

  describe('operators', () => {

    it('logical NOT', () => {
      assert.deepEqual(collect(`!a`), ['a']);
    });
    it('logical AND', () => {
      assert.deepEqual(collect(`a && b`), ['a', 'b']);
    });
    it('logical OR', () => {
      assert.deepEqual(collect(`a || b`), ['a', 'b']);
    });
    it('addition', () => {
      assert.deepEqual(collect(`a + b`), ['a', 'b']);
    });
    it('subtraction', () => {
      assert.deepEqual(collect(`a - b`), ['a', 'b']);
    });
    it('multiplication', () => {
      assert.deepEqual(collect(`a * b`), ['a', 'b']);
    });
    it('division', () => {
      assert.deepEqual(collect(`a / b`), ['a', 'b']);
    });
    it('remainder', () => {
      assert.deepEqual(collect(`a % b`), ['a', 'b']);
    });
    it('exponentiation', () => {
      assert.deepEqual(collect(`a ** b`), ['a', 'b']);
    });

    it('left shift', () => {
      assert.deepEqual(collect(`a << b`), ['a', 'b']);
    });

    it('right shift', () => {
      assert.deepEqual(collect(`a >> b`), ['a', 'b']);
    });

    it('unsigned right shift', () => {
      assert.deepEqual(collect(`a >>> b`), ['a', 'b']);
    });

    it('bitwise AND', () => {
      assert.deepEqual(collect(`a & b`), ['a', 'b']);
    });

    it('bitwise XOR', () => {
      assert.deepEqual(collect(`a ^ b`), ['a', 'b']);
    });

    it('bitwise OR', () => {
      assert.deepEqual(collect(`a | b`), ['a', 'b']);
    });

  })

  describe('assignments', () => {

    it('addition', () => {
      assert.deepEqual(collect(`a += b`), ['b', 'a']);
    });
    it('subtraction', () => {
      assert.deepEqual(collect(`a -= b`), ['b', 'a']);
    });
    it('multiplication', () => {
      assert.deepEqual(collect(`a *= b`), ['b', 'a']);
    });
    it('division', () => {
      assert.deepEqual(collect(`a /= b`), ['b', 'a']);
    });
    it('remainder', () => {
      assert.deepEqual(collect(`a %= b`), ['b', 'a']);
    });
    it('exponentiation', () => {
      assert.deepEqual(collect(`a **= b`), ['b', 'a']);
    });

    it('left shift', () => {
      assert.deepEqual(collect(`a <<= b`), ['b', 'a']);
    });

    it('right shift', () => {
      assert.deepEqual(collect(`a >>= b`), ['b', 'a']);
    });

    it('unsigned right shift', () => {
      assert.deepEqual(collect(`a >>>= b`), ['b', 'a']);
    });

    it('bitwise AND', () => {
      assert.deepEqual(collect(`a &= b`), ['b', 'a']);
    });

    it('bitwise XOR', () => {
      assert.deepEqual(collect(`a ^= b`), ['b', 'a']);
    });

    it('bitwise OR', () => {
      assert.deepEqual(collect(`a |= b`), ['b', 'a']);
    });

  });

  describe('declarations', () => {

    it('var', () => {
      assert.deepEqual(collect(`var a = 1`), ['a']);
      assert.deepEqual(collect(`var a = 1, b = 2`), ['a', 'b']);
    });

    it('const', () => {
      assert.deepEqual(collect(`const a = 1`), ['a']);
      assert.deepEqual(collect(`const a = 1, b = 2`), ['a', 'b']);
    });

    it('let', () => {
      assert.deepEqual(collect(`let a = 1`), ['a']);
      assert.deepEqual(collect(`let a = 1, b = 2`), ['a', 'b']);
    });

  });

  it('conditional expression', () => {
    assert.deepEqual(collect(`a ? b : c`), ['a', 'b', 'c']);
  });

  it('template string', () => {
    assert.deepEqual(collect('`${a}b${c}`'), ['a', 'c']);
  });

  it('object literals values', () => {
    assert.deepEqual(collect(`{a: b}`), ['b']);
    assert.deepEqual(collect(`{a: b + c}`), ['b', 'c']);
  });

  it('array values', () => {
    assert.deepEqual(collect(`[a, b]`), ['a', 'b']);
    assert.deepEqual(collect(`[a + b, c]`), ['a', 'b', 'c']);
  });

  it('member expressions', () => {
    assert.deepEqual(collect(`a[b] = 1`), ['a', 'b']);
    assert.deepEqual(collect(`a[0] = 1`), ['a']);
  });

  describe('functions', () => {

    it('declaration', () => {
      assert.deepEqual(collect(`function a () {};`), ['a']);
      assert.deepEqual(collect(`const a = function b () {};`), ['b', 'a']);
    });

    it('parameters', () => {
      assert.deepEqual(collect(`
        (function (foo, bar) {});
      `), ['foo', 'bar']);
    });

    it('inside function body', () => {
      assert.deepEqual(collect(`
        (function () {1 + a; b;})
      `), ['a', 'b']);
    });

  });

  describe('loops', () => {

    it('inside while loop', () => {
      assert.deepEqual(collect(`
        while (true) {
          1 + a; b;
        }
      `), ['a', 'b']);
    });

    it('inside for loop', () => {
      assert.deepEqual(collect(`
        for (let i = 0; i < 1; i++) {
          1 + a; b;
        }
      `), ['i', 'i', 'i', 'a', 'b']);
    });

    it('inside for…of loop', () => {
      assert.deepEqual(collect(`
        for (let key of arr) {
          1 + a; b;
        }
      `), ['key', 'arr', 'a', 'b']);
    });

    it('inside for…in loop', () => {
      assert.deepEqual(collect(`
        for (let key in obj) {
          1 + a; b;
        }
      `), ['key', 'obj', 'a', 'b']);
    });

  });

  it('inside block', () => {
    assert.deepEqual(collect(`{1 + a; b;}`), ['a', 'b']);
  });

  it('object literal', () => {
    assert.deepEqual(collect(`o = {}`), ['o']);
    assert.deepEqual(collect(`o = {a: b}`), ['b', 'o']);
    assert.deepEqual(collect(`o = {a: b, c: d}`), ['b', 'd', 'o']);
    assert.deepEqual(collect(`o = {a: b, c: {d: e}}`), ['b', 'e', 'o']);
  });

  it('array literal', () => {
    assert.deepEqual(collect(`o = []`), ['o']);
    assert.deepEqual(collect(`o = [a]`), ['a', 'o']);
    assert.deepEqual(collect(`o = [a, 1, b]`), ['a', 'b', 'o']);
    assert.deepEqual(collect(`o = [a, 1, [b, 2]]`), ['a', 'b', 'o']);
  });

  describe('destructuring', () => {

    it('object destructuring', () => {
      assert.deepEqual(collect(`const {a} = 1`), ['a']);
      assert.deepEqual(collect(`const {a, b} = 1`), ['a', 'b']);
    });

    it('array destructuring', () => {
      assert.deepEqual(collect(`const [a] = 1`), ['a']);
      assert.deepEqual(collect(`const [a, b] = 1`), ['a', 'b']);
    });

  });

});



describe('ignores', () => {

  it('literals', () => {
    assert.deepEqual(collect(`1`), []);
    assert.deepEqual(collect(`'a'`), []);
    assert.deepEqual(collect(`"a"`), []);
    assert.deepEqual(collect('`a`'), []);
    assert.deepEqual(collect(/a/g), []);
  });

  it('object keys', () => {
    assert.deepEqual(collect(`{a: 1}`), []);
  });

});



it('kitchen sink', () => {

  const results = collect(`
    const a = {b: 3, c: [d]};
    let b = a.b[c];
    var c = function d (e, f, g) {
      return h - i ? j : k;
    };
    for (let l of m) n(l);
  `).reduce((results, identifier) => {
    if (!results[identifier]) results[identifier] = 1
    else results[identifier] += 1
    return results
  }, {});

  assert.deepEqual(results, {
    a: 2,
    b: 1,
    c: 2,
    d: 2,
    e: 1,
    f: 1,
    g: 1,
    h: 1,
    i: 1,
    j: 1,
    k: 1,
    l: 2,
    m: 1,
    n: 1,
  });
});
