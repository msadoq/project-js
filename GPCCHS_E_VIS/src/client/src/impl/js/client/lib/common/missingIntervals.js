const _ = require('lodash');

export default function missingIntervals(known = [], wanted) {
  const list = [];
  let lower = wanted[0];
  const upper = wanted[1];

  if (!known.length) {
    return [wanted];
  }

  _.some(known, (knownInterval, index) => {
    if (lower < knownInterval[0]) {
      // Completety below known interval
      if (upper < knownInterval[0]) {
        list.push([lower, upper]);
        return true;
      }

      list.push([lower, knownInterval[0]]);

      // Below and inside known interval
      if (upper <= knownInterval[1]) {
        return true;
      }

      // Covering known interval
      if (index === known.length - 1) {
        // Last one
        list.push([knownInterval[1], upper]);
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
      if (index === known.length - 1) {
        // Last one
        list.push([knownInterval[1], upper]);
        return true;
      }

      // Next known interval
      lower = knownInterval[1];
      return false;
    }

    // Completely above known interval
    if (index === known.length - 1) {
      // Last one
      list.push(wanted);
      return true;
    }

    // Next known interval
    return false;
  });

  return list;
}
