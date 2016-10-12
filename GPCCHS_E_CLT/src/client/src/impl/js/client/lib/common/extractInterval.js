const _ = require('lodash');

export default function extractInterval(knownIntervals, interval) {

  const lower = _.sortedLastIndexBy(knownIntervals, interval, i => i[0]);
  const upper = _.sortedIndexBy(knownIntervals, interval, i => i[1]);

  if (interval[0] > knownIntervals[lower - 1][0]) {
    if (interval[1] < knownIntervals[lower - 1][1]) {
      return [
        ..._.slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[0]],
        [interval[1], knownIntervals[lower - 1][1]],
        ..._.slice(knownIntervals, upper + 1),
      ];
    }
    return [
      ..._.slice(knownIntervals, 0, lower - 1),
      [knownIntervals[lower - 1][0], interval[0]],
      ..._.slice(knownIntervals, upper + 1),
    ];
  }

  if (interval[1] < knownIntervals[lower - 1][1]) {
    return [
      ..._.slice(knownIntervals, 0, lower - 1),
      [interval[1], knownIntervals[lower - 1][1]],
      ..._.slice(knownIntervals, upper + 1),
    ];
  }

  return [
    ..._.slice(knownIntervals, 0, lower - 1),
    ..._.slice(knownIntervals, upper + 1),
  ];
}
