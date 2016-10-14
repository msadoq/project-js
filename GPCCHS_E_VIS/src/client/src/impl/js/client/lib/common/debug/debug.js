const ERROR = 'ERROR';
const WARN = 'WARN';
const INFO = 'INFO';
const DEBUG = 'DEBUG';
const VERBOSE = 'VERBOSE';

module.exports = debug => (namespace) => {
  const logger = debug(`GPCCHS:${namespace}`);
  let level = process.env.LEVEL;
  if (!level && global.env && global.env.LEVEL) {
    level = global.env.LEVEL;
  }

  return {
    error: (...args) => {
      if ([VERBOSE, DEBUG, INFO, ERROR].indexOf(level) !== -1) {
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
