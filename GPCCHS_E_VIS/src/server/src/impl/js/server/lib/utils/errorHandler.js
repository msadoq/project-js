const logger = require('common/log')('utils:errorHandler');
const profiling = require('./profiling');

module.exports = (name, thunk, profile = true) => {
  let start;
  if (profile && process.env.PROFILING === 'on') {
    start = profiling.start();
  }

  try {
    thunk();
  } catch (e) {
    logger.error(e);
  }

  if (profile && process.env.PROFILING === 'on') {
    profiling.stop(name, start);
  }
};
