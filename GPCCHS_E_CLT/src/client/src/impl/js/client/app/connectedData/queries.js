import _ from 'lodash';
import missingIntervals from '../utils/intervals';

/**
 * Apply missing interval logic on connectedData and returns a list of query to pass to HSS
 *
 * @param viewId
 * @param connectedDatum
 * @param prevInterval
 * @param nextInterval
 */
export default function queries(viewId, { localId, dataId, offset }, prevInterval, nextInterval) {
  if (!localId) {
    return [];
  }

  const missing = missingIntervals(
    prevInterval ? [prevInterval.lower + offset, prevInterval.upper + offset] : [],
    [nextInterval.lower + offset, nextInterval.upper + offset]
  );

  if (!missing.length) {
    return [];
  }

  return _.map(missing, (interval) => ({
    viewId,
    localId,
    dataId,
    interval,
  }));
}
