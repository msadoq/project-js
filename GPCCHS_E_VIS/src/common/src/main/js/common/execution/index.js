/* eslint no-underscore-dangle:0 */
const _each = require('lodash/each');
const _round = require('lodash/round');
const _reduce = require('lodash/reduce');
const _noop = require('lodash/noop');

const getLogger = require('../log');

function start(executionMap, key) {
  if (!executionMap[key]) {
    // eslint-disable-next-line no-param-reassign
    executionMap[key] = { traces: [] };
  }
  executionMap[key].traces.push(process.hrtime());
}
function stop(executionMap, key, message) {
  const lastIndex = executionMap[key].traces.length - 1;
  // eslint-disable-next-line no-param-reassign
  executionMap[key].traces[lastIndex] = process.hrtime(executionMap[key].traces[lastIndex]);
  if (message) {
    // eslint-disable-next-line no-param-reassign
    executionMap[key].message = message;
  }
}
function print(executionMap, namespace) {
  const display = getLogger(`GPCCHS:profiling:${namespace}`).warn;
  display('= execution map -~=] START [=~-');
  _each(executionMap, ({ traces, message }, k) => {
    let d = 0;
    if (traces.length === 1) {
      d = (traces[0][0] * 1e3) + _round(traces[0][1] / 1e6, 6);
    } else {
      const t = _reduce(
        traces,
        (total, record) => [total[0] + record[0], total[1] + record[1]],
        [0, 0]
      );
      d = (t[0] * 1e3) + _round(t[1] / 1e6, 6);
    }
    const args = [k, 'ms:', d];
    if (message) {
      args.push(message);
    }
    display(...args);
  });
  display('- execution map -~=]  END  [=~-\n');
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
    stop: (key, message) => stop(executionMap, key, message),
    print: () => print(executionMap, namespace),
  };
};
