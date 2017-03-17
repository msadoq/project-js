import { app, ipcMain } from 'electron';
import { series } from 'async';
import path from 'path';
import __ from 'lodash/fp';
import {
  CHILD_PROCESS_SERVER,
  CHILD_PROCESS_DC,
  LOG_APPLICATION_START,
  LOG_APPLICATION_STOP,
  LOG_APPLICATION_ERROR,
} from 'common/constants';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { clear } from 'common/callbacks';

import enableDebug from './debug';
import { fork, get, kill } from './childProcess';
import { initStore, getStore } from '../store/mainStore';
import rendererController from './controllers/renderer';
import serverController from './controllers/server';
import { server } from './ipc';
import { add as addMessage } from '../store/actions/messages';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';
import { updateMasterSessionIfNeeded } from '../store/actions/masterSession';
import { getIsWorkspaceOpening } from '../store/actions/hsc';
import { getViewData } from '../store/selectors/viewData';
import { getFocusedWindowId } from '../store/selectors/hsc';
import setMenu from './menuManager';
import { openWorkspace, openBlankWorkspace } from '../documentManager';
import { start as startOrchestration, stop as stopOrchestration } from './orchestration';
import { splashScreen, codeEditor, windows } from './windowsManager';

const logger = getLogger('main:index');

function scheduleTimeout(message) {
  let timeout = setTimeout(() => {
    logger.error(`Timeout while retrieving launching data: ${message}`);
    timeout = null;
    app.quit();
  }, 2500);

  return () => timeout !== null && clearTimeout(timeout);
}

export function onStart() {
  setMenu();
  const forkOptions = {
    execPath: parameters.get('NODE_PATH'),
    env: parameters.getAll(),
  };

  series([
    callback => splashScreen.open(callback),
    callback => enableDebug(callback),
    (callback) => {
      splashScreen.setMessage('loading data store...');
      logger.info('loading data store...');

      // redux store
      initStore();

      callback(null);
    },
    (callback) => {
      if (parameters.get('STUB_DC_ON') !== 'on') {
        callback(null);
        return;
      }

      splashScreen.setMessage('starting data simulator process...');
      logger.info('starting data simulator process...');
      fork(
        CHILD_PROCESS_DC,
        `${parameters.get('path')}/node_modules/common/stubs/dc.js`,
        forkOptions,
        callback
      );
    },
    (callback) => {
      splashScreen.setMessage('starting data server process...');
      logger.info('starting data server process...');
      fork(
        CHILD_PROCESS_SERVER,
        `${parameters.get('path')}/node_modules/server/index.js`,
        forkOptions,
        callback
      );
    },
    (callback) => {
      splashScreen.setMessage('synchronizing processes...');
      logger.info('synchronizing processes...');
      server.sendProductLog(LOG_APPLICATION_START); // log on LPISIS only when server is up

      // ipc with renderer
      ipcMain.on('windowRequest', rendererController);

      // ipc with server
      get(CHILD_PROCESS_SERVER).on(
        'message',
        data => serverController(get(CHILD_PROCESS_SERVER), data)
      );

      callback(null);
    },
    // should have master sessionId in store at start
    (callback) => {
      splashScreen.setMessage('requesting master session...');
      logger.info('requesting master session...');
      const cancelTimeout = scheduleTimeout('master session');
      server.requestMasterSession(({ err, masterSessionId }) => {
        cancelTimeout();

        if (err) {
          callback(err);
          return;
        }

        splashScreen.setMessage('injecting master session...');
        logger.info('injecting master session...');

        getStore().dispatch(updateMasterSessionIfNeeded(masterSessionId));
        callback(null);
      });
    },
    // should have sessions in store at start
    (callback) => {
      splashScreen.setMessage('requesting sessions...');
      logger.info('requesting sessions...');
      const cancelTimeout = scheduleTimeout('session');
      server.requestSessions(({ err, sessions }) => {
        cancelTimeout();

        if (err) {
          callback(err);
          return;
        }

        splashScreen.setMessage('injecting sessions...');
        logger.info('injecting sessions...');

        getStore().dispatch(updateSessions(sessions));
        callback(null);
      });
    },
    // should have domains in store at start
    (callback) => {
      splashScreen.setMessage('requesting domains...');
      logger.info('requesting domains...');
      const cancelTimeout = scheduleTimeout('domains');
      server.requestDomains(({ err, domains }) => {
        cancelTimeout();

        if (err) {
          callback(err);
          return;
        }

        splashScreen.setMessage('injecting domains...');
        logger.info('injecting domains...');

        getStore().dispatch(updateDomains(domains));
        callback(null);
      });
    },
    (callback) => {
      splashScreen.setMessage('searching workspace...');
      logger.info('searching workspace...');

      const { dispatch } = getStore();
      const root = parameters.get('ISIS_DOCUMENTS_ROOT');
      const file = parameters.get('WORKSPACE');
      const absolutePath = path.join(root, file);

      if (!file) {
        splashScreen.setMessage('loading default workspace...');
        logger.info('loading default workspace...');
        dispatch(addMessage('global', 'info', 'No WORKSPACE found'));
        dispatch(openBlankWorkspace());
        callback(null);
        return;
      }

      splashScreen.setMessage(`loading ${file}`);
      logger.info(`loading ${file}`);

      dispatch(openWorkspace({ absolutePath }, (err) => {
        if (err) {
          splashScreen.setMessage('loading default workspace...');
          logger.info('loading default workspace...');
          dispatch(addMessage('global', 'danger', err));
          dispatch(openBlankWorkspace());
        }
        callback(null);
      }));
    },
    (callback) => {
      if (parameters.get('REALTIME') === 'on') {
        const store = getStore();
        const unsubscribe = store.subscribe(() => {
          const windowId = getFocusedWindowId(store.getState());
          if ( windowId ) {
            const w = windows.executeCode(`(function tryClick() {
              const btn = document.querySelector('#realtime');
              if (btn) {
                btn.click();
              } else {
                setTimeout(tryClick, 100);
              }
            })()`, windowId);
            unsubscribe();
          }
        });
      }
      callback(null);
    },
  ], (err) => {
    if (err) {
      throw err;
    }

    splashScreen.setMessage('ready!');
    logger.info('ready!');
    server.sendProductLog(LOG_APPLICATION_START);

    startOrchestration();
  });
}

export function onStop() {
  server.sendProductLog(LOG_APPLICATION_STOP);
  logger.info('stopping application');

  // stop orchestration
  stopOrchestration();

  // stop child processes
  kill(CHILD_PROCESS_SERVER);
  kill(CHILD_PROCESS_DC);

  // registered callbacks
  clear();

  // close static windows
  windows.closeAll();
  codeEditor.close();
  splashScreen.close();

  logger.info('application stopped');
}

export function onWindowsClose() {
  const state = getStore().getState();
  if (!getIsWorkspaceOpening(state)) {
    app.quit();
  }
}

export function onError(err) {
  console.error(err); // eslint-disable-line no-console
  server.sendProductLog(LOG_APPLICATION_ERROR, err.message);
  app.exit(1);
}
