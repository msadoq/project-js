import { app, ipcMain } from 'electron';
import { series } from 'async';
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

import setMenu from './menu';
import { openDefaultWorkspace, openWorkspaceDocument } from './openWorkspace';
import { start as startOrchestration, stop as stopOrchestration } from './orchestration';

import { openSplashScreen, openHtmlEditor, setSplashScreenMessage } from './windows';

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
    callback => openSplashScreen(callback),
    callback => openHtmlEditor(callback),
    callback => enableDebug(callback),
    (callback) => {
      setSplashScreenMessage('loading data store...');
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

      setSplashScreenMessage('starting data simulator process...');
      logger.info('starting data simulator process...');
      fork(
        CHILD_PROCESS_DC,
        `${parameters.get('path')}/node_modules/common/stubs/dc.js`,
        forkOptions,
        callback
      );
    },
    (callback) => {
      setSplashScreenMessage('starting data server process...');
      logger.info('starting data server process...');
      fork(
        CHILD_PROCESS_SERVER,
        `${parameters.get('path')}/node_modules/server/index.js`,
        forkOptions,
        callback
      );
    },
    (callback) => {
      setSplashScreenMessage('synchronizing processes...');
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
      setSplashScreenMessage('requesting master session...');
      logger.info('requesting master session...');
      server.requestMasterSession(({ err, masterSessionId }) => {
        if (err) {
          callback(err);
          return;
        }

        setSplashScreenMessage('injecting master session...');
        logger.info('injecting master session...');

        getStore().dispatch(updateMasterSessionIfNeeded(masterSessionId));
        callback(null);
      });
    },
    // should have sessions in store at start
    (callback) => {
      setSplashScreenMessage('requesting sessions...');
      logger.info('requesting sessions...');
      server.requestSessions(({ err, sessions }) => {
        if (err) {
          callback(err);
          return;
        }

        setSplashScreenMessage('injecting sessions...');
        logger.info('injecting sessions...');

        getStore().dispatch(updateSessions(sessions));
        callback(null);
      });
    },
    // should have domains in store at start
    (callback) => {
      setSplashScreenMessage('requesting domains...');
      logger.info('requesting domains...');
      server.requestDomains(({ err, domains }) => {
        if (err) {
          callback(err);
          return;
        }

        setSplashScreenMessage('injecting domains...');
        logger.info('injecting domains...');

        getStore().dispatch(updateDomains(domains));
        callback(null);
      });
    },
    (callback) => {
      setSplashScreenMessage('searching workspace...');
      logger.info('searching workspace...');

      const { dispatch, getState } = getStore();
      const root = parameters.get('FMD_ROOT_DIR');
      const file = parameters.get('WORKSPACE');

      if (!file) {
        setSplashScreenMessage('loading default workspace...');
        logger.info('loading default workspace...');
        dispatch(addMessage('global', 'info', 'No WORKSPACE found'));
        openDefaultWorkspace(dispatch, root, callback);
        return;
      }

      setSplashScreenMessage(`loading ${file}`);
      logger.info(`loading ${file}`);

      openWorkspaceDocument(dispatch, getState, root, file, (err, value) => {
        if (err) {
          setSplashScreenMessage('loading default workspace...');
          logger.info('loading default workspace...');
          dispatch(addMessage('global', 'danger', err));
          openDefaultWorkspace(dispatch, root, callback);
          return;
        }
        callback(null, value);
      });
    },
  ], (err) => {
    if (err) {
      throw err;
    }

    setSplashScreenMessage('ready!');
    logger.info('ready!');
    server.sendProductLog(LOG_APPLICATION_START);

    startOrchestration();
  });
}

export function stop() {
  server.sendProductLog(LOG_APPLICATION_STOP);
  logger.info('stopping application');

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

export function onError(err) {
  console.error(err); // eslint-disable-line no-console
  server.sendProductLog(LOG_APPLICATION_ERROR, err.message);
  app.exit(1);
}
