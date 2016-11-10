import monitoring from 'common/monitoring';

import debug from '../common/debug/mainDebug';
import installExtensions from './installExtensions';
import openWorkspace from './openWorkspace';
import { initStore } from '../store/mainStore';
import storeObserver from './storeObserver';
import { disconnect } from './websocket';
import './menu';

const logger = debug('mainProcess:index');

let storeSubscription = null;

export async function start() {
  monitoring.start();
  logger.info('app start');
  try {
    await installExtensions();

    // redux store
    const store = initStore();
    logger.debug('initial state', store.getState());

    // main process store observer
    storeSubscription = store.subscribe(() => storeObserver(store));

    // read workspace async and on callback connect observers
    openWorkspace(store.dispatch, store.getState);
  } catch (e) {
    logger.error(e);
  }
}

export function stop() {
  logger.info('app stop');
  try {
    disconnect();
    if (storeSubscription) {
      storeSubscription();
    }

    monitoring.stop();
  } catch (e) {
    logger.error(e);
  }
}
