// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Add createInterval function in common/utils/interval
// VERSION : 1.1.2 : DM : #6700 : 28/06/2017 : Change interval signature in common/utils/interval
// VERSION : 1.1.2 : FA : #7145 : 02/08/2017 : Compute delta time in createInterval utils
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

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
