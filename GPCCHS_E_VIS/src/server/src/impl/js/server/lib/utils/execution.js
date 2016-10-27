const {
  each: _each,
  round: _round,
  reduce: _reduce,
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

module.exports = (namespace) => {
  const display = debug(`profiling:${namespace}`).warn;
  const profilingWrapper = (func) => {
    if (process.env.PROFILING === 'on') {
      func();
    }
  };
  return {
    reset: () => profilingWrapper(reset),
    start: () => profilingWrapper(start),
    stop: () => profilingWrapper(stop),
    print: () => profilingWrapper(() => print(display)),
  };
};
