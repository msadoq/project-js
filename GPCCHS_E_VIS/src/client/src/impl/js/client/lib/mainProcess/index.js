import { app } from 'electron';
import { fork } from 'child_process';
import getLogger from 'common/log';
import monitoring from 'common/monitoring';
import parameters from 'common/parameters';

import enableDebug from './debug';
import { initStore, getStore } from '../store/mainStore';
import storeObserver from './storeObserver';
import { connect, disconnect } from './websocket';
import './menu';
import '../ipc/main';

const logger = getLogger('GPCCHS:mainProcess:index');

let storeSubscription = null;
let serverProcess = null;
let dcStubProcess = null;

function spawnChildProcess(path) {
  const forkOptions = {
    execPath: '/usr/share/isis/node-v6.3.0-linux-x64/bin/node',
    env: {
      DEBUG: parameters.get('DEBUG'),
      LEVEL: parameters.get('LEVEL'),
      SERVER_PORT: parameters.get('SERVER_PORT'),
      ZMQ_GPCCDC_PUSH: parameters.get('ZMQ_GPCCDC_PUSH'),
      ZMQ_GPCCDC_PULL: parameters.get('ZMQ_GPCCDC_PULL'),
      STUB_DC_ON: parameters.get('STUB_DC_ON'),
      MONITORING: parameters.get('MONITORING'),
      PROFILING: parameters.get('PROFILING'),
      LOG: parameters.get('LOG'),
    },
  };
  return fork(path, forkOptions);
}

export async function start() {
  monitoring.start();
  logger.info('app start');
  try {
    await enableDebug();

    // spawn server
    serverProcess = spawnChildProcess(`${parameters.get('path')}/node_modules/server/index.js`);

    // spawn dc stub
    if (parameters.get('STUB_DC_ON') === 'on') {
      dcStubProcess = spawnChildProcess(`${parameters.get('path')}/node_modules/common/stubs/dc.js`);
    }

    // redux store
    const store = initStore();
    logger.verbose('initial state', store.getState());

    // main process store observer
    storeSubscription = store.subscribe(() => storeObserver(store));

    // websocket initial connection
    connect(parameters.get('HSS'));
  } catch (e) {
    logger.error(e);
  }
}

export function stop() {
  logger.info('app stop');
  try {
    // stop monitoring
    monitoring.stop();

    // remove store subscription
    if (storeSubscription) {
      storeSubscription();
    }

    // close websocket
    disconnect();

    // stop child processes
    if (serverProcess) {
      serverProcess.kill();
    }
    if (dcStubProcess) {
      dcStubProcess.kill();
    }
  } catch (e) {
    logger.error(e);
  }
}

export function onWindowsClose() {
  logger.info('windows close');
  const state = getStore().getState();
  if (!state.hsc.isWorkspaceOpening) { // TODO implement selector
    app.quit();
  }
}
