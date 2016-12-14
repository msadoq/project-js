import { ipcRenderer } from 'electron';
import { v4 } from 'node-uuid';
import _isFunction from 'lodash/isFunction';
import getLogger from 'common/log';

const logger = getLogger('ipc:window');

const callbacks = {};

export function init() {
  ipcRenderer.on('mainResponse', (e, { event, payload, queryId }) => {
    logger.debug(
      'ipc:window:onMainResponse',
      event,
      payload,
      queryId
    ); // eslint-disable-line no-console

    switch (event) {
      case 'runCallback': {
        const callback = callbacks[queryId];
        delete callbacks[queryId];
        callback(payload);
        break;
      }
      default:
        logger.error(`unsupported event type ${event}`);
    }
  });
}

export function sendToMain(event, payload, callback) {
  const message = { event, payload };
  if (_isFunction(callback)) {
    // RPC
    message.queryId = v4();
    callbacks[message.queryId] = callback;
  }

  ipcRenderer.send('windowRequest', message);
  logger.debug('ipc:window:sendingToMain', message);
}
