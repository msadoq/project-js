import _ from 'lodash';
import debug from '../utils/mainDebug';
import installExtensions from './installExtensions';
import { initStore, getStore } from '../store/mainStore';
import observeStore from '../store/observeStore';
import { connect, disconnect, getWebsocket } from '../websocket/mainWebsocket';
import { sync as syncWindows } from './windows';
import { sync as syncData } from '../connectedData';
import readWorkspace from '../documents/workspace';
import loadWorkspace from './loadWorkspace';
import { getStatus as getMainWsStatus } from '../store/mutations/hssReducer';
import { getStatus as getAppStatus } from '../store/mutations/hscReducer';
import { updateStatus } from '../store/mutations/hscActions';
import menu from'./menu';
import parameters from './parameters';

const logger = debug('main:launch');

let storeUnsubscribe;
let loadedWorkspace;

function onStoreUpdate(previousState, state) {
  const lastKnownAppStatus = getAppStatus(previousState);
  const appStatus = getAppStatus(state);

  if (lastKnownAppStatus !== appStatus) {
    logger.info(`appStatus from ${lastKnownAppStatus} to ${appStatus}`);
  }

  const dispatch = getStore().dispatch;

  /**
   * Client lifecycle:
   * - not-started
   * - main process WS connection (out of this file)
   * - read workspace files
   * - query domains
   * - receive domains (out of this file)
   * - send timebar to VIMA
   * - get 'ready' from HSS (out of this file, remove)
   * - load workspace in redux
   * - first syncWindows
   */

  const mainWsStatus = getMainWsStatus(state, 'main');
  if (appStatus === 'not-started' && mainWsStatus && mainWsStatus.status === 'connected') {
    dispatch(updateStatus('connected-with-hss'));
  }

  if (appStatus === 'connected-with-hss') {
    readWorkspace(parameters.FMD_ROOT, 'dev.workspace.json', (err, workspace) => {
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
    // replace timeline uuid with referenced value to send it to Qt
    const tbs = [];
    _.each(loadedWorkspace.timebars, (tb) => {
      const tbtmp = JSON.parse(JSON.stringify(tb));
      tbtmp.timelines = [];
      _.each(tb.timelines, (id) => {
        tbtmp.timelines.push(loadedWorkspace.timelines[id]);
      });
      tbs.push(tbtmp);
    });
    getWebsocket().write({
      event: 'vimaTimebarInit',
      payload: tbs,
    });
    dispatch(updateStatus('timebar-sent-to-hss'));
  }

  if (appStatus === 'hss-ready') {
    dispatch(updateStatus('loading-workspace'));
    loadWorkspace(loadedWorkspace);
    dispatch(updateStatus('started'));
  }

  if (appStatus === 'started') {
    syncWindows(previousState, state);
    syncData(previousState, state);
  }
}

export async function start() {
  logger.info('app start');
  try {
    await installExtensions();
    initStore();
    storeUnsubscribe = observeStore(getStore(), onStoreUpdate);
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
