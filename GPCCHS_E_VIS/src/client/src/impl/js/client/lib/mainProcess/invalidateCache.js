import debug from '../common/debug/mainDebug';
import { removeRequests } from '../store/actions/dataRequests';
import expirationsMapGenerator from './data/expirationsMap';
import dataMapGenerator from './data/dataMap';
import { getWebsocket } from '../common/websocket/mainWebsocket';

const logger = debug('mainProcess:invalidateCache');

export default function (store) {
  logger.debug('called');
  const state = store.getState();
  const dataMap = dataMapGenerator(state);
  const expiredRequests = expirationsMapGenerator(state, dataMap);
  if (Object.keys(expiredRequests).length === 0) {
    return;
  }
  getWebsocket().write({ event: 'timebasedQueryInvalidation', payload: expiredRequests });
  store.dispatch(removeRequests(expiredRequests));
}
