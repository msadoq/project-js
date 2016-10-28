const {
  sortedLastIndexBy: _sortedLastIndexBy,
  sortedIndexBy: _sortedIndexBy,
  slice: _slice,
  reduce: _reduce,
  isArray: _isArray,
} = require('lodash');

/**
 * Remove an interval from an array of interval
 *
 * @param knownIntervals [[number, number]]
 * @param interval [number, number]
 * @return array [[number, number]]
 */
function remove(knownIntervals, interval) {
  const lower = _sortedLastIndexBy(knownIntervals, interval, i => i[0]);
  const upper = _sortedLastIndexBy(knownIntervals, interval, i => i[1]);

  // outside lower
  if (lower === 0) {
    // no knownIntervals or outside upper
    if (knownIntervals.length === 0 || knownIntervals.length === upper) {
      return [];
    }
    // completely lower
    if (interval[1] < knownIntervals[0][0]) {
      return knownIntervals;
    }
    // high in interval
    return [
      [interval[1], knownIntervals[upper][1]],
      ..._slice(knownIntervals, upper + 1),
    ];
  }

  // equal to low limit
  if (interval[0] === knownIntervals[lower - 1][0]) {
    // and lower than high limit
    if (interval[1] < knownIntervals[lower - 1][1]) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        [interval[1], knownIntervals[lower - 1][1]],
        ..._slice(knownIntervals, upper + 1),
      ];
    }
    // and equal or upper to low limit
    return [
      ..._slice(knownIntervals, 0, lower - 1),
      ..._slice(knownIntervals, upper),
    ];
  }

  // lower than high limit
  if (interval[0] < knownIntervals[lower - 1][1]) {
    // and lower than high limit
    if (interval[1] < knownIntervals[lower - 1][1]) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[0]],
        [interval[1], knownIntervals[lower - 1][1]],
        ..._slice(knownIntervals, upper + 1),
      ];
    }
    // and equal to low limit
    if (interval[1] === knownIntervals[lower - 1][1]) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[0]],
        ..._slice(knownIntervals, upper),
      ];
    }
    // and outside upper
    if (knownIntervals.length === upper) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[0]],
      ];
    }
    // and between intervals
    return [
      ..._slice(knownIntervals, 0, lower - 1),
      [knownIntervals[lower - 1][0], interval[0]],
      ..._slice(knownIntervals, upper),
    ];
  }

  // outside upper
  if (knownIntervals.length === upper) {
    return knownIntervals;
  }

  // upper or equal than high limit and in intervals
  if (interval[1] < knownIntervals[upper][0]) {
    return [
      [knownIntervals[lower - 1][0], knownIntervals[lower - 1][1]],
      ..._slice(knownIntervals, upper),
    ];
  }

  // upper or equal than high limit and between intervals
  return [
    [knownIntervals[lower - 1][0], knownIntervals[lower - 1][1]],
    [interval[1], knownIntervals[upper][1]],
    ..._slice(knownIntervals, upper + 1),
  ];
}

module.exports = (knownIntervals, intervals) => {
  if (!_isArray(knownIntervals) || !_isArray(intervals) || intervals.length === 0) {
    return knownIntervals;
  }
  if (_isArray(intervals[0])) {
    return _reduce(
      intervals,
      (removed, interval) => remove(removed, interval),
      knownIntervals
    );
  }
  return remove(knownIntervals, intervals);
};