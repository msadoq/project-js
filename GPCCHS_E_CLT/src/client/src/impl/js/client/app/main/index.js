import _ from 'lodash';
import debug from '../utils/mainDebug';
import installExtensions from './installExtensions';
import { initStore, getStore } from '../store/mainStore';
import { connect, disconnect, getWebsocket } from '../websocket/mainWebsocket';
import { sync as syncWindows } from './windows';
import readWorkspace from '../documents/workspace';
import loadWorkspace from './loadWorkspace';
import { getStatus as getMainWsStatus } from '../store/mutations/hssReducer';
import { getStatus as getAppStatus } from '../store/mutations/hscReducer';
import { updateStatus } from '../store/mutations/hscActions';
import menu from'./menu';

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
    readWorkspace(process.env.FMD_ROOT, 'dev.workspace.json', (err, workspace) => {
      if (err) {
        throw err;
      }

      loadedWorkspace = workspace;
      dispatch(updateStatus('workspace-readed'));
    });
  }

  if (appStatus === 'workspace-readed') {
    getWebsocket().write({
      event: 'domainQuery',
    });
    dispatch(updateStatus('domain-query-sent-to-hss'));
  }

  if (appStatus === 'domain-retrieved') {
    // Replace timeline uuid with referenced value to send it to Qt
    const tbs = [];
    _.each(loadedWorkspace.timebars, (tb) => {
      const tbtmp = JSON.parse(JSON.stringify(tb));
      tbtmp.timelines = [];
      _.each(tb.timelines, (id) => {
        tbtmp.timelines.push(loadedWorkspace.timelines[id]);
      });
      tbs.push(tbtmp);
    });
    // Send tb init for VIMA widget
    getWebsocket().write({
      event: 'vimaTimebarInit',
      payload: tbs,
    });
    // Send tb init to hss
    getWebsocket().write({
      event: 'timebarUpdate',
      payload: { timebars: loadedWorkspace.timebars, timelines: loadedWorkspace.timelines },
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
