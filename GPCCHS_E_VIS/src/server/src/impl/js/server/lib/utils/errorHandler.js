const { round: _round } = require('lodash');
const debug = require('../io/debug')('utils:errorHandler');
const monitoring = require('../io/debug')('utils:monitoring');

module.exports = (name, thunk) => {
  let start;
  if (process.env.MONITORING === 'on') {
    start = process.hrtime();
  }

  try {
    thunk();
  } catch (e) {
    debug.error(e);
  }

  if (process.env.MONITORING === 'on') {
    let duration = process.hrtime(start);
    duration = (duration[0] * 1e3) + _round(duration[1] / 1e6, 6);
    const method = duration >= 1e2 ? 'error' : 'info';
    monitoring[method](`${name} execution time ${duration} ms`);
  }
};
