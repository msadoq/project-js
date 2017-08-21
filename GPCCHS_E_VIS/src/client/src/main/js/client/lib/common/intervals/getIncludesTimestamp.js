const _isArray = require('lodash/isArray');

/**
 * Check if any of the intervals from an array is including a timestamp
 * Stop at first found
 *
 * @param intervals [[number, number]]
 * @param timestamp number
 * @return Object { isInInterval, intervalFound }
 */
module.exports = (intervals, timestamp) => {
  if (!_isArray(intervals) || intervals.length === 0) {
    return {
      isInInterval: false,
      interval: [],
    };
  }
  if (_isArray(intervals[0])) {
    for (let i = 0; i < intervals.length; i += 1) {
      if (timestamp >= intervals[i][0] && timestamp <= intervals[i][1]) {
        return {
          isInInterval: true,
          interval: [intervals[i][0], timestamp],
        };
      }
    }
    return {
      isInInterval: false,
      interval: [],
    };
  }
  const isInInterval = (timestamp >= intervals[0] && timestamp <= intervals[1]);
  return {
    isInInterval,
    interval: isInInterval ? [intervals[0], timestamp] : [],
  };
};
