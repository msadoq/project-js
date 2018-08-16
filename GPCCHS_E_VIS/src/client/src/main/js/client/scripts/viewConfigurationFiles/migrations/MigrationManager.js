/* eslint-disable import/no-dynamic-require,global-require */

const path = require('path');
const fs = require('fs');
const Migration = require('./Migration');


class MigrationManager {
  constructor(version) {
    this.version = version;
    this.executedMigrations = {};
  }

  updateExecutedMigrations(migrationKey) {
    if (!this.executedMigrations[this.version]) {
      this.executedMigrations[this.version] = [];
    }

    this.executedMigrations[this.version].push(migrationKey);
  }

  migrate(viewConfiguration, { inputPath, outputPath, alreadyMigrated }) {
    const migrationsPath = path.join(__dirname, `v${this.version}`);

    if (!fs.lstatSync(migrationsPath).isDirectory) {
      throw new Error(`There are no migration files for this version: ${this.version}`);
    }

    const migrations = require(migrationsPath);

    let currentState = viewConfiguration;

    Object.keys(migrations).forEach((migrationKey) => {
      const migrationName = migrationKey;
      const migrationConfig = migrations[migrationKey];
      const migration = new Migration(migrationConfig);

      if (
        !alreadyMigrated[this.version] ||
        alreadyMigrated[this.version].indexOf(migrationName) === -1
      ) {
        currentState = migration.migrate(currentState, { inputPath, outputPath });
        this.updateExecutedMigrations(migrationKey);
      }
    });

    return currentState;
  }
}

module.exports = MigrationManager;
