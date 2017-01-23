import { app, ipcMain } from 'electron';
import { series } from 'async';
import path from 'path';
import { CHILD_PROCESS_SERVER, CHILD_PROCESS_DC } from 'common/constants';
import getLogger from 'common/log';
import monitoring from 'common/log/monitoring';
import parameters from 'common/parameters';
import { clear } from 'common/callbacks';

import enableDebug from './debug';
import { fork, get, kill } from './childProcess';
import { initStore, getStore } from '../store/mainStore';
import './menu';
import rendererController from './controllers/renderer';
import serverController from './controllers/server';
import { server } from './ipc';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';

import { readWkFile, openDefaultWorkspace } from './openWorkspace';

import { start as startOrchestration, stop as stopOrchestration } from './orchestration';

const logger = getLogger('main:index');

export function start() {
  const forkOptions = {
    execPath: parameters.get('NODE_PATH'),
    env: {
      LOG: parameters.get('LOG'),
      LOG_DIR: parameters.get('LOG_DIR'),
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
      // ipc with renderer
      ipcMain.on('windowRequest', rendererController);

      // ipc with server
      get(CHILD_PROCESS_SERVER).on(
        'message',
        data => serverController(get(CHILD_PROCESS_SERVER), data)
      );

      return callback(null);
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

      return (file)
        ? readWkFile(dispatch, getState, root, file, callback)
        : openDefaultWorkspace(dispatch, root, callback);
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
