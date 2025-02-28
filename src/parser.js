/* eslint-disable @stylistic/brace-style */
/* eslint-disable @stylistic/arrow-parens */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

//* рекурсивно обходим все директории в проекте, в поиске файлов
const findFile = (dir, fileName) => {
  const files = fs.readdirSync(dir);
  return files
    .map((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const res = findFile(filePath, fileName);

        if (res) return res;
      } else if (file === fileName) {
        return filePath;
      }
      throw new Error(`File not found: ${fileName}`);
    })
    .filter((res) => res !== null)
    .flat()[0];
};

const readFileSync = (filePath) => {
  const resolvedPath = path.resolve(filePath);
  const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
  return fileContent;
};

const parseData = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const fileContent = readFileSync(filePath);

  switch (ext) {
    case '.json':
      return JSON.parse(fileContent);

    case '.yaml':
    case '.yml':
      return yaml.load(fileContent);

    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

export { parseData, findFile, readFileSync };
