import { findFile, parseData } from './parser.js';
import buildDiffTree from './buildDiffTree.js';
import formatters from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const dir = process.cwd();
  const absoluteFilePath1 = findFile(dir, filepath1);
  const absoluteFilePath2 = findFile(dir, filepath2);

  const data1 = parseData(absoluteFilePath1);
  const data2 = parseData(absoluteFilePath2);

  const diffTree = buildDiffTree(data1, data2);

  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unsupported format: ${formatName}`);
  }

  return `${formatter(diffTree)}`;
};

export default genDiff;
