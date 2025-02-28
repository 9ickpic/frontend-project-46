import { Command } from 'commander';
import { findFile, parseData } from '../src/parser.js';
import buildDiffTree from '../src/buildDiffTree.js';
import formatters from '../src/formatters/index.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options = 'stylish') => {
    const dir = process.cwd();

    const absolutePath1 = findFile(dir, filepath1);
    const absolutePath2 = findFile(dir, filepath2);

    const diffTree = buildDiffTree(parseData(absolutePath1), parseData(absolutePath2));

    const formatter = formatters[options.format];
    if (!formatter) {
      throw new Error(`Unsupported format: ${options.format}`);
    }
    const formattedDiff = formatter(diffTree);
    console.log(formattedDiff);
  });

program.parse(process.argv);
