import { monitoring } from 'common';
import parameters from '../common/parameters';
import debug from '../common/debug/mainDebug';
import installExtensions from './installExtensions';
import openWorkspace from './openWorkspace';
import { initStore } from '../store/mainStore';
import storeObserver from './storeObserver';
import { connect, disconnect } from '../common/websocket/mainWebsocket';
import { schedule, clear } from './pull';
import './menu';

const logger = debug('mainProcess:index');

let storeSubscription = null;

export async function start() {
  monitoring.start();
  logger.info('app start');
  try {
    await installExtensions();
    const store = initStore();
    logger.debug('initial state', store.getState());

    // TODO : read file path in params => file picker

    // read workspace async and on callback connect observers
    openWorkspace(parameters.FMD_ROOT, parameters.OPEN, store.dispatch, (err) => {
      if (err) {
        logger.error(err);
        throw new Error('display file picker'); // TODO : file picker
      }

      const state = store.getState();
      const count = {
        w: Object.keys(state.windows).length,
        p: Object.keys(state.pages).length,
        v: Object.keys(state.views).length,
      };
      logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);

      // main process store observer
      storeSubscription = store.subscribe(() => storeObserver(store));

      // open websocket connection
      connect();

      // TODO BE SET ONLY WHEN APP IS STARTED (windows opened) OR ON SERVER RECONNECTION
      // pull data from HSS
      schedule();
      // TODO BE SET ONLY WHEN APP IS STARTED (windows opened) OR ON SERVER RECONNECTION
    });
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

    // TODO BE SET ONLY WHEN APP IS STARTED (windows opened) OR ON SERVER RECONNECTION
    // pull data
    clear();
    // TODO BE SET ONLY WHEN APP IS STARTED (windows opened) OR ON SERVER RECONNECTION

    monitoring.stop();
  } catch (e) {
    logger.error(e);
  }
}
