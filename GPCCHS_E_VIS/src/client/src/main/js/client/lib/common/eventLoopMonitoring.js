import _ from 'lodash/fp';
// const globalConstants = require('../constants');
import { HEALTH_STATUS_HEALTHY, HEALTH_STATUS_CRITICAL } from '../constants';
// const POLL_DELAY = 500; // 500ms
// const RESET_POLL_DELAY = 1000 * 10; // 10s
const NUMBER_OF_OCCURENCE = 3; // steps to increase or decrease status

/**
 * Convert process.hrtime output in ms
 *
 * @param time
 * @returns {number}
 */
function hrToMs(time) {
  return (time[0] * 1000) + (time[1] / 1e6);
}

const defaultOptions = {
  intervalDelay: 100,
  criticalDelay: 500,
  onStatusChange: _.noop,
};

function resetLast(status) {
  return {
    status,
    [HEALTH_STATUS_HEALTHY]: 0,
    [HEALTH_STATUS_CRITICAL]: 0,
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
module.exports = (options) => {
  const {
    intervalDelay,
    criticalDelay,
    onStatusChange,
  } = _.defaults(defaultOptions, options);

  // let start = process.hrtime();
  let timeout;
  const last = resetLast(HEALTH_STATUS_HEALTHY);
  function onInterval() {
    // const elapsed = process.hrtime(start);
    // const delay = hrToMs(elapsed) - intervalDelay;
    const mockedDelay = Math.abs(Math.cos(hrToMs(process.hrtime())) * 1000);
    let current;
    if (mockedDelay >= criticalDelay) {
      current = HEALTH_STATUS_CRITICAL;
    } else {
      current = HEALTH_STATUS_HEALTHY;
    }
    // set internal counter
    last[current] += 1;
    // trigger status change handler
    if (last[current] === NUMBER_OF_OCCURENCE) {
      if (last.status !== current) {
        onStatusChange(current);
        last.status = current;
      }
      last[HEALTH_STATUS_HEALTHY] = 0;
      last[HEALTH_STATUS_CRITICAL] = 0;
    }

    // check for current delay

    // after 5 occurences > to a step go to this step

    // set the current status for next poll

    // if (delay >= HSC_RENDERER_CRITICAL_STEP && this.currentStatus !== HEALTH_STATUS_CRITICAL) {
    //   this.currentStatus = HEALTH_STATUS_CRITICAL;
    //   update(windowId, HEALTH_STATUS_CRITICAL);
    // } else if (delay >= HSC_RENDERER_WARNING_STEP && this.currentStatus !== HEALTH_STATUS_WARNING) {
    //   this.currentStatus = HEALTH_STATUS_WARNING;
    //   update(windowId, HEALTH_STATUS_WARNING);
    // } else if (this.currentStatus !== HEALTH_STATUS_HEALTHY) {
    //   this.currentStatus = HEALTH_STATUS_HEALTHY;
    //   update(windowId, HEALTH_STATUS_HEALTHY);
    // }

    // set the current time for next poll
    // start = process.hrtime();

    // schedule next poll
    timeout = setTimeout(onInterval, intervalDelay);
  }

  /**
   * Clear the timeout and reset state
   */
  return {
    startMonitoring: () => {
      timeout = setTimeout(onInterval, intervalDelay);
    },
    stopMonitoring: () => {
      // start = null;
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    },
  };
};
