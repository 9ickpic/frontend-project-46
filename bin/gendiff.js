#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import genDiff from '../genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format (default: "stylish")', 'stylish')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .action((filepath1, filepath2, options) => {
    // Получаем абсолютные пути до файлов
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    // Чтение файлов
    const fileContent1 = fs.readFileSync(absolutePath1, 'utf-8');
    const fileContent2 = fs.readFileSync(absolutePath2, 'utf-8');

    // Определение формата файла на основе расширения
    const format1 = path.extname(filepath1).slice(1);
    const format2 = path.extname(filepath2).slice(1);

    // Парсинг данных
    const data1 = parse(fileContent1, format1);
    const data2 = parse(fileContent2, format2);

    // Генерация и вывод различий
    const diff = genDiff(data1, data2, options.format);
    console.log(diff);
  })
  .helpOption('-h, --help', 'display help for command');

program.parse(process.argv);

/*
    .option('-f, --format <type>', 'output format'):

        Добавляет опцию -f или --format, которая принимает значение (например, json, plain и т.д.).

    .argument('<filepath1>', 'path to the first file'):

        Добавляет обязательный аргумент <filepath1> — путь к первому файлу.

    .argument('<filepath2>', 'path to the second file'):

        Добавляет обязательный аргумент <filepath2> — путь ко второму файлу.

    .action((filepath1, filepath2, options) => { ... }):

        Обрабатывает аргументы и опции. В данном случае просто выводит их в консоль для проверки.
*/
