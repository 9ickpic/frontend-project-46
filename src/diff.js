import _ from 'lodash';

function genDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  const diff = allKeys.reduce((acc, key) => {
    if (!data2.hasOwnProperty(key)) {
      acc.push(`  - ${key}: ${JSON.stringify(data1[key])}`);
    } else if (!data1.hasOwnProperty(key)) {
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
