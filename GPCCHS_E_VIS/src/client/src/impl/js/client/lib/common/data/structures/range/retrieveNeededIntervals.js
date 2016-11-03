import { intervals as intervalManager } from 'common';

export default function retrieveNeededIntervals(knownInterval, interval) {
  return (knownInterval)
    ? intervalManager.missing([knownInterval], interval)
    : [interval];
}
