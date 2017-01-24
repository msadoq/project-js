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
  logger.debug('starting application with configuration', {
    DEBUG: parameters.get('DEBUG'),
    LOG: parameters.get('LOG'),
    MONITORING: parameters.get('MONITORING'),
    PROFILING: parameters.get('PROFILING'),
    ZMQ_GPCCDC_PUSH: parameters.get('ZMQ_GPCCDC_PUSH'),
    ZMQ_GPCCDC_PULL: parameters.get('ZMQ_GPCCDC_PULL'),
    FMD_ROOT_DIR: parameters.get('FMD_ROOT_DIR'),
    WORKSPACE: parameters.get('WORKSPACE'),
    NODE_PATH: parameters.get('NODE_PATH'),
  });

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
      logger.info('initializing store');
      initStore();
      logger.info('store initialized');

      callback(null);
    },
    (callback) => {
      if (parameters.get('STUB_DC_ON') !== 'on') {
        return callback(null);
      }

      logger.info('initializing dc stub');
      fork(
        CHILD_PROCESS_DC,
        `${parameters.get('path')}/node_modules/common/stubs/dc.js`,
        forkOptions,
        callback
      );
    },
    (callback) => {
      logger.info('initializing server');
      fork(
        CHILD_PROCESS_SERVER,
        `${parameters.get('path')}/node_modules/server/index.js`,
        forkOptions,
        callback
      );
    },
    (callback) => {
      logger.info('registering main controllers');

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
      logger.info('requesting sessions');
      server.requestSessions(({ err, sessions }) => {
        if (err) {
          return callback(err);
        }

        logger.info('received sessions from server');
        getStore().dispatch(updateSessions(sessions));
        callback(null);
      });
    },
    // should have domains in store at start
    (callback) => {
      logger.info('requesting domains');
      server.requestDomains(({ err, domains }) => {
        if (err) {
          return callback(err);
        }

        logger.info('received domains from server');
        getStore().dispatch(updateDomains(domains));
        callback(null);
      });
    },
    (callback) => {
      logger.info('opening workspace');
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

    logger.info('workspace opened');
    logger.info('application started');
    server.sendProductLog(LOG_APPLICATION_START);
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

  logger.info('application stopped');
}

export function onWindowsClose() {
  const state = getStore().getState();
  if (!state.hsc.isWorkspaceOpening) { // TODO implement selector
    app.quit();
  }
}
