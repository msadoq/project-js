const { sortedLastIndexBy, sortedIndexBy, slice } = require('lodash');

/**
 * Extract an interval from an array of interval
 *
 * @param knownIntervals [[number, number]]
 * @param interval [number, number]
 * @return array [[number, number]]
 */
module.exports = function extractInterval(knownIntervals, interval) {
  if (knownIntervals.length === 0) {
    return [];
  }
  const lower = sortedLastIndexBy(knownIntervals, interval, i => i[0]);
  const upper = sortedIndexBy(knownIntervals, interval, i => i[1]);

  if (lower === 0) {
    return [];
  }

  // higher than low limit
  if (interval[0] > knownIntervals[lower - 1][0]) {
    // and lower than high limit
    if (interval[1] < knownIntervals[lower - 1][1]) {
      return [
        ...slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[0]],
        [interval[1], knownIntervals[lower - 1][1]],
        ...slice(knownIntervals, upper + 1),
      ];
    }
    // and equal to low limit
    return [
      ...slice(knownIntervals, 0, lower - 1),
      [knownIntervals[lower - 1][0], interval[0]],
      ...slice(knownIntervals, upper + 1),
    ];
  }
  // equal to low limit and lower than high limit
  if (interval[1] < knownIntervals[lower - 1][1]) {
    return [
      ...slice(knownIntervals, 0, lower - 1),
      [interval[1], knownIntervals[lower - 1][1]],
      ...slice(knownIntervals, upper + 1),
    ];
  }
  // whole interval
  return [
    ...slice(knownIntervals, 0, lower - 1),
    ...slice(knownIntervals, upper + 1),
  ];
}
