import mergeInterval from 'common/intervals/merge';
import missingIntervals from 'common/intervals/missing';

export function addInterval(knownIntervals, interval) {
  return mergeInterval(knownIntervals, interval);
}

export function getExpectedInterval(lower, current, upper) {
  return [lower, upper];
}


export function retrieveNeededIntervals(knownInterval, interval) {
  return (knownInterval)
    ? missingIntervals([knownInterval], interval)
    : [interval];
}
