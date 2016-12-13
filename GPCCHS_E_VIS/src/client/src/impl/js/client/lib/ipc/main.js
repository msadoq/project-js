import { ipcMain } from 'electron';
import { requestSessions } from '../mainProcess/websocket';
import { getStore } from '../store/mainStore';
import { updateSessions } from '../store/actions/sessions';

ipcMain.on('windowRequest', (e, { event, payload, queryId }) => {
  console.log('ipc:window:onWindowRequest', event, payload); // eslint-disable-line no-console
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
      console.log(`unsupported event received: ${event}`); // eslint-disable-line no-console
  }

  // HOW TO ANSWER
  // e.sender.send('asynchronous-reply', 'pong');
});
