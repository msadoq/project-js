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
  // return [lower, current];
  return [0, current];
}

export function retrieveNeededIntervals(knownInterval, interval) {
  return (!knownInterval || knownInterval[0] !== interval[0] || knownInterval[1] !== interval[1])
    ? [interval]
    : [];
}
