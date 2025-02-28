import { Command } from 'commander';
import { getFilePath } from '../src/diff.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getFilePath(filepath1, filepath2));
  });

program.parse(process.argv);
