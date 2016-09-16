import debug from '../utils/debug';
import installExtensions from './installExtensions';
import { initStore, getStore } from '../store/mainStore';
import { connect, disconnect, getWebsocket } from './websocket';
import { sync as syncWindows } from './windows';
import workspace from '../documents/workspace';
import loadWorkspace from './loadWorkspace';
import { getStatus as getMainWsStatus } from '../store/mutations/hssReducer';
import { getStatus as getAppStatus } from '../store/mutations/hscReducer';
import { updateStatus } from '../store/mutations/hscActions';

const logger = debug('main:launch');

let storeUnsubscribe;
let loadedWorkspace;
let lastKnownAppStatus;

function onStoreUpdate() {
  const state = getStore().getState();
  const dispatch = getStore().dispatch;
  const appStatus = getAppStatus(state);
  if (lastKnownAppStatus !== appStatus) {
    logger.info(appStatus);
  }

  if (appStatus === 'not-started' && getMainWsStatus(state, 'main').status === 'connected') {
    dispatch(updateStatus('connected-with-hss'));
  }

  if (appStatus === 'connected-with-hss') {
    workspace.readWorkspace('dev.workspace.json', (err, workspace) => {
      if (err) {
        throw err;
      }

      loadedWorkspace = workspace;
      dispatch(updateStatus('workspace-readed'));
    });
  }

  if (appStatus === 'workspace-readed') {
    getWebsocket().write({
      event: 'timebarUpdate',
      payload: {
        timebar: loadedWorkspace.timebar, // TODO handle on HSS
      },
    });
    dispatch(updateStatus('timebar-sent-to-hss'));
  }

  if (appStatus === 'hss-ready') {
    dispatch(updateStatus('loading-workspace'));
    loadWorkspace(loadedWorkspace);
    dispatch(updateStatus('started'));
  }

  if (appStatus === 'started') {
    syncWindows();
  }
}

export async function start() {
  logger.info('app start');
  try {
    await installExtensions();
    initStore();
    storeUnsubscribe = getStore().subscribe(onStoreUpdate);
    connect();
  } catch (e) {
    logger.error(e);
  }
}

export function stop() {
  logger.info('app stop');
  try {
    disconnect();
    if (!storeUnsubscribe) {
      storeUnsubscribe();
      storeUnsubscribe = null;
    }
  } catch (e) {
    logger.error(e);
  }
}
