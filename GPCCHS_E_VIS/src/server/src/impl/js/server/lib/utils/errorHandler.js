const debug = require('../io/debug')('utils:errorHandler');
const profiling = require('./profiling');

module.exports = (name, thunk, profile = true) => {
  let start;
  if (profile && process.env.PROFILING === 'on') {
    start = profiling.start();
  }

  try {
    thunk();
  } catch (e) {
    debug.error(e);
  }

  if (profile && process.env.PROFILING === 'on') {
    profiling.stop(name, start);
  }
};
