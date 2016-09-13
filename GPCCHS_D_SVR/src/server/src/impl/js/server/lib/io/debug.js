const d = require('debug');

const ERROR = 'ERROR';
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
    info: (...args) => {
      if ([VERBOSE, DEBUG, INFO].indexOf(process.env.LEVEL) !== -1) {
        logger(...args);
      }
    },
    debug: (...args) => {
      if ([VERBOSE, DEBUG].indexOf(process.env.LEVEL) !== -1) {
        logger(...args);
      }
    },
    verbose: (...args) => {
      if ([VERBOSE].indexOf(process.env.LEVEL) !== -1) {
        logger(...args);
      }
    },
  };
};
