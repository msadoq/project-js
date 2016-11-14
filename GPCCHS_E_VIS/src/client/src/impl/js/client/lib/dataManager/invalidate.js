import globalConstants from 'common/constants';
import profiling from '../common/debug/profiling';
import debug from '../common/debug/mainDebug';
import { removeRequests } from '../store/actions/dataRequests';
import { updateCacheInvalidation } from '../store/actions/hsc';
import expiratedRemoteIds from './map/expiratedRemoteIds';
import { getWebsocket } from '../mainProcess/websocket';

const logger = debug('data:invalidate');

export default function invalidate(state, dispatch, dataMap) {
  logger.verbose('begin');

  const start = profiling.start();

  // schedule next run
  dispatch(updateCacheInvalidation(Date.now()));

  // compute expired data map
  const expiredRequests = expiratedRemoteIds(state, dataMap);
  if (Object.keys(expiredRequests).length) {
    // HSS update
    getWebsocket().write({
      event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
      payload: expiredRequests,
    });

    // store update
    dispatch(removeRequests(expiredRequests));
  }

  profiling.stop(
    start,
    `dataInvalidate done (${Object.keys(expiredRequests).length} requests)`
  );
}