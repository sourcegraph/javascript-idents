const acorn = require('acorn/dist/acorn');
const idents = require('.');

const src = acorn.parse(`
    const c = a.b[d];
    function f (w, x, y) {
        return z;
    }
`);

idents.inspect(ast, (identifier) => {
  console.log('identifier found:', identifier.name);
});
