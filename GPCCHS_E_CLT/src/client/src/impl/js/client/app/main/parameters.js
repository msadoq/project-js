const _ = require('lodash');
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
  FMD_ROOT: null
};

if (process.env && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv-safe').load();

  _.each(configuration, (v, key) => {
    configuration[key] = _.get(process, ['env', key]);
  });
} else {
  try {
    var argv = minimist(process.argv)
    configuration['PORT'] = argv.PORT;
    configuration['HSS'] = argv.HSS;
    configuration['FMD_ROOT'] = argv.FMD_ROOT;
    configuration['NODE_ENV'] = argv.NODE_ENV;
  } catch (e) {

  }
}

module.exports = configuration;
