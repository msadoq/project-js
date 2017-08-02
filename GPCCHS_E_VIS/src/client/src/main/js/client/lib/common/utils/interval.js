import _ from 'lodash/fp';

const createInterval = (ms, f = _.noop) => {
  let id;
  const clear = () => clearTimeout(id);
  let timer = (cb, delta = 0) => {
    const tick = Date.now();
    id = setTimeout(() => {
      const waitedMs = Date.now() - tick;
      cb(waitedMs);
      timer(cb, Math.max(0, waitedMs - ms));
    }, ms - delta);
  };
  timer(f);
  return {
    pause: clear,
    resume: (cb = f) => {
      clear();
      timer(cb);
    },
    destroy: () => {
      clear();
      timer = () => {};
      id = null;
    },
  };
};

export default createInterval;
