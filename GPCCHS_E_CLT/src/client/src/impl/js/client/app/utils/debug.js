// specific management of renderer env
if (!process.env.DEBUG && global.env.DEBUG) {
  process.env.DEBUG = global.env.DEBUG;
}

const d = require('debug');

const ERROR = 'ERROR';
const INFO = 'INFO';
const DEBUG = 'DEBUG';
const VERBOSE = 'VERBOSE';

module.exports = namespace => {
  const logger = d(`GPCCHS:${namespace}`);
  const level = process.env.LEVEL || global.env.LEVEL;

  return {
    error: (...args) => {
      if ([VERBOSE, DEBUG, INFO, ERROR].indexOf(level) !== -1) {
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
