import Primus from 'common/websocket';
import globalConstants from 'common/constants';
import { set, get, remove } from 'common/callbacks';
import { v4 } from 'node-uuid';
import getLogger from 'common/log';

import { getStore } from '../store/mainStore';
import { updateStatus } from '../store/actions/hss';
import { add as addMessage, addOnce as addOnceMessage } from '../store/actions/messages';
// import { onOpen, onClose } from './lifecycle';
import { addToQueue } from './orchestration';

const logger = getLogger('main:websocket');

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

export function connect(serverUrl) {
  if (!instance) {
    const url = `${serverUrl}?identity=main`;
    logger.info('trying open connection to', url);
    instance = new Primus(url, options);

    instance.on('open', () => {
      logger.info('opened!');
      // onOpen(getStore().getState, getStore().dispatch, requestDomains, requestSessions);
    });
    instance.on('close', () => {
      logger.info('closed!');
      // onClose(getStore().dispatch);
    });
    instance.on('error', (err) => {
      logger.error('error', err.stack);
      getStore().dispatch(updateStatus('main', 'error', err.message));
    });
    instance.on('data', (data) => {
      if (!data || !data.event) {
        return logger.error('Invalid event received', data);
      }

      const { event, queryId, payload } = data;
      logger.debug(`Incoming event ${event}`);

      switch (event) {
        case globalConstants.EVENT_TIMEBASED_DATA:
          return addToQueue(payload);
        case globalConstants.EVENT_DOMAIN_DATA:
        case globalConstants.EVENT_SESSION_DATA:
        case globalConstants.EVENT_FILEPATH_DATA:
          return handleResponse(queryId, payload);
        case globalConstants.EVENT_ERROR: {
          const err = `Error from server: ${payload.reason}`;
          return getStore().dispatch(addOnceMessage('global', 'danger', err));
        }
        default: {
          const err = `Received not yet implemented event ${event}`;
          logger.error(err);
          return getStore().dispatch(addMessage('global', 'danger', err));
        }
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

export function requestDomains(callback) {
  const queryId = v4();
  set(queryId, callback);
  getWebsocket().write({
    event: globalConstants.EVENT_DOMAIN_QUERY,
    queryId,
  });
}

export function requestSessions(callback) {
  const queryId = v4();
  set(queryId, callback);
  getWebsocket().write({
    event: globalConstants.EVENT_SESSION_QUERY,
    queryId,
  });
}

export function requestPathFromOId(oid, callback) {
  const queryId = v4();
  set(queryId, callback);
  getWebsocket().write({
    event: globalConstants.EVENT_FILEPATH_QUERY,
    queryId,
    payload: {
      oid,
    }
  });
}
export function handleResponse(queryId, payload) {
  const callback = get(queryId);
  if (!callback) {
    return logger.warn(`received an unknown queryId ${queryId}`);
  }

  remove(queryId);
  return callback(null, payload);
}
