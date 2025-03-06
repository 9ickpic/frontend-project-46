import _ from 'lodash';

const stringify = (node) => {
  if (typeof node === 'string') {
    return `'${node}'`;
  }
  if (_.isPlainObject(node)) {
    return '[complex value]';
  }
  return node;
};

const plain = (diffTree) => {
  const iter = (node, path = '') => {
    const strings = node.reduce((acc, prop) => {
      const { key, status, value, previous, current, children } = prop;
      const currentPath = [path, key].join('.');
      switch (status) {
        case 'removed':
          return [...acc, `Property '${currentPath.substring(1)}' was removed`];
        case 'added':
          return [
            ...acc,
            `Property '${currentPath.substring(
              1,
            )}' was added with value: ${stringify(value)}`,
          ];
        case 'updated':
          return [
            ...acc,
            `Property '${currentPath.substring(
              1,
            )}' was updated. From ${stringify(previous)} to ${stringify(
              current,
            )}`,
          ];
        case 'nested':
          return [...acc, iter(children, currentPath)];
        default:
          return acc;
      }
    }, []);
    return strings.join('\n');
  };
  return iter(diffTree);
};

export default plain;
