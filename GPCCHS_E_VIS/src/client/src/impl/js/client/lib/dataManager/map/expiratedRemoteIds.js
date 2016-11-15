import _each from 'lodash/each';
import _get from 'lodash/get';

import removeIntervals from 'common/intervals/remove';

import profiling from '../../common/debug/profiling';

const getExpiredRequests = (dataMap, dataRequests) => {
  const start = profiling.start();
  const expiredRequests = {};
  // get requested remoteIds
  _each(dataRequests, (intervals, remoteId) => {
    let expiredIntervals = intervals;
    // get visible localIds for this remoteId if any
    const localIds = _get(dataMap, [remoteId, 'localIds']);
    _each(localIds, (localValue) => {
      // extract visible interval from expired intervals
      const expectedInterval = localValue.expectedInterval;
      // TODO getLast optimize .remove code to only remove exact matching interval if getLast cd
      expiredIntervals = removeIntervals(expiredIntervals, expectedInterval);
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
  return getExpiredRequests(dataMap, _get(state, 'dataRequests', {}));
}
