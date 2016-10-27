import {
  websocket as Primus,
  constants as globalConstants,
} from 'common';
import debug from '../debug/mainDebug';
import { getStore } from '../../store/mainStore';
import { updateStatus } from '../../store/actions/hss';
import { removeAllData } from '../../store/actions/viewData';
import { removeAllRequests } from '../../store/actions/dataRequests';
import { setActingOn, setActingOff } from '../../mainProcess/storeObserver';

import parameters from '../../common/parameters';

import controller from './mainController';

const logger = debug('main:websocket');

let instance;

export function connect() {
  if (!instance) {
    logger.info('trying open connection to', parameters.HSS);

    instance = new Primus(parameters.HSS, {
      reconnect: {
        max: 2000,
        min: 200,
        retries: 50,
        'reconnect timeout': 1000,
        factor: 1.5,
      },
    });

    instance.on('open', () => {
      logger.info('connected!');
      getStore().dispatch(updateStatus('main', 'connected'));
      instance.write({
        event: globalConstants.EVENT_IDENTITY,
        payload: {
          identity: 'main',
        },
      });
    });
    instance.on('close', () => {
      setActingOn();
      getStore().dispatch(updateStatus('main', 'disconnected'));
      getStore().dispatch(removeAllRequests());
      getStore().dispatch(removeAllData());
      // warning: timeout to handle a weird behavior that trigger data observer update
      setTimeout(setActingOff, 0);
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
      controller(getStore().getState(), getStore().dispatch, data.event, data.payload);
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
