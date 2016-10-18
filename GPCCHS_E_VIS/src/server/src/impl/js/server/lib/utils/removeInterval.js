const {
  sortedLastIndexBy: _sortedLastIndexBy,
  sortedIndexBy: _sortedIndexBy,
  slice: _slice,
} = require('lodash');

/**
 * Extract an interval from an array of interval
 *
 * @param knownIntervals [[number, number]]
 * @param interval [number, number]
 * @return array [[number, number]]
 */
module.exports = function removeInterval(knownIntervals, interval) {
  const lower = _sortedLastIndexBy(knownIntervals, interval, i => i[0]);
  const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);

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
    // and equal to low limit
    if (interval[1] === knownIntervals[lower - 1][1]) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        ..._slice(knownIntervals, upper + 1),
      ];
    }
    throw new Error('EQUAL_OFFCASE --- not implemented');
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
        ..._slice(knownIntervals, upper + 1),
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
