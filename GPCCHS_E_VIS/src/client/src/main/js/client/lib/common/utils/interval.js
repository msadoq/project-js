const createInterval = (f, ms) => {
  let id;
  const clear = () => clearTimeout(id);
  let timer = (cb) => {
    const tick = Date.now();
    id = setTimeout(() => {
      const delta = Date.now() - tick;
      cb(delta);
      timer(cb);
    }, ms);
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
