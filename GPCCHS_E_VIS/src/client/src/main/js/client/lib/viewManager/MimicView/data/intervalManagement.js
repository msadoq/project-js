// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Separate expectedIntervalsMap by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : remove lower bound type from viewManager
// END-HISTORY
// ====================================================================

import _find from 'lodash/find';

export function addInterval(knownIntervals, interval) {
  // TODO factorize or replace with existing function (rperrot)
  const existing = _find(knownIntervals, i => i[0] === interval[0] && i[1] === interval[1]);
  if (existing) {
    return knownIntervals;
  }

  return [...knownIntervals, interval];
}

export function getExpectedInterval(lower, current) {
  return [lower, current];
}

export function retrieveNeededIntervals(knownInterval, interval) {
  return (!knownInterval || knownInterval[0] !== interval[0] || knownInterval[1] !== interval[1])
    ? [interval]
    : [];
}
