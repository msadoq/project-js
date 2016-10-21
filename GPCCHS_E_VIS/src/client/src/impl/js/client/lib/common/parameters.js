const _each = require('lodash/each');
const _get = require('lodash/get');
const minimist = require('minimist');

/**
 * An helper singletoned module to get configuration from dotenv in development and from command
 * line in production environment.
 */

const configuration = {
  PORT: null,
  HSS: null,
  DEBUG: null,
  LEVEL: null,
  FMD_ROOT: null,
  HOT: null,
  OPEN: null,
};

if (process.env && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv-safe').load();

  _each(configuration, (v, key) => {
    configuration[key] = _get(process, ['env', key]);
  });
} else {
  try {
    const argv = minimist(process.argv);
    _each(configuration, (v, key) => {
      configuration[key] = argv[key];
    });
  } catch (e) {
 /* empty */
  }
}

module.exports = configuration;
