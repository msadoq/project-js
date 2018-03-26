/* eslint-disable import/no-dynamic-require,global-require */

const fs = require('fs');
const Migration = require('./Migration');


class MigrationManager {
  constructor(version) {
    this.version = version;
  }

  migrate(viewConfiguration) {
    const migrationsPath = `${__dirname}/v${this.version}`;

    if (!fs.lstatSync(migrationsPath).isDirectory) {
      throw new Error(`There are no migration files for this version: ${this.version}`);
    }

    const migrations = require(migrationsPath);

    let currentState = viewConfiguration;

    Object.entries(migrations).forEach((migrationEntry) => {
      const migrationConfig = migrationEntry[1];
      const migration = new Migration(migrationConfig);

      currentState = migration.migrate(currentState);
    });

    return currentState;
  }
}

module.exports = MigrationManager;
