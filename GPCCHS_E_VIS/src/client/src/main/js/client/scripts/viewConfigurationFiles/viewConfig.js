
const MigrationManager = require('./MigrationManager');
const ViewConfiguration = require('./ViewConfiguration');


const program = require('commander');

program
  .version('0.0.1')
  .option('-i, --info <inputFile>', 'Get information about <inputFile>')
  .option('-c, --check <inputFile>', 'Check if <inputFile> is a valid VIMA view configuration')
  .option('-m, --migrate <inputFile>', 'Migrate <inputFile> to the specified version')
  .parse(process.argv);

if (program.info) {
  const info = ViewConfiguration.fromFile(program.info).info;
  process.stdout.write(`${JSON.stringify(info, null, 2)}\n`);
}

if (program.check) {
  process.stderr.write('[ERROR] This function has not yet been implemented\n');
}

if (program.migrate) {
  const migrationManager = new MigrationManager('2.0'); // TODO: pass version as parameter
  const toMigrate = ViewConfiguration.fromFile(program.migrate);
  process.stdout.write(migrationManager.migrate(toMigrate).toString());
}
