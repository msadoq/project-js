import _find from 'lodash/find';

export default function addInterval(knownIntervals, interval) {
  // TODO factorize or replace with existing function (rperrot)
  const existing = _find(knownIntervals, i => i[0] === interval[0] && i[1] === interval[1]);
  if (existing) {
    return knownIntervals;
  }

  return [...knownIntervals, interval];
}
