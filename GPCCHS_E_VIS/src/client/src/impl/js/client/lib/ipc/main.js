import { ipcMain, BrowserWindow  } from 'electron';
import { dirname } from 'path';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { requestSessions, requestPathFromOId } from '../mainProcess/websocket';
import { getStore } from '../store/mainStore';
import { updateSessions } from '../store/actions/sessions';
import { saveViewAs } from '../documentsManager/saveView';
import getPathByFilePicker from '../mainProcess/filePicker';
import { showErrorMessage, showMessageDialog } from '../mainProcess/fileTreatment';
import { readViews } from  '../documentsManager/extractViews';

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
            e.sender.send('mainResponse', { event: 'runCallback', payload: { error }, queryId });
          });
        } else {
          showErrorMessage(BrowserWindow.getFocusedWindow(),
            'Error on selected view',
            'Invalid View path', () => {
            e.sender.send('mainResponse', { event: 'runCallback',
            payload: { error: 'Invalid path' }, queryId });
          });
        }
        break;
      }
      case 'saveViewAs': {
        const folder = payload.absolutePath ? dirname(payload.absolutePath) : root;
        getPathByFilePicker(folder, 'view', 'save', (err, viewPath) => {
          if (!err && viewPath) {
            saveViewAs(payload.configuration, payload.type, viewPath, (error) => {
              e.sender.send('mainResponse', { event: 'runCallback',
              payload: { error, viewPath }, queryId });
            });
          }
        });
        break;
      }
      case 'reloadView': {
        if (payload.isModified) {
          // Ask confirmation
          showMessageDialog(BrowserWindow.getFocusedWindow(), 'Unsaved view',
          'If you continue, view modifications will be lost.', ['cancel', 'continue'], (button) => {
            if (button === 0) {
              e.sender.send('mainResponse', { event: 'runCallback',
              payload: { error: 'cancel' }, queryId });
              return;
            }
            reloadView(e, queryId, payload);
          });
        } else {
          reloadView(e, queryId, payload);
        }
        break;
      }
      default:
        logger.error(`unsupported event received: ${event}`); // eslint-disable-line no-console
    }
    // HOW TO ANSWER
    // e.sender.send('asynchronous-reply', 'pong');
  });
}

function reloadView(e, queryId, payload) {
  const viewPath = [{ absolutePath: payload.absolutePath }];
  readViews(viewPath, requestPathFromOId, (errView, view) => {
    if (errView) {
      showErrorMessage(BrowserWindow.getFocusedWindow(),
        'Error on selected view',
        'Invalid View file selected',
        () => {
          e.sender.send('mainResponse', { event: 'runCallback',
          payload: { error: errView }, queryId });
      });
      return;
    }
    const current = view[0];
    current.absolutePath = payload.absolutePath;
    e.sender.send('mainResponse', { event: 'runCallback',
    payload: { configuration: current.configuration }, queryId });
  });
}

export function sendToServer() {
  // TODO
}
