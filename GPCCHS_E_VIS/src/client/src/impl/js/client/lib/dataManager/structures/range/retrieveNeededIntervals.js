import intervalManager from 'common/intervals';

export default function retrieveNeededIntervals(knownInterval, interval) {
  return (knownInterval)
    ? intervalManager.missing([knownInterval], interval)
    : [interval];
}
