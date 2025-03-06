import _ from 'lodash';

const getSpaces = depth => '    '.repeat(depth);

const marks = {
  openBracket: '{',
  closeBracket: '}',
  removed: '- ',
  added: '+ ',
  unmodified: '  ',
  nested: '  ',
};

const getCloseBracket = depth => `${getSpaces(depth - 1)}${marks.closeBracket}`;

const stringify = (node, depth = 1) => {
  const indent = getSpaces(depth);
  if (!_.isPlainObject(node)) {
    return `${node}`;
  }
  const strings = Object.entries(node).map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);
  return [marks.openBracket, ...strings, getCloseBracket(depth)].join('\n');
};

const stylish = (diffTree) => {
  const iter = (node, depth) => {
    const indent = getSpaces(depth).slice(2);
    const strings = node.reduce((acc, prop) => {
      const {
        key,
        status,
        value,
        previous,
        current,
        children,
      } = prop; // Добавлен перенос строки после открывающей скобки и перед закрывающей скобкой
      const stringStarter = `${indent}${marks[status]}${key}`;
      switch (status) {
        case 'removed':
          return [...acc, `${stringStarter}: ${stringify(value, depth + 1)}`];
        case 'added':
          return [...acc, `${stringStarter}: ${stringify(value, depth + 1)}`];
        case 'updated':
          return [
            ...acc,
            `${indent}${marks.removed}${key}: ${stringify(previous, depth + 1)}`,
            `${indent}${marks.added}${key}: ${stringify(current, depth + 1)}`,
          ];
        case 'nested':
          return [...acc, `${stringStarter}: ${iter(children, depth + 1)}`];
        default:
          return [...acc, `${stringStarter}: ${stringify(value, depth + 1)}`];
      }
    }, []);
    return [marks.openBracket, ...strings, getCloseBracket(depth)].join('\n');
  };
  return iter(diffTree, 1);
};

export default stylish;
