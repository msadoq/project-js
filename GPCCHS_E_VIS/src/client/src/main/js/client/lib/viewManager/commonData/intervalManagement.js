import mergeInterval from '../../common/intervals/merge';
import missingIntervals from '../../common/intervals/missing';

export function addInterval(knownIntervals, interval) { // TODO deprecate, just a proxy for mergeInterval
  return mergeInterval(knownIntervals, interval);
}

export function retrieveNeededIntervals(knownInterval, interval) {
  return (knownInterval)
    ? missingIntervals([knownInterval], interval)
    : [interval];
}
