import _ from 'lodash';
import minimist from 'minimist';

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
};

if (process.env && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv-safe').load();

  _.each(configuration, (v, key) => {
    configuration[key] = _.get(process, ['env', key]);
  });
} else {
  // TODO : use minimist and set configuration
}

module.exports = configuration;
