import { each } from 'lodash';

import dataMap from './dataMap';
import extractInterval from '../../common/extractInterval';

const getExpiredRequests = (viewDataMap, dataRequests) => {
  const expiredRequests = {};
  each(viewDataMap, (remoteValue, remoteId) => {
    let expiredIntervals = dataRequests[remoteId];
    each(remoteValue.localIds, (localValue) => {
      const expectedInterval = localValue.expectedInterval;
      expiredIntervals = extractInterval(expiredIntervals, expectedInterval);
    });
    expiredRequests[remoteId] = expiredIntervals;
  });
  return expiredRequests;
};

export default function cacheMap(state) {
  return getExpiredRequests(dataMap(state), state.dataRequests);
}
