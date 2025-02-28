const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return String(value);
};

const buildLines = (tree, path = '') => {
  return tree.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key;
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return buildLines(node.children, currentPath);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
};

const formatPlain = (tree) => {
  return buildLines(tree).join('\n');
};

export default formatPlain;
