// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

const _isArray = require('lodash/isArray');
const _reduce = require('lodash/reduce');
const _sortedIndexBy = require('lodash/sortedIndexBy');

const notIncluded = (knownIntervals, interval) => {
  const lower = _sortedIndexBy(knownIntervals, interval, i => i[0]);
  const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);
  if (lower !== upper) {
    return true;
  }
  if (lower >= knownIntervals.length) {
    return true;
  }
  if (knownIntervals[lower][0] !== interval[0] || knownIntervals[lower][1] !== interval[1]) {
    return true;
  }
  return false;
};

/**
 * Return full intervals not included in an array of intervals
 *
 * @param knownIntervals [[number, number]]
 * @param intervals [[number, number]]
 * @return intervals not included [[number, number]]
 */
module.exports = (knownIntervals, intervals) => {
  if (!_isArray(knownIntervals) || !_isArray(intervals) || intervals.length === 0) {
    return knownIntervals;
  }
  if (_isArray(intervals[0])) {
    return _reduce(
      intervals,
      (included, interval) => {
        if (notIncluded(knownIntervals, interval)) {
          included.push(interval);
        }
        return included;
      },
      []
    );
  }
  return (notIncluded(knownIntervals, intervals)) ? [intervals] : [];
};
