// const debug = require('../io/debug')('utils:mergeIntervals');
const {
   head: _head,
   last: _last,
   sortedIndexBy: _sortedIndexBy,
   slice: _slice,
   reduce: _reduce,
   isArray: _isArray,
 } = require('lodash');

const merge = (knownIntervals, interval) => {
  if (interval.length !== 2) {
    return knownIntervals;
  }
  // No known intervals
  if (knownIntervals.length === 0) {
    return [interval];
  }

  // Lower than known intervals
  const head = _head(knownIntervals);
  if (interval[1] < head[0]) {
    return [interval, ...knownIntervals];
  }

  // Greater than known intervals
  const last = _last(knownIntervals);
  if (interval[0] > last[1]) {
    return [...knownIntervals, interval];
  }

  // Covering all known intervals
  if (interval[0] < head[0] && interval[1] > last[1]) {
    return [interval];
  }

  const lower = _sortedIndexBy(knownIntervals, interval, i => i[0]);

  // Lower limit lower than known intervals
  if (lower === 0) {
    const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);
    // And Upper limit between intervals
    if (interval[1] < knownIntervals[upper][0]) {
      return [
        interval,
        ..._slice(knownIntervals, upper),
      ];
    }
    // And Upper limit in a known interval
    return [
      [interval[0], knownIntervals[upper][1]],
      ..._slice(knownIntervals, upper + 1),
    ];
  }

  // Interval in a known interval
  if (interval[1] < knownIntervals[lower - 1][1]) {
    return knownIntervals;
  }


  // Lower limit in a known interval
  if (interval[0] <= knownIntervals[lower - 1][1]) {
    const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);

    // And Upper limit upper than known intervals
    if (upper === knownIntervals.length) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[1]],
      ];
    }

    // And Upper limit between known intervals
    if (interval[1] < knownIntervals[upper][0]) {
      return [
        ..._slice(knownIntervals, 0, lower - 1),
        [knownIntervals[lower - 1][0], interval[1]],
        ..._slice(knownIntervals, upper),
      ];
    }

    // And Upper limit in a known interval
    return [
      ..._slice(knownIntervals, 0, lower - 1),
      [knownIntervals[lower - 1][0], knownIntervals[upper][1]],
      ..._slice(knownIntervals, upper + 1),
    ];
  }

  const upper = _sortedIndexBy(knownIntervals, interval, i => i[1]);

  // Lower limit between known intervals and Upper limit greater than known intervals
  if (upper === knownIntervals.length) {
    return [
      ..._slice(knownIntervals, 0, lower),
      interval,
    ];
  }

  // Lower and Upper limit both between known intervals
  if (interval[1] < knownIntervals[upper][0]) {
    return [
      ..._slice(knownIntervals, 0, lower),
      interval,
      ..._slice(knownIntervals, upper),
    ];
  }

  // Lower limit between known intervals and Upper limit in a known interval
  return [
    ..._slice(knownIntervals, 0, lower),
    [interval[0], knownIntervals[upper][1]],
    ..._slice(knownIntervals, upper + 1),
  ];
};

module.exports = (knownIntervals, intervals) => {
  if (!_isArray(knownIntervals) || !_isArray(intervals) || intervals.length === 0) {
    return knownIntervals;
  }
  if (_isArray(intervals[0])) {
    return _reduce(
      intervals,
      (merged, interval) => merge(merged, interval),
      knownIntervals
    );
  }
  return merge(knownIntervals, intervals);
};
