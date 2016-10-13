import debug from '../../common/debug/windowDebug';
import { getStore } from '../../store/windowStore';
import controller from './windowController';
import { updateStatus } from '../../store/actions/hss';
// import parameters from '../parameters';
import Primus from '../../../VIVL/primus';

const logger = debug('window:websocket');

let instance;

export function connect(windowId) {
  if (!instance) {
    logger.info('trying open connection to', global.env.HSS);
    try {
      instance = new Primus(global.env.HSS);
    } catch (e) {
      return logger.error(e);
    }

    instance.on('open', () => {
      logger.info('window:websocket connected!');
      getStore().dispatch(updateStatus(windowId, 'connected'));
      instance.write({
        event: 'identity',
        payload: {
          identity: windowId,
        },
      });
    });
    instance.on('close', () => {
      logger.info('closed!');
      getStore().dispatch(updateStatus(windowId, 'disconnected'));
    });
    instance.on('error', (err) => {
      logger.error('error', err.stack);
      getStore().dispatch(updateStatus(windowId, 'error', err.message));
    });
    instance.on('data', (data) => {
      if (!data || !data.event) {
        return logger.error('Invalid event received', data);
      }
      logger.info(`Incoming event ${data.event}`);
      controller(getStore().getState(), getStore().dispatch, windowId, data.event, data.payload);
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
    return logger.error('websocket wasn\'t inited yet');
  }
  return instance;
}
