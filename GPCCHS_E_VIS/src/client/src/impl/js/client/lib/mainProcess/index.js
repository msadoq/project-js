import { app, ipcMain } from 'electron';
import { series } from 'async';
import {
  CHILD_PROCESS_SERVER,
  CHILD_PROCESS_DC,
  LOG_APPLICATION_START,
} from 'common/constants';
import getLogger from 'common/log';
import monitoring from 'common/log/monitoring';
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
import { updateMasterSession } from '../store/actions/masterSession';

import setMenu from './menu';
import { openDefaultWorkspace, openWorkspaceDocument } from './openWorkspace';
import { start as startOrchestration, stop as stopOrchestration } from './orchestration';

const logger = getLogger('main:index');

export function start() {
  setMenu();
  const forkOptions = {
    execPath: parameters.get('NODE_PATH'),
    env: {
      LOG: parameters.get('LOG'),
      MONITORING: parameters.get('MONITORING'),
      PROFILING: parameters.get('PROFILING'),
      ZMQ_GPCCDC_PUSH: parameters.get('ZMQ_GPCCDC_PUSH'),
      ZMQ_GPCCDC_PULL: parameters.get('ZMQ_GPCCDC_PULL'),
      FMD_ROOT_DIR: parameters.get('FMD_ROOT_DIR'),
    },
  };

  series([
    callback => enableDebug(callback),
    (callback) => {
      // monitoring
      monitoring.start();

      // redux store
      initStore();
      logger.debug('store initialized');

      callback(null);
    },
    (callback) => {
      if (parameters.get('STUB_DC_ON') !== 'on') {
        return callback(null);
      }

      fork(
        CHILD_PROCESS_DC,
        `${parameters.get('path')}/node_modules/common/stubs/dc.js`,
        forkOptions,
        callback
      );
    },
    (callback) => {
      fork(
        CHILD_PROCESS_SERVER,
        `${parameters.get('path')}/node_modules/server/index.js`,
        forkOptions,
        callback
      );
    },
    (callback) => {
      server.sendProductLog(LOG_APPLICATION_START);

      // ipc with renderer
      ipcMain.on('windowRequest', rendererController);

      // ipc with server
      get(CHILD_PROCESS_SERVER).on(
        'message',
        data => serverController(get(CHILD_PROCESS_SERVER), data)
      );

      return callback(null);
    },
    // should have master sessionId in store at start
    (callback) => {
      server.requestMasterSession(({ err, masterSessionId }) => {
        if (err) {
          return callback(err);
        }

        logger.debug('received master sessionId from server');
        getStore().dispatch(updateMasterSession(masterSessionId));
        callback(null);
      });
    },
    // should have sessions in store at start
    (callback) => {
      server.requestSessions(({ err, sessions }) => {
        if (err) {
          return callback(err);
        }

        logger.debug('received sessions from server');
        getStore().dispatch(updateSessions(sessions));
        callback(null);
      });
    },
    // should have domains in store at start
    (callback) => {
      server.requestDomains(({ err, domains }) => {
        if (err) {
          return callback(err);
        }

        logger.debug('received domains from server');
        getStore().dispatch(updateDomains(domains));
        callback(null);
      });
    },
    (callback) => {
      const { dispatch, getState } = getStore();
      const root = parameters.get('FMD_ROOT_DIR');
      const file = parameters.get('WORKSPACE');

      if (!file) {
        dispatch(addMessage('global', 'info', 'No WORKSPACE found'));
        return openDefaultWorkspace(dispatch, root, callback);
      }

      openWorkspaceDocument(dispatch, getState, root, file, (err, value) => {
        if (err) {
          dispatch(addMessage('global', 'danger', err));
          return openDefaultWorkspace(dispatch, root, callback);
        }
        callback(null, value);
      });
    }
  ], (err) => {
    if (err) {
      throw err;
    }

    startOrchestration();
  });
}

export function stop() {
  // stop monitoring
  monitoring.stop();

  // stop orchestration
  stopOrchestration();

  // stop child processes
  kill(CHILD_PROCESS_SERVER);
  kill(CHILD_PROCESS_DC);

  // registered callbacks
  clear();
}

export function onWindowsClose() {
  const state = getStore().getState();
  if (!state.hsc.isWorkspaceOpening) { // TODO implement selector
    app.quit();
  }
}
