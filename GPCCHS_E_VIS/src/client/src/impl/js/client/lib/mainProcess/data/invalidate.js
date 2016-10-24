import { constants as globalConstants } from 'common';
import debug from '../../common/debug/mainDebug';
import { removeRequests } from '../../store/actions/dataRequests';
import expirationsMapGenerator from './map/expirated';
import dataMapGenerator from './map/visible';
import { getWebsocket } from '../../common/websocket/mainWebsocket';
import { setActingOn, setActingOff } from '../storeObserver';

const logger = debug('mainProcess:invalidateCache');

export default function (store) {
  logger.debug('called');
  const state = store.getState();
  const dataMap = dataMapGenerator(state);
  const expiredRequests = expirationsMapGenerator(state, dataMap);
  if (Object.keys(expiredRequests).length === 0) {
    return;
  }
  setActingOn();
  getWebsocket().write({
    event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
    payload: expiredRequests,
  });
  store.dispatch(removeRequests(expiredRequests));
  setActingOff();
}
