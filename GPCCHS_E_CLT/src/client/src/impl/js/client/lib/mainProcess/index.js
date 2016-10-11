import _ from 'lodash';

import parameters from '../common/parameters';
import debug from '../common/debug/mainDebug';
import './menu';
import installExtensions from './installExtensions';
import openWorkspace from './openWorkspace';
import { initStore, getStore } from '../store/mainStore';
import { storeSpectator, storeActor } from '../store/observerGenerator';
import lifecycleObserver from '../store/observers/lifecycle';
import dataObserver from '../store/observers/data';
import windowsObserver from '../store/observers/windows';
import { connect, disconnect } from '../common/websocket/mainWebsocket';

const logger = debug('main');

let storeUnsubscribe = [];

export async function start() {
  logger.info('app start');
  try {
    await installExtensions();
    initStore();

    // TODO : read file path in params => file picker

    // read workspace async and on callback connect observers
    openWorkspace(parameters.FMD_ROOT, 'medium.workspace.json', getStore().dispatch, (err) => {
      if (err) {
        logger.error(err);
        return console.warn('TODO display file picker'); // TODO : file picker
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
  } catch (e) {
    logger.error(e);
  }
}
