import _ from 'lodash';

const tab = (level = 1) => '    '.repeat(level); // 4 пробела на каждый уровень

const stringify = (value, level) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map(key => `${tab(level + 1)}${key}: ${stringify(value[key], level + 1)}`);
  return `{\n${result.join('\n')}\n${tab(level)}}`;
};

const buildTreeFormat = (tree, level = 1) => {
  const result = tree.flatMap((node) => {
    const { key, type, value, oldValue, children } = node;

    switch (type) {
      case 'unchanged':
        return `${tab(level)}${key}: ${stringify(value, level)}`;
      case 'updated':
        return [
          `${tab(level)}  - ${key}: ${stringify(oldValue, level)}`,
          `${tab(level)}  + ${key}: ${stringify(value, level)}`,
        ];
      case 'added':
        return `${tab(level)}  + ${key}: ${stringify(value, level)}`;
      case 'removed':
        return `${tab(level)}  - ${key}: ${stringify(value, level)}`;
      case 'nested':
        return `${tab(level)}${key}: {\n${buildTreeFormat(children, level + 1)}\n${tab(level)}}`;
      default:
        throw new Error(`Unknown node type! ${type} is wrong!`);
    }
  });
  return result.join('\n');
};

export default tree => `{\n${buildTreeFormat(tree)}\n}`;
