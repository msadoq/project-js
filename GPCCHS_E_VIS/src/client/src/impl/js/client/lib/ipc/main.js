import { ipcMain } from 'electron';
import getLogger from 'common/log';
import { requestSessions } from '../mainProcess/websocket';
import { getStore } from '../store/mainStore';
import { updateSessions } from '../store/actions/sessions';
const logger = getLogger('ipc:main');

export function init() {
  ipcMain.on('windowRequest', (e, { event, payload, queryId }) => {
    logger.debug('ipc:window:onWindowRequest', event, payload); // eslint-disable-line no-console
    switch (event) {
      case 'getSessions': {
        requestSessions((err, payload = []) => {
          if (err) {
            return console.error(err); // eslint-disable no-console
          }

          const now = Date.now();
          payload.map(s => Object.assign(s, { offsetWithmachineTime: s.timestamp.ms - now }));
          getStore().dispatch(updateSessions(payload));

          e.sender.send('mainResponse', { event: 'runCallback', queryId });
        });
        break;
      }
      default:
        logger.error(`unsupported event received: ${event}`); // eslint-disable-line no-console
    }
    // HOW TO ANSWER
    // e.sender.send('asynchronous-reply', 'pong');
  });
}

export function sendToServer() {
  // TODO
}
