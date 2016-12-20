import { ipcMain } from 'electron';
import { dirname } from 'path';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { requestSessions } from '../mainProcess/websocket';
import { getStore } from '../store/mainStore';
import { updateSessions } from '../store/actions/sessions';
import { saveViewAs } from '../documentsManager/saveView';
import getPathByFilePicker from '../mainProcess/filePicker';

const logger = getLogger('ipc:main');
const root = parameters.get('FMD_ROOT_DIR');

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
      case 'saveView': {
        const absPath = payload.absolutePath;
        // TODO: case of oid : check rights
        if (absPath) {
          saveViewAs(payload.configuration, payload.type, absPath, (error) => {
            e.sender.send('mainResponse', { event: 'saveView', payload: { error } });
          });
        } else {
          e.sender.send('mainResponse', { event: 'saveView', payload: { error: 'Invalid path' } });
        }
        break;
      }
      case 'saveViewAs': {
        const folder = payload.absolutePath ? dirname(payload.absolutePath) : root;
        getPathByFilePicker(folder, 'view', 'save', (err, viewPath) => {
          if (!err && viewPath) {
            saveViewAs(payload.configuration, payload.type, viewPath, (error) => {
              e.sender.send('mainResponse', { event: 'saveView', payload: { error } });
            });
          }
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
