import { intervals as intervalManager } from 'common';

export default function addInterval(knownIntervals, interval) {
  return intervalManager.merge(knownIntervals, interval);
}
