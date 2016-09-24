const walk = require('acorn/dist/walk');

// inspect traverses the AST starting at node, calling found with each Identifier AST node it encounters.
const inspect = (ast, found) => {
  walk.simple(ast, {
    Identifier: (node) => {
      found(node);
    },
    VariableDeclarator: (node) => {
      if(node.id.type === 'Identifier') found(node.id);
    },
    Function: (node) => {
      for (let param of node.params) {
        if(param.type === 'Identifier') found(param);
      }
    },
    FunctionDeclaration: (node) => {
      found(node.id);
    },
    AssignmentExpression: (node) => {
      if(node.left.type === 'Identifier') found(node.left);
    },
    ObjectPattern: (node) => {
      for (let property of node.properties) {
        if (property.value.type === 'Identifier') found(property.value);
      }
    },
    ArrayPattern: (node) => {
      for (let element of node.elements) {
        if (element.type === 'Identifier') found(element);
      }
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
