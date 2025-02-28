/* eslint-disable @stylistic/comma-dangle */
/* eslint-disable @stylistic/arrow-parens */
/* eslint-disable @stylistic/brace-style */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import _ from 'lodash';
import { findFile, parseData } from './parser.js';

export const getFilePath = (filepath1, filepath2) => {
  const resolvedFilePath1 = findFile(process.cwd(), filepath1);
  const resolvedFilePath2 = findFile(process.cwd(), filepath2);

  const data1 = parseData(resolvedFilePath1);
  const data2 = parseData(resolvedFilePath2);

  return genDiff(data1, data2);
};

function genDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  const diff = allKeys.reduce((acc, key) => {
    if (!Object.prototype.hasOwnProperty.call(data2, key)) {
      acc.push(`  - ${key}: ${JSON.stringify(data1[key])}`);
    } else if (!Object.prototype.hasOwnProperty.call(data1, key)) {
      acc.push(`  + ${key}: ${JSON.stringify(data2[key])}`);
    } else if (_.isEqual(data1[key], data2[key])) {
      acc.push(`    ${key}: ${JSON.stringify(data1[key])}`);
    } else if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      const nestedDiff = genDiff(data1[key], data2[key]);
      acc.push(`    ${key}: {`);
      acc.push(
        nestedDiff
          .split('\n')
          .map((line) => `      ${line}`)
          .join('\n')
      );
      acc.push(`    }`);
    } else {
      acc.push(`  - ${key}: ${JSON.stringify(data1[key])}`);
      acc.push(`  + ${key}: ${JSON.stringify(data2[key])}`);
    }
    return acc;
  }, []);

  return `{\n${diff.join('\n')}\n}`;
}

export default genDiff;
