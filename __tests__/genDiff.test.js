import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../genDiff.js';
import parse from '../bin/parsers.js';
import { fileURLToPath } from 'url';

// Получаем текущий путь к модулю
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff nested JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedResultPath = getFixturePath('resjson.txt');

  // Чтение входных файлов
  const content1 = fs.readFileSync(file1, 'utf-8');
  const content2 = fs.readFileSync(file2, 'utf-8');

  // Парсинг данных
  const data1 = parse(content1, 'json');
  const data2 = parse(content2, 'json');

  // Чтение ожидаемого результата из файла
  const expected = fs.readFileSync(expectedResultPath, 'utf-8').trim();

  // Генерация различий и сравнение с ожидаемым результатом
  expect(genDiff(data1, data2)).toBe(expected);
});

test('genDiff plain format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const content1 = fs.readFileSync(file1, 'utf-8');
  const content2 = fs.readFileSync(file2, 'utf-8');

  const data1 = parse(content1, 'json');
  const data2 = parse(content2, 'json');
  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`.trim();
  expect(genDiff(data1, data2, 'plain')).toBe(expected);
});

test('genDiff json format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const content1 = fs.readFileSync(file1, 'utf-8');
  const content2 = fs.readFileSync(file2, 'utf-8');

  const data1 = parse(content1, 'json');
  const data2 = parse(content2, 'json');

  const diff = genDiff(data1, data2, 'json');
  const parsedDiff = JSON.parse(diff); // Проверяем, что вывод — валидный JSON

  expect(parsedDiff).toBeInstanceOf(Array); // Проверяем структуру вывода
});
