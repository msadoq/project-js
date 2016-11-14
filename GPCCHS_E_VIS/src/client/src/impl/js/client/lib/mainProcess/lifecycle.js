
import globalConstants from 'common/constants';

import { updateStatus } from '../store/actions/hss';
import { updateStatus as updateAppStatus } from '../store/actions/hsc';
import { connect } from './websocket';
import { updateDomains } from '../store/actions/domains';
import { removeAllData } from '../store/actions/viewData';
import { removeAllRequests } from '../store/actions/dataRequests';
import { setActingOn, setActingOff, resetPreviousMap } from './storeObserver';
import { schedule, clear as stopDataPulling } from './pull';

/**
 * Launching
 *
 * - electron app is starting
 * - LIFECYCLE_NOT_STARTED
 * - open a file picker, read workspace, load in redux
 * - LIFECYCLE_WORKSPACE_LOADED
 * - connect ws
 * - LIFECYCLE_CONNECTED_WITH_HSS
 * - send domain query to HSS
 * - receive domain response from HSS
 * - LIFECYCLE_READY
 * - first window opening
 * - LIFECYCLE_STARTED
 * - launch data pull
 * - first 'requestData'
 *
 * Server disconnecting
 * - LIFECYCLE_LOST_HSS_CONNECTION
 * - stop data pull
 * - remove all requests
 * - remove all data
 * - reset previous dataMap
 *
 * Server reconnecting
 * - LIFECYCLE_LOST_HSS_CONNECTION
 * - same as app launching
 * - LIFECYCLE_READY
 * - If new state is LIFECYCLE_READY and window opened => LIFECYCLE_STARTED
 */

export const LIFECYCLE_NOT_STARTED = 'LIFECYCLE_NOT_STARTED';
export const LIFECYCLE_WORKSPACE_LOADED = 'LIFECYCLE_WORKSPACE_LOADED';
export const LIFECYCLE_CONNECTED_WITH_HSS = 'LIFECYCLE_CONNECTED_WITH_HSS';
export const LIFECYCLE_READY = 'LIFECYCLE_READY';
export const LIFECYCLE_STARTED = 'LIFECYCLE_STARTED';

export const LIFECYCLE_LOST_HSS_CONNECTION = 'LIFECYCLE_LOST_HSS_CONNECTION';

export function onWorkspaceLoaded(dispatch) {
  dispatch(updateAppStatus(LIFECYCLE_WORKSPACE_LOADED));

  // open websocket connection
  connect();
}

export function onOpen(dispatch, ws) {
  dispatch(updateStatus('main', 'connected'));
  dispatch(updateAppStatus(LIFECYCLE_CONNECTED_WITH_HSS));
  ws.write({ event: globalConstants.EVENT_DOMAIN_QUERY });
}

export function onDomainData(dispatch, payload) {
  dispatch(updateDomains(payload));
  dispatch(updateAppStatus(LIFECYCLE_READY));
}

export function onSessionData(dispatch, payload) {
  // TODO to implement
  console.log('onSessionData', payload);
}

export function onWindowOpened(dispatch) {
  dispatch(updateAppStatus(LIFECYCLE_STARTED));

  // pull data from HSS
  schedule();
}

export function onClose(dispatch) {
  setActingOn();
  stopDataPulling();
  dispatch(updateAppStatus(LIFECYCLE_LOST_HSS_CONNECTION));
  dispatch(updateStatus('main', 'disconnected'));
  dispatch(removeAllRequests());
  dispatch(removeAllData());
  resetPreviousMap();

  // warning: timeout to handle a weird behavior that trigger data observer update
  setTimeout(setActingOff, 0);
}
