// const debug = require('../io/debug')('utils:intervals');
const {
  some: _some,
  isArray: _isArray,
} = require('lodash');

const includesTimestamp = (interval, timestamp) =>
  (timestamp >= interval[0] && timestamp <= interval[1]);

module.exports = (intervals, timestamp) => {
  if (!_isArray(intervals) || intervals.length === 0) {
    return false;
  }
  if (_isArray(intervals[0])) {
    return _some(intervals, (interval) => {
    //  debug.debug('checking interval', interval);
      if (includesTimestamp(interval, timestamp)) {
        return true;
      }
      return false;
    });
  }
  return includesTimestamp(intervals, timestamp);
};
