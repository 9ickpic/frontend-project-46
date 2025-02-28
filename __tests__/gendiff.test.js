import { expect, test } from '@jest/globals';
import { getFilePath } from '../src/diff.js';

const res = `{
  - follow: false
    host: "hexlet.io"
  - proxy: "123.234.53.22"
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('should res', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  expect(getFilePath(filepath1, filepath2)).toBe(res);
});
