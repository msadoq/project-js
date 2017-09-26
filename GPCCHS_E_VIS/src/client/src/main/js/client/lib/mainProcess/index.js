// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Replace some console uses by new Console
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Revert "Replace some console uses by new Console"
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Show / Hide Text Editor Window
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Deprecate internal monitoring code and parameter
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Change configuration FMD_ROOT_DIR to ISIS_DOCUMENTS_ROOT
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Fix bug on closing main window
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Merge branch 'dev' into abesson-html-editor
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Improve and debug code editor
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Rename menu in menuManager and move menu.js into menuManager/index.js
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Merge branch 'dev' into abesson-html-editor
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Refactor window management in main process in a viewManager
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Pass all parameters to sub node processes
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : make tests on editor .
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : add rtd stub to the start sequence
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : merge dev into abesson-html-editor and resolve conflicts
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #3622 : 08/03/2017 : update rtdManager tests and onOpenInspector controller
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Some documentManager fixes . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : documentManager API now exposes all open* functions
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove mainProcess/openWorkspace file . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Rename documentManager files . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Move all open* thunks in documentManager/actions
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Refacto openDefaultWorkspace in mainProcess .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Add timeout on DC data fetching on application startup to help diagnosis of DC communication problem
// VERSION : 1.1.2 : FA : #5846 : 17/03/2017 : Add REALTIME config parameter .
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : add context in dynamic view for opening parameter in inspector
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Lint mainProcess/index . . .
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Remove messages when close a workspace
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Remove visuWindow from document .
// VERSION : 1.1.2 : DM : #5822 : 28/03/2017 : update the rtd stub launching
// VERSION : 1.1.2 : DM : #5822 : 28/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Add no fmd support .
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Remove duplicate error message when loading default workspace
// VERSION : 1.1.2 : DM : #5822 : 03/04/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5822 : 04/04/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : When application error is raised, display full error with stack trace
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Implement a new "isomorphic" createStore to centralize Redux configuration
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Remove obsolete comments and shebang
// VERSION : 1.1.2 : FA : #5846 : 10/05/2017 : Add option to launch vima in realtime play mode
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : Merge branch 'dev' into dbrugne-universal-store
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : remove use of sinon for rtd stub
// VERSION : 1.1.2 : FA : #5846 : 12/05/2017 : Launch vima in real time play mode: create a unique action
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup server process fork configuration code
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup Redux store configuration and introduce three distinct store enhancers for future store synchronisation implementation.
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Merge branch 'dev' into dbrugne-universal-store
// VERSION : 1.1.2 : DM : #5828 : 22/05/2017 : Move server from server/ sub-component to client/lib/serverProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move common/callback and common/ipc modules in client sub-component
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix process.env definePlugin in webpack
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix bug about loading default workspace
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : RTD can now be disabled using RTD_ON in config
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Modify protobuf loading strategy : - Move adapters in another folder - New architecture generated for adapters folder - Add raw adapter mechanism
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Add types.proto in dc - Add parse/stringify mechanism to configurationManager
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 16/06/2017 : Several changes : - Lint pass - Modify stub to use encode/decode of adapters (row AND protobuf) - Add a new stubs.js file to load the stubs present in the adapters plugins
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : #5838 : 16/06/2017 : Add a third parameter to childProcess to allow args passing to child process
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Cleanup child process fork method options
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : FA : #6798 : 20/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Add timeout around server process launching
// VERSION : 1.1.2 : FA : #6798 : 21/06/2017 : Stringify parameters to forked process ( stub, server)
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Merge branch 'dev' into dbrugne-lifecycle
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Move windows observer from main orchestration in a pure store observer
// VERSION : 1.1.2 : FA : #6798 : 23/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Remove startInPlay feature . .
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : Remove unused registerGlobal in mainProcess/index
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Fix server process lauching timeout issue in development
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 28/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 05/07/2017 : Fix crash when rtd is off
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Implement dialogObserver in mainProcess .
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Small fix to access DEBUG value in conf, in forked process
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add middlware to induce stress => not possible - Modify health logic, change as soon as the critical delay is reached
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Modify health monitoring mechanism : - Handle properly start and stop - Add critical delay value in conf - Only start monitoring on DEBUG
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add health mechanism on each process
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Ask open workspace at start in mainProcess/index
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Correct VIMA shutdown on new workspace : add middleware for synchronous treatment
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : serverProcess has now a APP_ENV='server' even in dev mode
// VERSION : 1.1.2 : FA : #7355 : 27/07/2017 : RTD is now optional on VIMA installation
// VERSION : 1.1.2 : FA : #7328 : 02/08/2017 : Fix closing vima when default workspace is unknown or invalid
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess + replace old IPC productLog
// VERSION : 1.1.2 : DM : #6700 : 23/08/2017 : Update cache clean mechanism in dev tools
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : Add middleware to apply pause on master overload
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --PAGE
// END-HISTORY
// ====================================================================

import { app, ipcMain } from 'electron';
import { series } from 'async';

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
import { sendProductLog } from '../store/actions/hsc';
import { getIsWorkspaceOpening } from '../store/reducers/hsc';
import { setRteSessions } from '../store/actions/rte';
import setMenu from './menuManager';
import { splashScreen, codeEditor, windows } from './windowsManager';
import makeWindowsObserver from './windowsManager/observer';
import eventLoopMonitoring from '../common/eventLoopMonitoring';
import { updateMainStatus } from '../store/actions/health';
import makeElectronObserver from './electronManager';
import loadInitialDocuments from './loadInitialDocuments';

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
        monitoring = eventLoopMonitoring({
          criticalDelay: HEALTH_CRITICAL_DELAY,
          onStatusChange: status => store.dispatch(updateMainStatus(status)),
          id: 'main',
        }, store);
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
      loadInitialDocuments(getStore().dispatch, splashScreen);
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
    // startOrchestration();
    if (monitoring.startMonitoring) monitoring.startMonitoring();
    // TODO dbrugne move in server lifecycle ========================================
  });
}

export function onStop() {
  getStore().dispatch(sendProductLog(LOG_APPLICATION_STOP));
  logger.info('stopping application');

  // TODO dbrugne move in server lifecycle ========================================
  // stop orchestration
  if (monitoring.stopMonitoring) monitoring.stopMonitoring();
  // stopOrchestration();
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
  getStore().dispatch(sendProductLog(LOG_APPLICATION_ERROR, err.message));
  logger.error('Application error:', err);
  app.exit(1);
}
