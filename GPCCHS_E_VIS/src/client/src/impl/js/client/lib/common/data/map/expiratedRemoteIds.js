import { each, get } from 'lodash';

import intervalManager from 'common/intervals';

import profiling from '../../debug/profiling';

const getExpiredRequests = (dataMap, dataRequests) => {
  const start = profiling.start();
  const expiredRequests = {};
  // get requested remoteIds
  each(dataRequests, (intervals, remoteId) => {
    let expiredIntervals = intervals;
    // get visible localIds for this remoteId if any
    const localIds = get(dataMap, [remoteId, 'localIds']);
    each(localIds, (localValue) => {
      // extract visible interval from expired intervals
      const expectedInterval = localValue.expectedInterval;
      // TODO getLast optimize .remove code to only remove exact matching interval if getLast cd
      expiredIntervals = intervalManager.remove(expiredIntervals, expectedInterval);
    });
    // if some expired intervals, add to invalidation
    if (expiredIntervals.length > 0) {
      expiredRequests[remoteId] = { intervals: expiredIntervals };
    }
  });

  profiling.stop(start, 'expiredRequests');
  return expiredRequests;
};

/**
 * Compute visible and requested intervals to get expired intervals
 *
 * {
 *   'remoteId': [[number, number]],
 * }
 *
 * @param state
 * @param dataMap
 * @return object
 */
export default function expirationsMap(state, dataMap) {
  return getExpiredRequests(dataMap, get(state, 'dataRequests', {}));
}
