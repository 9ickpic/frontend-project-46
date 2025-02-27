import { Command } from 'commander';
import { parseData, findFile } from '../src/parser.js';
import diff from '../src/diff.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const resolvedFilePath1 = findFile(process.cwd(), filepath1);
    const resolvedFilePath2 = findFile(process.cwd(), filepath2);

    const data1 = parseData(resolvedFilePath1);
    const data2 = parseData(resolvedFilePath2);

    const diffResult = diff(data1, data2);
    console.log(diffResult);
  });

program.parse(process.argv);
