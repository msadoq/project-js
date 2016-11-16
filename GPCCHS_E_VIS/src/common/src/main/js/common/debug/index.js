/* eslint no-console:0 */
// eslint-disable-next-line no-underscore-dangle
const _noop = require('lodash/noop');

const ERROR = 'ERROR';
const WARN = 'WARN';
const INFO = 'INFO';
const DEBUG = 'DEBUG';
const VERBOSE = 'VERBOSE';

module.exports = debug => (namespace) => {
  const debugNamespace = `GPCCHS:${namespace}`;
  const logger = debug(debugNamespace);
  let level = process.env.LEVEL;
  if (!level && global.env && global.env.LEVEL) {
    level = global.env.LEVEL;
  } else if (!level) {
    level = ERROR;
  }
  if (process.env.NODE_ENV === 'production') {
    return {
      error: (...args) => console.error(`[${debugNamespace}]`, ...args),
      warn: (...args) => console.warn(`[${debugNamespace}]`, ...args),
      info: (...args) => console.log(`[${debugNamespace}]`, ...args),
      debug: () => _noop(),
      verbose: () => _noop(),
    };
  }

  return {
    error: (...args) => {
      if ([VERBOSE, DEBUG, INFO, WARN, ERROR].indexOf(level) !== -1) {
        logger(...args);
      }
    },
    warn: (...args) => {
      if ([VERBOSE, DEBUG, INFO, WARN].indexOf(level) !== -1) {
        logger(...args);
      }
    },
    info: (...args) => {
      if ([VERBOSE, DEBUG, INFO].indexOf(level) !== -1) {
        logger(...args);
      }
    },
    debug: (...args) => {
      if ([VERBOSE, DEBUG].indexOf(level) !== -1) {
        logger(...args);
      }
    },
    verbose: (...args) => {
      if ([VERBOSE].indexOf(level) !== -1) {
        logger(...args);
      }
    },
  };
};
