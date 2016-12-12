import { ipcRenderer } from 'electron';
import { v4 } from 'node-uuid';
import _isFunction from 'lodash/isFunction';

const callbacks = {};

ipcRenderer.on('mainResponse', (e, { event, payload, queryId }) => {
  console.log(
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
      console.error(`unsupported event type ${event}`);
  }
});

export function sendToMain(event, payload, callback) { // eslint-disable-line
  const message = { event, payload };
  if (_isFunction(callback)) {
    // RPC
    message.queryId = v4();
    callbacks[message.queryId] = callback;
  }

  ipcRenderer.send('windowRequest', message);
  console.log('ipc:window:sendingToMain', message); // eslint-disable-line no-console
}
