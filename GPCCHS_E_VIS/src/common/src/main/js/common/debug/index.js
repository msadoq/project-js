/* eslint no-console:0 */

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
      error: (...args) => {
        if ([VERBOSE, DEBUG, INFO, WARN, ERROR].indexOf(level) !== -1) {
          console.error(`[${debugNamespace}]`, ...args);
        }
      },
      warn: (...args) => {
        if ([VERBOSE, DEBUG, INFO, WARN].indexOf(level) !== -1) {
          console.warn(`[${debugNamespace}]`, ...args);
        }
      },
      info: (...args) => {
        if ([VERBOSE, DEBUG, INFO].indexOf(level) !== -1) {
          console.info(`[${debugNamespace}]`, ...args);
        }
      },
      debug: (...args) => {
        if ([VERBOSE, DEBUG].indexOf(level) !== -1) {
          console.log(`[${debugNamespace}]`, ...args);
        }
      },
      verbose: (...args) => {
        if ([VERBOSE].indexOf(level) !== -1) {
          console.log(`[${debugNamespace}]`, ...args);
        }
      },
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
