import parameters from '../common/parameters';
import debug from '../common/debug/mainDebug';
import './menu';
import installExtensions from './installExtensions';
import openWorkspace from './openWorkspace';
import invalidateCache from './invalidateCache';
import { initStore, getStore } from '../store/mainStore';
import { storeSpectator, storeActor } from '../store/observerGenerator';
import lifecycleObserver from '../store/observers/lifecycle';
import dataObserver from '../store/observers/data';
import windowsObserver from '../store/observers/windows';
import { connect, disconnect } from '../common/websocket/mainWebsocket';

const logger = debug('main');

let storeUnsubscribe = [];
let cacheInvalidor;
const CACHE_INVALIDATION_TIMESTEP = 5000;

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

      // subscribe spectators and actors observers
      storeUnsubscribe.push(storeSpectator(getStore(), lifecycleObserver));
      storeUnsubscribe.push(storeActor(getStore(), dataObserver));
      storeUnsubscribe.push(storeSpectator(getStore(), windowsObserver));

      // open websocket connection
      connect();
    });
    cacheInvalidor = setInterval(() => invalidateCache(getStore()), CACHE_INVALIDATION_TIMESTEP);
  } catch (e) {
    logger.error(e);
  }
}

export function stop() {
  logger.info('app stop');
  try {
    disconnect();
    if (storeUnsubscribe.length) {
      storeUnsubscribe.map(sub => sub());
      storeUnsubscribe = [];
    }
    clearInterval(cacheInvalidor);
  } catch (e) {
    logger.error(e);
  }
}
