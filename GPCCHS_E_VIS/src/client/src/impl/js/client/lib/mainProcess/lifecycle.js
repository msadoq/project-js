import { constants as globalConstants } from 'common';

import { updateStatus } from '../store/actions/hss';
import { updateStatus as updateAppStatus } from '../store/actions/hsc';
import { updateDomains } from '../store/actions/domains';
import convertFromStore from './vima/convertFromStore';
import { removeAllData } from '../store/actions/viewData';
import { removeAllRequests } from '../store/actions/dataRequests';
import { setActingOn, setActingOff, resetPreviousMap } from './storeObserver';

/**
 * Launching
 *
 * - electron app started
 * - LIFECYCLE_NOT_STARTED
 * - open a file picker, read workspace, load in redux
 * - subscribe storeObserver (windowsObserver, requestData)
 * - connect ws
 * - send 'identity' to HSS
 * - receive 'authenticated' from HSS
 * - LIFECYCLE_CONNECTED_WITH_HSS
 * - send domain query to HSS
 * - receive domain response from HSS
 * - send timebar init to HSS
 * - receive 'ready' from HSS
 * - LIFECYCLE_READY
 * - first window opening
 * - LIFECYCLE_STARTED
 * - first 'requestData'
 * [- launch data pull]
 * [- launch cache cleaner]
 *
 * Server disconnecting
 * - remove all requests
 * - remove all data
 * - reset previous dataMap
 * [- stop data pull]
 * [- stop cache cleaner]
 *
 * Server reconnecting
 * - ...
 */

export const LIFECYCLE_NOT_STARTED = 'LIFECYCLE_NOT_STARTED';
export const LIFECYCLE_CONNECTED_WITH_HSS = 'LIFECYCLE_CONNECTED_WITH_HSS';
export const LIFECYCLE_READY = 'LIFECYCLE_READY';
export const LIFECYCLE_STARTED = 'LIFECYCLE_STARTED';

export function onOpen(dispatch, ws) {
  dispatch(updateStatus('main', 'connected'));
  ws.write({
    event: globalConstants.EVENT_IDENTITY,
    payload: {
      identity: 'main',
    },
  });
}

export function onAuthenticated(dispatch, ws) {
  dispatch(updateAppStatus(LIFECYCLE_CONNECTED_WITH_HSS));
  ws.write({ event: globalConstants.EVENT_DOMAIN_QUERY });
}

export function onDomainResponse(state, dispatch, ws, payload) {
  dispatch(updateDomains(payload));
  ws.write({
    event: globalConstants.EVENT_VIMA_TIMEBAR_INIT,
    payload: convertFromStore(state),
  });
}

export function onReady(dispatch) {
  dispatch(updateAppStatus(LIFECYCLE_READY));
}

export function onWindowOpened(dispatch) {
  dispatch(updateStatus(LIFECYCLE_STARTED));
}

export function onClose(dispatch) {
  setActingOn();
  dispatch(updateStatus('main', 'disconnected'));
  dispatch(removeAllRequests());
  dispatch(removeAllData());
  resetPreviousMap();
  // warning: timeout to handle a weird behavior that trigger data observer update
  setTimeout(setActingOff, 0);
}
