// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

const _sortedLastIndexBy = require('lodash/sortedLastIndexBy');
const _slice = require('lodash/slice');
const _reduce = require('lodash/reduce');
const _isArray = require('lodash/isArray');

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

/**
 * Remove some intervals from an array of interval
 * Keep slices of intervals not removed
 *
 * @param knownIntervals [[number, number]]
 * @param intervals [[number, number]]
 * @return array [[number, number]]
 */
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
