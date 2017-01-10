import { app } from 'electron';
import { series } from 'async';
import getLogger from 'common/log';
import { LIFECYCLE_STARTED } from 'common/constants'; // TODO deprecated
import monitoring from 'common/log/monitoring';
import parameters from 'common/parameters';
import { clear } from 'common/callbacks';

import enableDebug from './debug';
import { initStore, getStore } from '../store/mainStore';
import './menu';
import { init } from '../ipc/main';
import { fork, kill, rpc } from './childProcess';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';

import { readWkFile, openDefaultWorkspace } from './openWorkspace';

import { start as startOrchestration, stop as stopOrchestration } from './orchestration';

import { updateStatus } from '../store/actions/hss'; // TODO deprecated
import { updateStatus as updateAppStatus } from '../store/actions/hsc'; // TODO deprecated

const logger = getLogger('main:index');

const PROCESS_ID_SERVER = 1; // TODO constant
const PROCESS_ID_DC = 2; // TODO constant

export function start() {
  series([
    callback => enableDebug(callback),
    (callback) => {
      // monitoring
      monitoring.start();

      // redux store
      const store = initStore();
      logger.verbose('initial state', store.getState());

      // ipc with renderer
      init();

      callback(null);
    },
    (callback) => {
      if (parameters.get('STUB_DC_ON') !== 'on') {
        return callback(null);
      }

      fork(
        PROCESS_ID_DC,
        `${parameters.get('path')}/node_modules/common/stubs/dc.js`,
        callback
      );
    },
    (callback) => {
      fork(
        PROCESS_ID_SERVER,
        `${parameters.get('path')}/node_modules/server/index.js`,
        callback
      );
    },
    // should have sessions in store at start
    (callback) => {
      rpc(PROCESS_ID_SERVER, 'getSessions', null, (sessions) => {
        logger.debug('received sessions from server');
        getStore().dispatch(updateSessions(sessions));
        callback(null);
      });
    },
    // should have domains in store at start
    (callback) => {
      rpc(PROCESS_ID_SERVER, 'getDomains', null, (domains) => {
        logger.debug('received domains from server');
        getStore().dispatch(updateDomains(domains));
        callback(null);
      });
    },
    (callback) => {
      const { dispatch, getState } = getStore();
      const root = parameters.get('FMD_ROOT_DIR');
      const file = parameters.get('OPEN');

      return (file)
        ? readWkFile(dispatch, getState, root, file, callback)
        : openDefaultWorkspace(dispatch, root, callback);
    }
  ], (err) => {
    if (err) {
      throw err;
    }

    const { dispatch } = getStore();
    dispatch(updateStatus('main', 'connected'));
    dispatch(updateAppStatus(LIFECYCLE_STARTED));

    startOrchestration();
  });
}

export function stop() {
  // stop monitoring
  monitoring.stop();

  // stop orchestration
  stopOrchestration();

  // stop child processes
  kill(PROCESS_ID_SERVER);
  kill(PROCESS_ID_DC);

  // registered callbacks
  clear();
}

export function onWindowsClose() {
  const state = getStore().getState();
  if (!state.hsc.isWorkspaceOpening) { // TODO implement selector
    app.quit();
  }
}
