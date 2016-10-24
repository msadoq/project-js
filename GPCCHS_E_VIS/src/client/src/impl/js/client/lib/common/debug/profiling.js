import _round from 'lodash/round';

let index = 0;
const list = {};

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
  const duration = process.hrtime(list[id]);
  const d = (duration[0] * 1e3) + _round(duration[1] / 1e6, 6);
  const method = d >= 50 ? 'log' : 'warn';
  console[method](message, `done in ${d} ms`); // eslint-disable-line no-console
};

const noOp = {
  start: () => {},
  stop: () => {},
};

module.exports = process.env.PROFILING === 'on'
  ? profiling
  : noOp;
