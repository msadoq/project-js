const { round: _round } = require('lodash');
const profiling = require('../io/debug')('profiling');

const start = () => process.hrtime();

const stop = (name, startTime) => {
  if (process.env.PROFILING === 'on') {
    let duration = process.hrtime(startTime);
    duration = (duration[0] * 1e3) + _round(duration[1] / 1e6, 6);
    const method = duration >= 50 ? 'warn' : 'verbose'; // warn if > 10 ms
    profiling[method](`${name} execution time ${duration} ms`);
  }
};

module.exports = {
  start,
  stop,
};
