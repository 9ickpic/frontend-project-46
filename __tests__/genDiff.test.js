import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getFixture = (filename) => readFileSync(fixturePath(filename), 'utf8').trim();
const getActual = (filename1, filename2, format) => {
  const path1 = fixturePath(filename1);
  const path2 = fixturePath(filename2);
  return genDiff(path1, path2, format);
};

const cases = [
  {
    f1: 'example7.json',
    f2: 'example8.json',
    exp: 'stylish_recursive.txt',
    format: 'stylish',
    title: 'to stylish from JSON',
  },
  {
    f1: 'example9.yml',
    f2: 'example10.yml',
    exp: 'stylish_recursive.txt',
    format: 'stylish',
    title: 'to stylish from YML',
  },
  {
    f1: 'example7.json',
    f2: 'example10.yml',
    exp: 'stylish_recursive.txt',
    format: 'stylish',
    title: 'to stylish from mixed',
  },
  {
    f1: 'example7.json',
    f2: 'example10.yml',
    exp: 'plain.txt',
    format: 'plain',
    title: 'to plain from mixed',
  },
  {
    f1: 'example7.json',
    f2: 'example10.yml',
    exp: 'JSON.txt',
    format: 'json',
    title: 'to json from mixed',
  },
  {
    f1: 'example7.json',
    f2: 'example8.json',
    exp: 'JSON.txt',
    format: 'JSON',
    title: 'to JSON from json',
  },
];

test.each(cases)('TEST: $title', ({ f1, f2, exp, format }) => {
  const actual = getActual(f1, f2, format);
  const expected = getFixture(exp);
  expect(actual).toBe(expected);
});
