const {
  isArray: _isArray,
  reduce: _reduce,
  sortedIndexBy: _sortedIndexBy,
} = require('lodash');

const includes = (knownIntervals, interval) => {
  const lower = _sortedIndexBy(knownIntervals, interval, i => i[0]);
  const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);
  if (lower !== upper) {
    return false;
  }
  if (lower >= knownIntervals.length) {
    return false;
  }
  if (knownIntervals[lower][0] !== interval[0] || knownIntervals[lower][1] !== interval[1]) {
    return false;
  }
  return true;
};

module.exports = (knownIntervals, intervals) => {
  if (!_isArray(knownIntervals) || !_isArray(intervals) || intervals.length === 0) {
    return knownIntervals;
  }
  if (_isArray(intervals[0])) {
    return _reduce(
      intervals,
      (included, interval) => {
        if (includes(knownIntervals, interval)) {
          included.push(interval);
        }
        return included;
      },
      []
    );
  }
  return includes(knownIntervals, intervals);
};
