import _ from 'lodash/fp';
import { getStressStatus } from '../../store/reducers/health';
import { HEALTH_STATUS_HEALTHY, HEALTH_STATUS_CRITICAL, HEALTH_INTERVAL_DELAY, DEFAULT_HEALTH_CRITICAL_DELAY } from '../../constants';

const MOCK_DELAY_STRESS = 500;
const defaultOptions = {
  criticalDelay: DEFAULT_HEALTH_CRITICAL_DELAY,
  onStatusChange: _.noop,
};
let isStressed = false;
let lastStatus = HEALTH_STATUS_HEALTHY;

/**
 * Convert process.hrtime output in ms
 *
 * @param time
 * @returns {number}
 */
function hrToMs(time) {
  return (time[0] * 1000) + (time[1] / 1e6);
}

/**
 * Create a store observer on stress values
 *
 * @param time
 * @returns {number}
 */
function makeStressObserver(store, id) {
  return function stressStoreObserver() {
    const state = store.getState();
    const stressed = getStressStatus(state);
    isStressed = stressed[id];
  };
}


/**
 * Launch a monitoring interval that measure delay in event loop and call corresponding.
 *
 * Returns a function to cancel the interval.
 *
 * @source: https://github.com/TabDigital/loop-lag
 *
 * @object {object}
 * @returns {Function}
 */
module.exports = (options, store) => {
  const {
    criticalDelay,
    onStatusChange,
    id,
  } = _.defaults(defaultOptions, options);
  store.subscribe(makeStressObserver(store, id));
  let start = process.hrtime();
  let timeout;
  function onInterval() {
    const elapsed = process.hrtime(start);
    let delay = hrToMs(elapsed) - HEALTH_INTERVAL_DELAY;
    if (isStressed) delay += MOCK_DELAY_STRESS;
    let current;
    if (delay >= criticalDelay) {
      current = HEALTH_STATUS_CRITICAL;
    } else {
      current = HEALTH_STATUS_HEALTHY;
    }
    if (current !== lastStatus) {
      lastStatus = current;
      onStatusChange(current);
    }
    start = process.hrtime();

    // schedule next poll
    timeout = setTimeout(onInterval, HEALTH_INTERVAL_DELAY);
  }

  /**
   * Clear the timeout and reset state
   */
  return {
    startMonitoring: () => {
      timeout = setTimeout(onInterval, HEALTH_INTERVAL_DELAY);
    },
    stopMonitoring: () => {
      start = null;
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    },
  };
};
