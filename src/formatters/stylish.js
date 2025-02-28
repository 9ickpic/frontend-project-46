const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount);

const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }
  const lines = Object.entries(value).map(([key, val]) => `${indent(depth + 1)}  ${key}: ${formatValue(val, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};

const formatStylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent(depth)}+ ${node.key}: ${formatValue(node.value, depth)}`;
      case 'deleted':
        return `${indent(depth)}- ${node.key}: ${formatValue(node.value, depth)}`;
      case 'changed':
        return `${indent(depth)}- ${node.key}: ${formatValue(node.oldValue, depth)}\n${indent(depth)}+ ${node.key}: ${formatValue(node.newValue, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${node.key}: ${formatValue(node.value, depth)}`;
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${indent(depth)}}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return lines.join('\n');
};

export default formatStylish;
