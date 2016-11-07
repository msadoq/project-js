const {
  each: _each,
  round: _round,
  reduce: _reduce,
  noop: _noop,
} = require('lodash');

const debug = require('../io/debug');

let executionMap = {};
function reset() {
  executionMap = {};
}
function start(key) {
  if (!executionMap[key]) {
    executionMap[key] = [];
  }
  executionMap[key].push(process.hrtime());
}
function stop(key) {
  const lastIndex = executionMap[key].length - 1;
  executionMap[key][lastIndex] = process.hrtime(executionMap[key][lastIndex]);
}
function print(display) {
  display('= execution map ====================');
  _each(executionMap, (r, k) => {
    let d = 0;
    if (r.length === 1) {
      d = (r[0][0] * 1e3) + _round(r[0][1] / 1e6, 6);
    } else {
      const t = _reduce(r, (total, record) => [total[0] + record[0], total[1] + record[1]], [0, 0]);
      d = (t[0] * 1e3) + _round(t[1] / 1e6, 6);
    }
    display(k, 'ms:', d);
  });
  display('- execution map --------------------');
}

module.exports = function init(namespace) {
  const display = debug(`profiling:${namespace}`).warn;

  return {
    reset: process.env.PROFILING === 'on' ? reset : _noop,
    start: process.env.PROFILING === 'on' ? start : _noop,
    stop: process.env.PROFILING === 'on' ? stop : _noop,
    print: process.env.PROFILING === 'on' ? () => print(display) : _noop,
  };
};
