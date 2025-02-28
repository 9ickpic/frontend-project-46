function buildDiffTree(obj1, obj2) {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]));
  return keys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    else if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return { key, type: 'nested', children: buildDiffTree(obj1[key], obj2[key]) };
    }
    else if (obj1[key] !== obj2[key]) {
      return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
}

export default buildDiffTree;
