import _ from 'lodash'

const buildDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]))
  const result = keys.map((key) => {
    const obj1HasKey = _.has(obj1, key)
    const obj2HasKey = _.has(obj2, key)
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, status: 'nested', children: buildDiffTree(obj1[key], obj2[key]) }
    }
    if (obj1HasKey && obj2HasKey && obj1[key] !== obj2[key]) {
      return {
        key,
        status: 'updated',
        previous: obj1[key],
        current: obj2[key],
      }
    }
    if (!obj1HasKey && obj2HasKey) {
      return { key, status: 'added', value: obj2[key] }
    }
    if (obj1HasKey && !obj2HasKey) {
      return { key, status: 'removed', value: obj1[key] }
    }
    return { key, status: 'unmodified', value: obj1[key] }
  })
  return result
}

export default buildDiffTree
