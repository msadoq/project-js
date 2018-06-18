

const COMMON_MIGRATION_SYMBOL = '*';

class Migration {
  static applyMigrationFunc(configurationFile, migrationFunc) {
    if (migrationFunc) {
      return migrationFunc(configurationFile);
    }

    return configurationFile;
  }

  constructor(migration) {
    this.migration = migration;
  }

  migrate(viewConfiguration) {
    const commonMigrationFunc = this.migration[COMMON_MIGRATION_SYMBOL];
    const migrationFunc = this.migration[viewConfiguration.type];

    return Migration.applyMigrationFunc(
      Migration.applyMigrationFunc(
        viewConfiguration,
        commonMigrationFunc
      ),
      migrationFunc
    );
  }
}

module.exports = Migration;
