const d = require('debug');

module.exports = (namespace) => {
  const logger = d(`gpcchs_d_svr:server:${namespace}`);
  return {
      info: (...args) => {
          if (['VERBOSE', 'DEBUG', 'INFO'].indexOf(process.env.LEVEL) !== -1) {
              logger(...args);
          }
      },
      debug: (...args) => {
          if (['VERBOSE', 'DEBUG'].indexOf(process.env.LEVEL) !== -1) {
              logger(...args);
          }
      },
      verbose: (...args) => {
          if (['VERBOSE'].indexOf(process.env.LEVEL) !== -1) {
              logger(...args);
          }
      },
  };
};
