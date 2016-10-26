const {
  each: _each,
  round: _round,
  reduce: _reduce,
} = require('lodash');

const debug = require('../io/debug')('execution');

let executionMap = {};
function reset() {
  executionMap = {};
}
function start(key) {
  if (process.env.MONITORING === 'off') {
    return;
  }
  if (!executionMap[key]) {
    executionMap[key] = [];
  }
  executionMap[key].push(process.hrtime());
}
function stop(key) {
  if (process.env.MONITORING === 'off') {
    return;
  }
  const lastIndex = executionMap[key].length - 1;
  executionMap[key][lastIndex] = process.hrtime(executionMap[key][lastIndex]);
}
function print() {
  if (process.env.MONITORING === 'off') {
    return;
  }
  debug.warn('= execution map ====================');
  _each(executionMap, (r, k) => {
    let d = 0;
    if (r.length === 1) {
      d = (r[0][0] * 1e3) + _round(r[0][1] / 1e6, 6);
    } else {
      const t = _reduce(r, (total, record) => [total[0] + record[0], total[1] + record[1]], [0, 0]);
      d = (t[0] * 1e3) + _round(t[1] / 1e6, 6);
    }
    debug.warn(k, 'ms:', d);
  });
  debug.warn('- execution map --------------------');
}

module.exports = {
  reset,
  start,
  stop,
  print,
};
