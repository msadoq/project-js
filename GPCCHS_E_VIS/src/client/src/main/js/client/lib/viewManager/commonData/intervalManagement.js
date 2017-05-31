import mergeInterval from '../../utils/intervals/merge';
import missingIntervals from '../../utils/intervals/missing';

export function addInterval(knownIntervals, interval) {
  return mergeInterval(knownIntervals, interval);
}

export function retrieveNeededIntervals(knownInterval, interval) {
  return (knownInterval)
    ? missingIntervals([knownInterval], interval)
    : [interval];
}
