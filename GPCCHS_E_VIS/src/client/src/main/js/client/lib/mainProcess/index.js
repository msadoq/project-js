import { app, ipcMain } from 'electron';
import { series } from 'async';
import path from 'path';
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

import rtdStub from 'rtd/stubs/rtd';

import enableDebug from './debug';
import { fork, get, kill } from './childProcess';
import { initStore, getStore } from '../store/isomorphic';
import rendererController from './controllers/renderer';
import serverController from './controllers/server';
import { server } from './ipc';
import { add as addMessage } from '../store/actions/messages';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';
import { updateMasterSessionIfNeeded } from '../store/actions/masterSession';
import { getIsWorkspaceOpening } from '../store/actions/hsc';
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

  series([
    callback => splashScreen.open(callback),
    callback => enableDebug(callback),
    (callback) => {
      splashScreen.setMessage('loading data store...');
      logger.info('loading data store...');

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
        {
          execPath: parameters.get('NODE_PATH'),
          env: parameters.getAll(),
        },
        callback
      );
    },
    (callback) => {
      if (parameters.get('STUB_RTD_ON') !== 'on') {
        callback(null);
        return;
      }

      splashScreen.setMessage('starting rtd simulator...');
      logger.info('starting rtd simulator...');
      rtdStub.launch();
      callback(null);
    },
    (callback) => {
      splashScreen.setMessage('starting data server process...');
      logger.info('starting data server process...');

      fork(
        CHILD_PROCESS_SERVER,
        `${parameters.get('path')}/node_modules/server/index.js`,
        {
          execPath: parameters.get('NODE_PATH'),
          execArgv: process.env.HOT ? ['-r', 'babel-register', '-r', 'babel-polyfill'] : [],
          env: parameters.getAll(),
        },
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

      if (!root) {
        logger.warn('No ISIS_DOCUMENTS_ROOT found');
        dispatch(addMessage('global', 'warning', 'No FMD support'));
        dispatch(openBlankWorkspace({ keepMessages: true }));
        callback(null);
        return;
      }

      const file = parameters.get('WORKSPACE');
      const absolutePath = path.join(root, file);

      if (!file) {
        splashScreen.setMessage('loading default workspace...');
        logger.info('loading default workspace...');
        dispatch(addMessage('global', 'info', 'No WORKSPACE found'));
        dispatch(openBlankWorkspace({ keepMessages: true }));
        callback(null);
        return;
      }

      splashScreen.setMessage(`loading ${file}`);
      logger.info(`loading ${file}`);

      dispatch(openWorkspace({ absolutePath }, (err) => {
        if (err) {
          splashScreen.setMessage('loading default workspace...');
          logger.info('loading default workspace...');
          dispatch(openBlankWorkspace({ keepMessages: true }));
        }
        callback(null);
      }));
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
  server.sendProductLog(LOG_APPLICATION_ERROR, err.message);
  logger.error('Application error:', err);
  app.exit(1);
}
