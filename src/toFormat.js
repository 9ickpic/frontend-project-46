import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

export default (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
    case 'JSON':
      return JSON.stringify(diffTree);
    default:
      throw new Error(`${format} do not supported!`);
  }
};
