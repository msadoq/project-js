import missingIntervals from 'common/intervals/missing';

export default function retrieveNeededIntervals(knownInterval, interval) {
  return (knownInterval)
    ? missingIntervals([knownInterval], interval)
    : [interval];
}
