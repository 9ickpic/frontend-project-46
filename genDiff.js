import _ from 'lodash';
import getFormatter from './formatters/index.js';

const genDiff = (data1, data2, format = 'stylish') => {
  const buildDiff = (obj1, obj2) => {
    const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

    return keys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (!_.has(obj1, key)) {
        return { key, type: 'added', value: value2 };
      }
      if (!_.has(obj2, key)) {
        return { key, type: 'removed', value: value1 };
      }
      if (_.isObject(value1) && _.isObject(value2)) {
        return { key, type: 'nested', children: buildDiff(value1, value2) };
      }
      if (value1 !== value2) {
        return { key, type: 'updated', oldValue: value1, value: value2 };
      }
      return { key, type: 'unchanged', value: value1 };
    });
  };

  const diff = buildDiff(data1, data2);
  const formatter = getFormatter(format);
  return formatter(diff);
};

export default genDiff;
