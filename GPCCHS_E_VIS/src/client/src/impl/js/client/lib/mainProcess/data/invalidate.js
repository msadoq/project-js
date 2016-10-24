import { constants as globalConstants } from 'common';
import profiling from '../../common/debug/profiling';
import debug from '../../common/debug/mainDebug';
import { removeRequests } from '../../store/actions/dataRequests';
import expirationsMapGenerator from './map/expirated';
import dataMapGenerator from './map/visible';
import { getWebsocket } from '../../common/websocket/mainWebsocket';
import { setActingOn, setActingOff } from '../storeObserver';

const logger = debug('data:invalidate');

export default function invalidated(store) {
  logger.verbose('begin data/invalidated');

  const start = profiling.start();

  const state = store.getState();
  const dataMap = dataMapGenerator(state);
  const expiredRequests = expirationsMapGenerator(state, dataMap);
  if (!Object.keys(expiredRequests).length) {
    return;
  }
  setActingOn();
  getWebsocket().write({
    event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
    payload: expiredRequests,
  });
  store.dispatch(removeRequests(expiredRequests));
  setActingOff();

  profiling.stop(
    start,
    `dataInvalidate done (${Object.keys(expiredRequests).length} requests cleaned)`
  );
}
