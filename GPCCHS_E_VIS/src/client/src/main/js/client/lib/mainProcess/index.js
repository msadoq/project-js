import { app, ipcMain } from 'electron';
import { series } from 'async';
import path from 'path';

import getLogger from '../common/logManager';
import parameters from '../common/configurationManager';
import {
  CHILD_PROCESS_SERVER,
  CHILD_PROCESS_DC,
  LOG_APPLICATION_STOP,
  LOG_APPLICATION_ERROR,
  SERVER_PROCESS_LAUNCHING_TIMEOUT,
  RTE_SESSIONS_REQUEST_LAUNCHING_TIMEOUT,
} from '../constants';
import { clear } from '../common/callbacks';
import { setRtd, getRtd } from '../rtdManager';

import enableDebug from './debug';
import { fork, get, kill } from '../common/processManager';
import makeCreateStore, { getStore } from './store';
import rendererController from './controllers/renderer';
import serverController from './controllers/server';
import { server } from './ipc';
import { add as addMessage } from '../store/actions/messages';
import { askOpenWorkspace, askOpenNewWorkspace, isWorkspaceOpening } from '../store/actions/hsc';
import { getIsWorkspaceOpening } from '../store/reducers/hsc';
import { setRteSessions } from '../store/actions/rte';
import setMenu from './menuManager';
import { start as startOrchestration, stop as stopOrchestration } from './orchestration';
import { splashScreen, codeEditor, windows } from './windowsManager';
import makeWindowsObserver from './windowsManager/observer';
import eventLoopMonitoring from '../common/eventLoopMonitoring';
import { updateMainStatus } from '../store/actions/health';
import makeElectronObserver from './electronManager';

let monitoring = {};
const HEALTH_CRITICAL_DELAY = parameters.get('MAIN_HEALTH_CRITICAL_DELAY');
const logger = getLogger('main:index');

const dynamicRequire = process.env.IS_BUNDLED === 'on' ? global.dynamicRequire : require; // eslint-disable-line

function scheduleTimeout(delay, message) {
  let timeout = setTimeout(() => {
    logger.error(`Timeout during application launching (task: ${message})`);
    timeout = null;
    app.quit();
  }, delay);

  return () => timeout !== null && clearTimeout(timeout);
}

export function onStart() {
  // electron topbar menu initialization
  setMenu();

  // enable electron debug and DevTools
  // (not installable when bundled and doesn't needed when DEBUG is off)
  if (process.env.IS_BUNDLED !== 'on' && parameters.get('DEBUG') === 'on') {
    enableDebug();
  }

  // mount IPC controller with renderer processes
  ipcMain.on('windowRequest', rendererController);
  series([
    function openSplashScreen(callback) {
      splashScreen.open(callback);
    },
    function launchDcStub(callback) {
      if (parameters.get('STUB_DC_ON') !== 'on') {
        callback(null);
        return;
      }

      splashScreen.setMessage('starting data simulator process...');
      logger.info('starting data simulator process...');
      fork(
        CHILD_PROCESS_DC,
        `${parameters.get('path')}/lib/stubProcess/dc.js`,
        {
          execPath: parameters.get('NODE_PATH'),
          env: ({ mainProcessConfig: JSON.stringify(parameters.getAll()) }),
        },
        null,
        callback
      );
    },
    function launchServer(callback) {
      // ipc with server
      const onMessage = data => serverController(get(CHILD_PROCESS_SERVER), data);

      // on server is ready callback
      const cancelTimeout = scheduleTimeout(SERVER_PROCESS_LAUNCHING_TIMEOUT, 'server');
      const onServerReady = (err, { initialState }) => {
        cancelTimeout();

        if (err) {
          callback(err);
          return;
        }

        splashScreen.setMessage('loading application state...');
        logger.info('loading application state...');
        const isDebugEnabled = parameters.get('DEBUG') === 'on';
        // init Redux store in main process
        const store = makeCreateStore('main', isDebugEnabled)(initialState);
        store.subscribe(makeWindowsObserver(store));
        store.subscribe(makeElectronObserver(store));
        if (isDebugEnabled) {
          monitoring = eventLoopMonitoring({
            criticalDelay: HEALTH_CRITICAL_DELAY,
            onStatusChange: status => store.dispatch(updateMainStatus(status)),
            id: 'main',
          }, store);
        }
        callback(null);
      };

      if (process.env.IS_BUNDLED === 'on') {
        splashScreen.setMessage('starting data server process...');
        logger.info('starting data server process...');
        fork(
          CHILD_PROCESS_SERVER,
          `${parameters.get('path')}/server.js`,
          {
            execPath: parameters.get('NODE_PATH'),
            env: ({ mainProcessConfig: JSON.stringify(parameters.getAll()), APP_ENV: 'server' }),
          },
          onMessage,
          onServerReady
        );
      } else {
        splashScreen.setMessage('starting data server process... (dev)');
        logger.info('starting data server process... (dev)');

        fork(
          CHILD_PROCESS_SERVER,
          `${parameters.get('path')}/lib/serverProcess/index.js`,
          {
            execPath: parameters.get('NODE_PATH'),
            execArgv: ['-r', 'babel-register', '-r', 'babel-polyfill'],
            env: ({ mainProcessConfig: JSON.stringify(parameters.getAll()), APP_ENV: 'server' }),
          },
          onMessage,
          onServerReady
        );
      }
    },
    function initRtdClient(callback) {
      if (parameters.get('RTD_ON') === 'on') {
        const createRtd = dynamicRequire('rtd/catalogs').connect;
        const socket = parameters.get('RTD_UNIX_SOCKET');
        let stub = false;
        if (parameters.get('STUB_RTD_ON') === 'on') {
          stub = true;
        }
        splashScreen.setMessage('starting data RTD client...');
        logger.info('starting RTD client...');
        createRtd({ socket, stub }, (err, rtd) => {
          if (err) {
            callback(err);
            return;
          }
          setRtd(rtd);
          callback(null);
        });
      } else {
        callback(null);
      }
    },
    function openInitialWorkspace(callback) {
      splashScreen.setMessage('searching workspace...');
      logger.info('searching workspace...');

      const { dispatch } = getStore();
      const root = parameters.get('ISIS_DOCUMENTS_ROOT');

      if (!root) {
        logger.warn('No ISIS_DOCUMENTS_ROOT found');
        dispatch(addMessage('global', 'warning', 'No FMD support'));
        dispatch(askOpenNewWorkspace());
        callback(null);
        return;
      }

      const file = parameters.get('WORKSPACE');

      if (!file) {
        splashScreen.setMessage('loading default workspace...');
        logger.info('loading default workspace...');
        dispatch(addMessage('global', 'info', 'No WORKSPACE found'));
        dispatch(askOpenNewWorkspace());
        callback(null);
        return;
      }

      const absolutePath = path.join(root, file);

      splashScreen.setMessage(`loading ${file}`);
      logger.info(`loading ${file}`);

      splashScreen.setMessage('loading default workspace...');
      logger.info('loading default workspace...');
      dispatch(isWorkspaceOpening(true));
      dispatch(askOpenWorkspace(null, absolutePath));
      callback(null);
    },
    function requestCatalogSessions(callback) {
      // should have rte sessions in store at start
      if (parameters.get('RTD_ON') === 'on') {
        splashScreen.setMessage('requesting catalog explorer sessions...');
        logger.info('requesting catalog explorer sessions...');
        const cancelTimeout = scheduleTimeout(RTE_SESSIONS_REQUEST_LAUNCHING_TIMEOUT, 'rteSession');
        const { dispatch } = getStore();
        const rtdApi = getRtd();
        rtdApi.getDatabase().getSessionList((err, sessions) => {
          cancelTimeout();
          if (err) {
            callback(err);
            return;
          }
          splashScreen.setMessage('injecting catalog explorer sessions...');
          logger.info('injecting catalog explorer sessions...');
          dispatch(setRteSessions(sessions));
          callback(null);
        });
      } else {
        callback(null);
      }
    },
  ], (err) => {
    if (err) {
      throw err;
    }

    splashScreen.setMessage('ready!');
    logger.info('ready!');
    // TODO dbrugne move in server lifecycle ========================================
    startOrchestration();
    if (monitoring.startMonitoring) monitoring.startMonitoring();
    // TODO dbrugne move in server lifecycle ========================================
  });
}

export function onStop() {
  server.sendProductLog(LOG_APPLICATION_STOP);
  logger.info('stopping application');

  // TODO dbrugne move in server lifecycle ========================================
  // stop orchestration
  if (monitoring.stopMonitoring) monitoring.stopMonitoring();
  stopOrchestration();
  // TODO dbrugne move in server lifecycle ========================================

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
