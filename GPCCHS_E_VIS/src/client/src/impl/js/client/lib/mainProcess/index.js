import { app } from 'electron';
import getLogger from 'common/log';
import monitoring from 'common/monitoring';
import parameters from 'common/parameters';

import installExtensions from './installExtensions';
import { initStore, getStore } from '../store/mainStore';
import storeObserver from './storeObserver';
import { connect, disconnect } from './websocket';
import './menu';

const logger = getLogger('GPCCHS:mainProcess:index');

let storeSubscription = null;

export async function start() {
  monitoring.start();
  logger.info('app start');
  try {
    await installExtensions();

    // redux store
    const store = initStore();
    logger.verbose('initial state', store.getState());

    // main process store observer
    storeSubscription = store.subscribe(() => storeObserver(store));

    // websocket initial connection
    connect(parameters.get('HSS'));
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

export function onWindowsClose() {
  logger.info('windows close');
  const state = getStore().getState();
  if (!state.hsc.isWorkspaceOpening) {
    app.quit();
  }
}
