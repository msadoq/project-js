import _round from 'lodash/round';
import _omit from 'lodash/omit';

let index = 0;
let list = {};

function getNewId() {
  index += 1;
  return index;
}

const profiling = {};

profiling.start = () => {
  const id = getNewId();
  list[id] = process.hrtime();
  return id;
};

profiling.stop = (id, message) => {
  if (message === false) {
    list = _omit(list, [id]);
    return;
  }

  const duration = process.hrtime(list[id]);
  const d = (duration[0] * 1e3) + _round(duration[1] / 1e6, 6);
  const method = d >= 50 ? 'log' : 'warn';
  console[method](message, `done in ${d} ms`); // eslint-disable-line no-console
};

const noOp = {
  start: () => {},
  stop: () => {},
};

const isOn = process.env.PROFILING === 'on'
  || (global && global.env && global.env.PROFILING === 'on');

module.exports = isOn ? profiling : noOp;
