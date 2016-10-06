import debug from '../utils/mainDebug';
import { getStore } from '../store/mainStore';
import controller from './mainController';
import { updateStatus } from '../store/mutations/hssActions';
import parameters from '../main/parameters';
import { Primus } from '../../external.main';

const logger = debug('main:websocket');

let instance;

export function connect() {
  if (!instance) {
    logger.info('trying open connection to', parameters.HSS);

    try {
      instance = new Primus(parameters.HSS);
    } catch(e) {
      logger.error(e);
    }

    instance.on('open', () => {
      logger.info('connected!');
      getStore().dispatch(updateStatus('main', 'connected'));
      instance.write({
        event: 'identity',
        payload: {
          identity: 'main',
        },
      });
    });
    instance.on('close', () => {
      logger.info('closed!');
      getStore().dispatch(updateStatus('main', 'disconnected'));
    });
    instance.on('error', err => {
      logger.error('error', err.stack);
      getStore().dispatch(updateStatus('main', 'error', err.message));
    });
    instance.on('data', data => {
      if (!data || !data.event) {
        return logger.error('Invalid event received', data);
      }
      logger.info(`Incoming event ${data.event}`);
      controller(data.event, data.payload);
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
