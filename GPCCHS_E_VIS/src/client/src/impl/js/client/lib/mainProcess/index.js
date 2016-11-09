import globalConstants from 'common/constants';
import monitoring from 'common/monitoring';

import parameters from '../common/parameters';
import debug from '../common/debug/mainDebug';
import installExtensions from './installExtensions';
import openWorkspace from './openWorkspace';
import invalidateCache from '../common/data/invalidate';
import { initStore, getStore } from '../store/mainStore';
import storeObserver, { setActingOn, setActingOff } from './storeObserver';
import { connect, disconnect } from '../common/websocket/mainWebsocket';
import { schedule, clear } from './pull';
import './menu';

const logger = debug('mainProcess:index');

let storeSubscription = null;
let cacheInvalidator;

export async function start() {
  monitoring.start();
  logger.info('app start');
  try {
    await installExtensions();
    initStore();
    logger.debug('initial state', getStore().getState());

    // TODO : read file path in params => file picker

    // read workspace async and on callback connect observers
    openWorkspace(parameters.FMD_ROOT, parameters.OPEN, getStore().dispatch, (err) => {
      if (err) {
        logger.error(err);
        throw new Error('display file picker'); // TODO : file picker
      }

      const state = getStore().getState();
      const count = {
        w: Object.keys(state.windows).length,
        p: Object.keys(state.pages).length,
        v: Object.keys(state.views).length,
      };
      logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);

      // main process store observer
      storeSubscription = getStore().subscribe(storeObserver);

      // open websocket connection
      connect();

      // TODO BE SET ONLY WHEN APP IS STARTED (windows opened)
      // cache invalidation
      cacheInvalidator = setInterval(() => {
        setActingOn();
        invalidateCache(getStore());
        setActingOff();
      }, globalConstants.CACHE_INVALIDATION_FREQUENCY);

      // pull data from HSS
      schedule();
      // TODO BE SET ONLY WHEN APP IS STARTED (windows opened)
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
    if (cacheInvalidator) {
      clearInterval(cacheInvalidator);
    }

    // pull data
    clear();

    monitoring.stop();
  } catch (e) {
    logger.error(e);
  }
}
