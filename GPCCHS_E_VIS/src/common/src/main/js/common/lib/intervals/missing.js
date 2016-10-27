const { some: _some } = require('lodash');

module.exports = (knownIntervals, interval) => {
  const length = knownIntervals.length;
  // No known intervals
  if (!length) {
    // debug.debug('no intervals');
    return [interval];
  }

  // Search missing intervals
  const missingIntervals = [];
  let lower = interval[0];
  const upper = interval[1];
  _some(knownIntervals, (knownInterval, index) => {
    if (lower < knownInterval[0]) {
      // Completety below known interval
      if (upper < knownInterval[0]) {
        missingIntervals.push([lower, upper]);
        return true;
      }

      missingIntervals.push([lower, knownInterval[0]]);

      // Below and inside known interval
      if (upper <= knownInterval[1]) {
        return true;
      }

      // Covering known interval
      if (index === length - 1) {
        // Last one
        missingIntervals.push([knownInterval[1], upper]);
        return true;
      }

      // Next known interval
      lower = knownInterval[1];
      return false;
    }

    if (lower <= knownInterval[1]) {
      // Completety inside known interval
      if (upper <= knownInterval[1]) {
        return true;
      }

      // Inside and above known interval
      if (index === length - 1) {
        // Last one
        missingIntervals.push([knownInterval[1], upper]);
        return true;
      }

      // Next known interval
      lower = knownInterval[1];
      return false;
    }

    // Completely above known interval
    if (index === length - 1) {
      // Last one
      missingIntervals.push(interval);
      return true;
    }

    // Next known interval
    return false;
  });

  return missingIntervals;
};
