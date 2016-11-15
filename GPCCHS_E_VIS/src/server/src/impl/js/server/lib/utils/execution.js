// eslint-disable-next-line no-underscore-dangle
const _each = require('lodash/each');
// eslint-disable-next-line no-underscore-dangle
const _round = require('lodash/round');
// eslint-disable-next-line no-underscore-dangle
const _reduce = require('lodash/reduce');
// eslint-disable-next-line no-underscore-dangle
const _noop = require('lodash/noop');

const debug = require('../io/debug');

function start(executionMap, key) {
  if (!executionMap[key]) {
    // eslint-disable-next-line no-param-reassign
    executionMap[key] = [];
  }
  executionMap[key].push(process.hrtime());
}
function stop(executionMap, key) {
  const lastIndex = executionMap[key].length - 1;
  // eslint-disable-next-line no-param-reassign
  executionMap[key][lastIndex] = process.hrtime(executionMap[key][lastIndex]);
}
function print(executionMap, namespace) {
  const display = debug(`profiling:${namespace}`).warn;
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

const noOp = {
  reset: _noop,
  start: _noop,
  stop: _noop,
  print: _noop,
};

module.exports = function init(namespace) {
  if (process.env.PROFILING !== 'on') {
    return noOp;
  }

  let executionMap = {};

  return {
    reset: () => (executionMap = {}),
    start: key => start(executionMap, key),
    stop: key => stop(executionMap, key),
    print: () => print(executionMap, namespace),
  };
};
