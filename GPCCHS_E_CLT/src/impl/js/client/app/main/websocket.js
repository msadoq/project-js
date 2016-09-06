import debug from '../utils/debug';
import Primus from '../../../../../../../GPCCHS_D_SVR/src/impl/js/server/primus.client';
import { mainWebsocketStatus } from '../actions/mainWebsocket';
import { getStore } from './store';

const logger = debug('main:websocket');

let instance;

export function connect() {
  if (!instance) {
    logger.info('trying open connection to', process.env.HSS);
    instance = new Primus(process.env.HSS);
    instance.on('open', () => {
      logger.info('connected!');
      getStore().dispatch(mainWebsocketStatus('connected'));
    });
    instance.on('close', () => {
      logger.info('closed!');
      getStore().dispatch(mainWebsocketStatus('disconnected'));
    });
    instance.on('error', err => {
      logger.error('error', err.stack);
      getStore().dispatch(mainWebsocketStatus('error', err.message));
    });
    instance.on('data', data => {
      logger.info('incoming data', data);
    });
  }

  return instance;
}

export function disconnect() {
  if (instance) {
    instance.destroy();

    // ask gc to destroy primus instance
    instance = null;
  }
}
