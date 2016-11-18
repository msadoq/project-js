import globalConstants from 'common/constants';
import profiling from '../common/debug/profiling';
import debug from '../common/debug/mainDebug';
import { updateCacheInvalidation } from '../store/actions/hsc';
import { getWebsocket } from '../mainProcess/websocket';

const logger = debug('data:invalidate');

export default function invalidate(state, dispatch, dataMap) {
  logger.verbose('begin');

  const start = profiling.start();

  // schedule next run
  dispatch(updateCacheInvalidation(Date.now()));

  getWebsocket().write({
    event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
    payload: dataMap,
  });

  profiling.stop(
    start,
    'dataInvalidate done'
  );
}
