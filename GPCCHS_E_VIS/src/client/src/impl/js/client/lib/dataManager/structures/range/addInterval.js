import intervalManager from 'common/intervals';

export default function addInterval(knownIntervals, interval) {
  return intervalManager.merge(knownIntervals, interval);
}
