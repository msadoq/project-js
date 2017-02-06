import {
  HSC_RENDERER_WARNING,
} from 'common/constants';

import {
  addSlowRenderer,
  removeSlowRenderer,
} from '../../store/actions/health';

const CHECK_INTERVAL = 500;

export default ({ store, windowId }) => {
  const previous = {};

  function checkHighCPULoad() {
    const interval = Date.now() - (previous.interval || Date.now());
    const diff = interval - CHECK_INTERVAL;

    if (diff > HSC_RENDERER_WARNING && previous.diff <= HSC_RENDERER_WARNING) {
      store.dispatch(addSlowRenderer(windowId, diff));
    } else if (diff < HSC_RENDERER_WARNING && previous.diff >= HSC_RENDERER_WARNING) {
      store.dispatch(removeSlowRenderer(windowId));
    }

    previous.diff = diff;

    previous.interval = Date.now();
    setTimeout(checkHighCPULoad, CHECK_INTERVAL);
  }

  checkHighCPULoad();
};
