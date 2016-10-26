import { constants as globalConstants } from 'common';
import profiling from '../debug/profiling';
import debug from '../debug/mainDebug';
import { removeRequests } from '../../store/actions/dataRequests';
import expiratedRemoteIds from './map/expiratedRemoteIds';
import map from './map/visibleRemoteIds';
import { getWebsocket } from '../websocket/mainWebsocket';

const logger = debug('data:invalidate');

export default function invalidate(store) {
  logger.verbose('begin');

  const start = profiling.start();

  const state = store.getState();
  const dataMap = map(state);
  const expiredRequests = expiratedRemoteIds(state, dataMap);
  if (!Object.keys(expiredRequests).length) {
    return;
  }

  getWebsocket().write({
    event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
    payload: expiredRequests,
  });
  store.dispatch(removeRequests(expiredRequests));

  profiling.stop(
    start,
    `dataInvalidate done (${Object.keys(expiredRequests).length} requests)`
  );
}
