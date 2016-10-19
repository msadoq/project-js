const debug = require('../io/debug')('utils:errorHandler');
const monitoring = require('./monitoring');

module.exports = (name, thunk, monitor = true) => {
  let start;
  if (monitor && process.env.MONITORING === 'on') {
    start = monitoring.start();
  }

  try {
    thunk();
  } catch (e) {
    debug.error(e);
  }

  if (monitor && process.env.MONITORING === 'on') {
    monitoring.stop(name, start);
  }
};
