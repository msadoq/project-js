#!/usr/bin/env node

const Validator = require('./Validator');
const MigrationManager = require('./migrations/MigrationManager');
const ViewConfiguration = require('./ViewConfiguration');

const VIMA_BASE_VERSION = '2.0';

const program = require('commander');

program
  .version('0.0.1')
  .option('-i, --info <inputFile>', 'Get information about <inputFile>')
  .option('-c, --check <inputFile>', 'Check if <inputFile> is a valid VIMA view configuration')
  .option('-m, --migrate <inputFile>', 'Migrate <inputFile> to the specified version')
  .parse(process.argv);

if (program.info) {
  const { version, type } = ViewConfiguration.fromFile(program.info).info;
  process.stdout.write(
    `The file '${program.info}' is a ${type} configuration file for VIMA ${version}\n`
  );
}

if (program.check) {
  const getVersion = viewConfiguration =>
    viewConfiguration.version || VIMA_BASE_VERSION;

  const toValidate = ViewConfiguration.fromFile(program.check);
  const version = getVersion(toValidate);
  const validator = new Validator(version);

  const validation = validator.validate(toValidate);

  if (!validation.isValid) {
    process.stderr.write(
      `${program.check} is NOT a valid ${toValidate.type} configuration file.\n${validation.errors}\n`
    );
  }
}

if (program.migrate) {
  const migrationManager = new MigrationManager('2.0');
  const toMigrate = ViewConfiguration.fromFile(program.migrate);
  process.stdout.write(migrationManager.migrate(toMigrate).toString());
}
