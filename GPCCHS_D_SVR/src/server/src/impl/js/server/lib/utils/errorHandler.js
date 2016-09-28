const debug = require('../io/debug')('utils:errorHandler');

module.exports = (name, func) => {
  try {
    const start = process.hrtime();
    func();
    const stop = process.hrtime(start);
    debug.debug(`${name} execution time`, stop);
  } catch (e) {
    debug.error(e);
  }
};
