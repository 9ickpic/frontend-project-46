const formatJson = (tree) => {
  const result = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return { type: 'added', key: node.key, value: node.value };
      case 'deleted':
        return { type: 'deleted', key: node.key, value: node.value };
      case 'changed':
        return { type: 'changed', key: node.key, oldValue: node.oldValue, newValue: node.newValue };
      case 'unchanged':
        return { type: 'unchanged', key: node.key, value: node.value };
      case 'nested':
        return { type: 'nested', key: node.key, children: formatJson(node.children) };
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return JSON.stringify(result, null, 2);
};

export default formatJson;
