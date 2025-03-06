import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const parse = (filepath, extname) => {
  switch (extname) {
    case '.json':
      return JSON.parse(readFileSync(filepath, 'utf8'));
    case '.yml':
    case '.yaml':
      return yaml.load(readFileSync(filepath, 'utf8'));
    default:
      throw new Error('Sorry, this format do not support!');
  }
};

export default parse;
