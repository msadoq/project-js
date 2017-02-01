const _some = require('lodash/some');
const _isArray = require('lodash/isArray');

const logger = require('../log')('common:intervals');

const includesTimestamp = (interval, timestamp) =>
  (timestamp >= interval[0] && timestamp <= interval[1]);

/**
 * Check if any of the intervals from an array is including a timestamp
 * Stop at first found
 *
 * @param intervals [[number, number]]
 * @param timestamp number
 * @return boolean
 */
module.exports = (intervals, timestamp) => {
  if (!_isArray(intervals) || intervals.length === 0) {
    return false;
  }
  if (_isArray(intervals[0])) {
    return _some(intervals, (interval) => {
      const isIn = includesTimestamp(interval, timestamp);
      logger.silly('checking interval', interval, timestamp, !!isIn);
      return includesTimestamp(interval, timestamp);
    });
  }
  return includesTimestamp(intervals, timestamp);
};
