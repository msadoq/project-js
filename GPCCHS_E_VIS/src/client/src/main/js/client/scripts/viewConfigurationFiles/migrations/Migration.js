const _ = require('lodash/fp');

const COMMON_MIGRATION_SYMBOL = '*';

class Migration {
  static getMigrationFunc(migrationObj) {
    if (typeof migrationObj === 'function') {
      return migrationObj;
    }

    if (typeof migrationObj === 'object' && 'update' in migrationObj) {
      return migrationObj.update;
    }

    return _.identity;
  }

  static getHookFunc(migrationObj) {
    if (typeof migrationObj === 'function') {
      return _.identity;
    }

    if (typeof migrationObj === 'object' && 'hook' in migrationObj) {
      return migrationObj.hook;
    }

    return _.identity;
  }

  constructor(migration) {
    this.migration = migration;
  }

  getMigratedFile(viewConfiguration, options = {}) {
    const commonMigrationFunc =
      Migration.getMigrationFunc(
        this.migration[COMMON_MIGRATION_SYMBOL]
      );

    const migrationFunc = Migration.getMigrationFunc(
      this.migration[viewConfiguration.type]
    );

    return migrationFunc(commonMigrationFunc(viewConfiguration, options), options);
  }

  executeHooks(viewConfiguration, migratedViewConfiguration, options = {}) {
    const commonHookFunc =
      Migration.getHookFunc(
        this.migration[COMMON_MIGRATION_SYMBOL]
      );

    const hookFunc =
      Migration.getHookFunc(
        this.migration[viewConfiguration.type]
      );

    commonHookFunc(
      viewConfiguration,
      migratedViewConfiguration,
      options
    );

    hookFunc(
      viewConfiguration,
      migratedViewConfiguration,
      options
    );
  }

  migrate(viewConfiguration, options = {}) {
    const migratedViewConfiguration =
      this.getMigratedFile(viewConfiguration, options);

    this.executeHooks(viewConfiguration, migratedViewConfiguration, options);

    return migratedViewConfiguration;
  }
}

module.exports = Migration;
