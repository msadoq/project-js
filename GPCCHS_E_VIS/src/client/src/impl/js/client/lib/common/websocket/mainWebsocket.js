import Primus from 'common/websocket';
import debug from '../debug/mainDebug';
import { getStore } from '../../store/mainStore';
import { updateStatus } from '../../store/actions/hss';
import { onOpen, onClose } from '../../mainProcess/lifecycle';

import parameters from '../../common/parameters';

import controller from './mainController';

const logger = debug('main:websocket');

let instance;

const options = {
  reconnect: {
    max: 2000,
    min: 200,
    retries: 50,
    'reconnect timeout': 1000,
    factor: 1.5,
  },
};

export function connect() {
  if (!instance) {
    logger.info('trying open connection to', parameters.HSS);

    instance = new Primus(parameters.HSS, options);

    instance.on('open', () => {
      logger.info('opened!');
      onOpen(getStore().dispatch, instance);
    });
    instance.on('close', () => {
      logger.info('closed!');
      onClose(getStore().dispatch);
    });
    instance.on('error', (err) => {
      logger.error('error', err.stack);
      getStore().dispatch(updateStatus('main', 'error', err.message));
    });
    instance.on('data', (data) => {
      if (!data || !data.event) {
        return logger.error('Invalid event received', data);
      }
      logger.debug(`Incoming event ${data.event}`);
      controller(instance, getStore().getState(), getStore().dispatch, data.event, data.payload);
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

export function getWebsocket() {
  if (!instance) {
    throw new Error('websocket wasn\'t inited yet');
  }
  return instance;
}
