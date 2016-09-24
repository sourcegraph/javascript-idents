const walk = require('acorn/dist/walk');

// inspect traverses the AST starting at node, calling found with each Identifier AST node it encounters.
const inspect = (node, found) => {
  const identWalker = walk.make({
    Function: (node, st, c) => {
      if (node.id) c(node.id, st);
      for (let param of node.params)
        c(param, st);
      // TODO(sqs): defaults, rest?
      c(node.body, st, 'ScopeBody');
    },
    Identifier: (node) => {
      found(node);
    },
    MemberExpression: (node, st, c) => {
      c(node.object, st);
      c(node.property, st);
    },
    VariableDeclaration: (node, st, c) => {
      for (let decl of node.declarations) {
        if (decl.id.type === 'Identifier')
          c(decl.id, st);
        if (decl.init)
          c(decl.init, st, 'Expression');
      }
    }
  });
  walk.recursive(node, null, identWalker);
};

// all traverses the AST starting at node and returns an array of all Identifier AST nodes it encounters.
const all = (node) => {
  const idents = [];
  inspect(node, (ident) => {
    idents.push(ident);
  });
  return idents;
};

module.exports = {inspect, all}
