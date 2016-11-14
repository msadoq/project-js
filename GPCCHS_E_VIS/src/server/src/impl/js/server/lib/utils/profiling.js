// eslint-disable-next-line no-underscore-dangle
const _round = require('lodash/round');

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
