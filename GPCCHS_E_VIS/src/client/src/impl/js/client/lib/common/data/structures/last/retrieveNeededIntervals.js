import { intervals as intervalManager } from 'common';

export default function retrieveNeededIntervals(knownIntervals, interval) {
  return (intervalManager.includes(knownIntervals, interval)) ? [] : [interval];
}
