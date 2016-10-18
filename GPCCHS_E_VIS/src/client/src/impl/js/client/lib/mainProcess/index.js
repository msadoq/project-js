import parameters from '../common/parameters';
import debug from '../common/debug/mainDebug';
import installExtensions from './installExtensions';
import openWorkspace from './openWorkspace';
import invalidateCache from './invalidateCache';
import { initStore, getStore } from '../store/mainStore';
import storeObserver from './storeObserver';
import { connect, disconnect } from '../common/websocket/mainWebsocket';
import './menu';

const logger = debug('mainProcess:index');

let storeSubscription = null;
let cacheInvalidator;
const CACHE_INVALIDATION_FREQUENCY = 5000;

export async function start() {
  logger.info('app start');
  try {
    await installExtensions();
    initStore();
    logger.info('initial state', getStore().getState());

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
      // TODO : on websocket disconnection cleanup dataCache and dataRequests
      connect();

      // cache invalidation
      cacheInvalidator = setInterval(() => invalidateCache(
        getStore()),
        CACHE_INVALIDATION_FREQUENCY
      );
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
  } catch (e) {
    logger.error(e);
  }
}
