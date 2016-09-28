const d = require('debug');

const ERROR = 'ERROR';
const WARN = 'WARN';
const INFO = 'INFO';
const DEBUG = 'DEBUG';
const VERBOSE = 'VERBOSE';

module.exports = (namespace) => {
  const logger = d(`GPCCHS:${namespace}`);
  return {
    error: (...args) => {
      if ([VERBOSE, DEBUG, INFO, ERROR].indexOf(process.env.LEVEL) !== -1) {
        logger(...args);
      }
    },
    warn: (...args) => {
      if ([VERBOSE, DEBUG, INFO, WARN].indexOf(process.env.LEVEL) !== -1) {
        logger(...args);
      }
    },
    info: (...args) => {
      if ([VERBOSE, DEBUG, INFO, WARN].indexOf(process.env.LEVEL) !== -1) {
        logger(...args);
      }
    },
    debug: (...args) => {
      if ([VERBOSE, DEBUG, WARN].indexOf(process.env.LEVEL) !== -1) {
        logger(...args);
      }
    },
    verbose: (...args) => {
      if ([VERBOSE, WARN].indexOf(process.env.LEVEL) !== -1) {
        logger(...args);
      }
    },
  };
};
