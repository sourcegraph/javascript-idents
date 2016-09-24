const walk = require('acorn/dist/walk');

// inspect traverses the AST starting at node, calling found with each Identifier AST node it encounters.
const inspect = (ast, found) => {
  walk.simple(ast, {
    Identifier: (node) => {
      found(node);
    },
    VariableDeclarator: (node) => {
      found(node.id);
    },
    Function: (node) => {
      for (let param of node.params) {
        if(param.type === 'Identifier') found(param);
      }
    },
    FunctionDeclaration: (node) => {
      found(node.id);
    },
  });
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
