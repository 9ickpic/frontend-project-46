import yaml from 'js-yaml';

const parsers = {
  json: content => JSON.parse(content),
  yml: content => yaml.load(content),
  yaml: content => yaml.load(content),
};

const parse = (content, format) => {
  if (!parsers[format]) {
    throw new Error(`Unsupported format: ${format}`);
  }
  return parsers[format](content);
};

export default parse;
