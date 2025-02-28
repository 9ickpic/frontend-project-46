import { expect, test, describe } from '@jest/globals';
import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';
import url from 'url';

// Получаем абсолютный путь к текущему файлу
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('should compare JSON files in stylish format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_stylish.txt');
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('should compare JSON files in plain format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_plain.txt');
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected);
  });

  test('should compare JSON files in json format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_json.txt');
    expect(genDiff(filepath1, filepath2, 'json')).toBe(expected);
  });

  test('should compare YAML files in stylish format', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const expected = readFile('expected_stylish.txt');
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('should compare YAML files in plain format', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const expected = readFile('expected_plain.txt');
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected);
  });

  test('should compare YAML files in json format', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const expected = readFile('expected_json.txt');
    expect(genDiff(filepath1, filepath2, 'json')).toBe(expected);
  });
});
