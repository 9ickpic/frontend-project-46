const formatPlain = (diff) => {
  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const buildLines = (diff, path = '') => {
    return diff.flatMap((node) => {
      const { key, type, value, oldValue, children } = node;
      const fullPath = path ? `${path}.${key}` : key;

      switch (type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(value)}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'updated':
          return `Property '${fullPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(value)}`;
        case 'nested':
          return buildLines(children, fullPath);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  };

  return buildLines(diff).join('\n');
};

export default formatPlain;
