/* eslint-disable no-unused-vars */
const fs = require('fs');
const merge = require('deepmerge');

const VIMA_BASE_VERSION = require('../constants').VIMA_BASE_VERSION;

const ViewConfiguration = require('../models/ViewConfiguration');
const MigrationManager = require('../migrations/MigrationManager');

const getAlreadyAppliedMigrations = (lockFile) => {
  let alreadyMigrated = [];
  let lockFileExists = false;

  try {
    lockFileExists = fs.lstatSync(lockFile).isFile();
  } catch (error) {
    // do nothing
  }

  if (lockFileExists) {
    alreadyMigrated = JSON.parse(fs.readFileSync(lockFile, 'utf8'));
  }

  return alreadyMigrated;
};

const saveNewMigrations = (lockFile, newMigrations) => {
  const alreadyMigrated = getAlreadyAppliedMigrations(lockFile);
  const allAppliedMigrations = merge(alreadyMigrated, newMigrations);
  fs.writeFileSync(
    lockFile,
    JSON.stringify(allAppliedMigrations, null, 2),
    'utf8'
  );
};

module.exports = (target, { inputPath, outputPath, lockPath }) => {
  const targetVersion = target || VIMA_BASE_VERSION;
  const migrationManager = new MigrationManager(targetVersion);
  const toMigrate = ViewConfiguration.fromFile(inputPath);
  const alreadyMigrated = getAlreadyAppliedMigrations(lockPath);
  const migratedViewConfiguration =
    migrationManager.migrate(
      toMigrate,
      {
        alreadyMigrated,
        inputPath,
        outputPath,
      }
    );
  const outputContent = migratedViewConfiguration.toString();

  if (lockPath) {
    saveNewMigrations(lockPath, migrationManager.executedMigrations);
  }

  if (outputPath) {
    fs.writeFileSync(outputPath, outputContent, 'utf8');
  } else {
    process.stdout.write(outputContent);
  }
};
