import { intervals as intervalManager } from 'common';

export default function retrieveNeededIntervals(knownIntervals, interval) {
  return intervalManager.missing(knownIntervals, interval);
}
