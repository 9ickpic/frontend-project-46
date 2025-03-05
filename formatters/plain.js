const formatPlain = (diff) => {
  const formatValue = (value) => {
    if (value === null) {
      return 'null';
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      return '[complex value]';
    }
    if (Array.isArray(value)) {
      return '[complex value]'; // или можно вернуть JSON.stringify(value)
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return String(value);
  };

  const buildLines = (diff, path = '') => {
    return diff.flatMap((node) => {
      const { key, type, value, oldValue, children } = node;
      const escapedKey = key.includes('.') ? `["${key}"]` : key;
      const fullPath = path ? `${path}.${escapedKey}` : escapedKey;

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
          throw new Error(`Unknown type: ${type} for key '${key}'`);
      }
    });
  };

  return buildLines(diff).join('\n');
};

export default formatPlain;
