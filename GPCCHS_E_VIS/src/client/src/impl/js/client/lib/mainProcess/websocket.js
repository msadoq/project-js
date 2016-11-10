import Primus from 'common/websocket';
import globalConstants from 'common/constants';

import debug from '../common/debug/mainDebug';
import { getStore } from '../store/mainStore';
import { updateStatus } from '../store/actions/hss';
import { onOpen, onClose, onDomainResponse } from './lifecycle';
import parameters from '../common/parameters';
import { receive } from './pull';

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
    const url = `${parameters.HSS}?identity=main`;
    logger.info('trying open connection to', url);
    instance = new Primus(url, options);

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

      const { event, payload } = data;
      const store = getStore();
      logger.debug(`Incoming event ${event}`);

      switch (event) {
        case globalConstants.EVENT_DOMAIN_RESPONSE:
          return onDomainResponse(store.dispatch, payload);
        case globalConstants.EVENT_TIMEBASED_DATA:
          return receive(store.getState(), store.dispatch, payload);
        case globalConstants.EVENT_ERROR:
          switch (payload.type) {
            case globalConstants.ERRORTYPE_RESPONSE:
              logger.error('DC Response Error', payload.reason);
              break;
            default:
              logger.error('Unrecognized Error type');
              break;
          }
          break;
        default:
          logger.error('Received not yet implemented event', event);
      }
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
