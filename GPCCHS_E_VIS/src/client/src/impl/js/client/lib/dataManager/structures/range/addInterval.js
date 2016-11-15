import mergeInterval from 'common/intervals/merge';

export default function addInterval(knownIntervals, interval) {
  return mergeInterval(knownIntervals, interval);
}
