const debug = require('../io/debug')('utils:intervals');
const { some: _some } = require('lodash');

const isTimestampInInterval = (timestamp, interval) =>
  (timestamp >= interval[0] && timestamp <= interval[1]);

const isTimestampInIntervals = (timestamp, intervals) =>
  _some(intervals, (interval) => {
    debug.debug('checking interval', interval);
    if (isTimestampInInterval(timestamp, interval)) {
      return true;
    }
    return false;
  }
);

module.exports = {
  isTimestampInInterval,
  isTimestampInIntervals,
};
