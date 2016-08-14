/* @flow */

import recast from 'recast';

const {types: {namedTypes: types}} = recast;

function isRequire({ callee }: ASTNode): boolean {
  return types.Identifier.check(callee) &&
    callee.name === 'require';
}
function hasStaticArgument(node: ASTNode): boolean {
  return types.Literal.check(node.arguments[0]);
}

export default function importsHandler(
  documentation: Documentation,
  path: NodePath
): void {
  const imports: string[] = [];
  const root = path.scope.getGlobalScope().node;

  recast.visit(root, {
    visitImportDeclaration({ node }: NodePath) {
      if (imports.indexOf(node.source.value) === -1) {
        imports.push(node.source.value);
      }
      return false;
    },
    visitCallExpression({ node }: NodePath) {
      if (
        isRequire(node) &&
        hasStaticArgument(node) &&
        imports.indexOf(node.arguments[0].value) === -1
      ) {
        imports.push(node.arguments[0].value);
      }
      return false;
    },
  });

  documentation.set('imports', imports);
}
