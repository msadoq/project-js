#!/usr/bin/env node

const displayInfo = require('./func/displayInfo');
const validate = require('./func/validate');
const migrate = require('./func/migrate');

const program = require('commander');

program
  .version('0.0.1')
  .option('-i, --info <inputFile>', 'Get information about <inputFile>')
  .option('-c, --check <inputFile>', 'Check if <inputFile> is a valid VIMA view configuration')
  .option('-m, --migrate <inputFile>', 'Migrate <inputFile> to the specified version')
  .option('-t, --target <targetVersion>', 'Sets target version for migration, default 2.0')
  .option('-l, --lock <lockFile>', 'Sets or use existing lock file to remember migrations that have already been applied')
  .option('-o, --output <outputFile>', 'Sets output file to save migrated view configuration')
  .parse(process.argv);

if (program.info) {
  displayInfo(program.info);
}

if (program.check) {
  validate(program.check);
}

if (program.migrate) {
  migrate(program.target, program.migrate, program.output, program.lock);
}
