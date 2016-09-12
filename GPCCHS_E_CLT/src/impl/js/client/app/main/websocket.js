import debug from '../utils/debug';
import Primus from '../../../../../../../GPCCHS_D_SVR/src/impl/js/server/primus.client';
import { getStore } from '../store/mainStore';
import controller from './controller';
import { updateStatus } from '../store/mutations/hssActions';

const logger = debug('main:websocket');

let instance;

export function connect() {
  if (!instance) {
    logger.info('trying open connection to', process.env.HSS);
    instance = new Primus(process.env.HSS);
    instance.on('open', () => {
      logger.info('connected!');
      getStore().dispatch(updateStatus('connected'));
      instance.write({
        event: 'identity',
        payload: {
          identity: 'main',
        },
      });
    });
    instance.on('close', () => {
      logger.info('closed!');
      getStore().dispatch(updateStatus('disconnected'));
    });
    instance.on('error', err => {
      logger.error('error', err.stack);
      getStore().dispatch(updateStatus('error', err.message));
    });
    instance.on('data', data => {
      if (!data || !data.event) {
        return console.error('Invalid event received', data);
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
