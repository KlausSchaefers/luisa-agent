export function printTree(node, result = [], fct, indent = "") {
  if (fct) {
    const s = fct(node)
    result.push(`${indent} ${s}`);
  } else {
    result.push(`${indent} ${node.name} - x: ${node.x}, y:${node.y} - w: ${node.w}, h: ${node.h} `);
  }

  if (node.children) {
    node.children.forEach((c) => {
      printTree(c, result, fct, indent + "   ");
    });
  }
  if (node.screens) {
    node.screens.forEach((c) => {
      printTree(c, result, fct, indent + "   ");
    });
  }
  return result.join("\n");
}
