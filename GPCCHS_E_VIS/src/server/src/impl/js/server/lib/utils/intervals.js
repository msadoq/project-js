const debug = require('../io/debug')('utils:intervals');
const _ = require('lodash');

const isTimestampInInterval = (timestamp, interval) =>
  (timestamp >= interval[0] && timestamp <= interval[1]);

const isTimestampInIntervals = (timestamp, intervals) =>
  _.some(intervals, (interval) => {
    debug.debug('checking interval', interval);
    if (isTimestampInInterval(timestamp, interval)) {
      return true;
    }
    return false;
  }
);

const mergeIntervals = (knownIntervals, interval) => {
  // No known intervals
  if (knownIntervals.length === 0) {
    return [interval];
  }

  // Lower than known intervals
  const head = _.head(knownIntervals);
  if (interval[1] < head[0]) {
    return [interval, ...knownIntervals];
  }

  // Greater than known intervals
  const last = _.last(knownIntervals);
  if (interval[0] > last[1]) {
    return [...knownIntervals, interval];
  }

  // Covering all known intervals
  if (interval[0] < head[0] && interval[1] > last[1]) {
    return [interval];
  }

  const lower = _.sortedIndexBy(knownIntervals, interval, i => i[0]);

  // Lower limit lower than known intervals
  if (lower === 0) {
    const upper = _.sortedIndexBy(knownIntervals, interval, i => i[1]);
    // And Upper limit between intervals
    if (interval[1] < knownIntervals[upper][0]) {
      return [
        interval,
        ..._.slice(knownIntervals, upper),
      ];
    }
    // And Upper limit in a known interval
    return [
      [interval[0], knownIntervals[upper][1]],
      ..._.slice(knownIntervals, upper + 1),
    ];
  }

  // Interval in a known interval
  if (interval[1] < knownIntervals[lower - 1][1]) {
    return knownIntervals;
  }


  // Lower limit in a known interval
  if (interval[0] <= knownIntervals[lower - 1][1]) {
    const upper = _.sortedIndexBy(knownIntervals, interval, i => i[1]);

    // And Upper limit upper than known intervals
    if (upper === knownIntervals.length) {
      return [
        ..._.slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[1]],
      ];
    }

    // And Upper limit between known intervals
    if (interval[1] < knownIntervals[upper][0]) {
      return [
        ..._.slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[1]],
        ..._.slice(knownIntervals, upper),
      ];
    }

    // And Upper limit in a known interval
    return [
      ..._.slice(knownIntervals, 0, lower - 1),
      [knownIntervals[lower - 1][0], knownIntervals[upper][1]],
      ..._.slice(knownIntervals, upper + 1),
    ];
  }

  const upper = _.sortedIndexBy(knownIntervals, interval, i => i[1]);

  // Lower limit between known intervals and Upper limit greater than known intervals
  if (upper === knownIntervals.length) {
    return [
      ..._.slice(knownIntervals, 0, lower),
      interval,
    ];
  }

  // Lower and Upper limit both between known intervals
  if (interval[1] < knownIntervals[upper][0]) {
    return [
      ..._.slice(knownIntervals, 0, lower),
      interval,
      ..._.slice(knownIntervals, upper),
    ];
  }

  // Lower limit between known intervals and Upper limit in a known interval
  return [
    ..._.slice(knownIntervals, 0, lower),
    [interval[0], knownIntervals[upper][1]],
    ..._.slice(knownIntervals, upper + 1),
  ];
};

module.exports = {
  isTimestampInInterval,
  isTimestampInIntervals,
  mergeIntervals,
};
