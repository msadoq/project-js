import { series } from 'async';
import {
  LIFECYCLE_WORKSPACE_LOADED,
  LIFECYCLE_CONNECTED_WITH_HSS,
  LIFECYCLE_READY,
  LIFECYCLE_STARTED,
  LIFECYCLE_LOST_HSS_CONNECTION,
} from 'common/constants';
import { clear as clearRegisteredCallbacks } from 'common/callbacks/register';
import { updateStatus } from '../store/actions/hss';
import { updateStatus as updateAppStatus } from '../store/actions/hsc';
import { connect } from './websocket';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';
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
 * - send domains query to HSS
 * - receive domains response from HSS
 * - send sessions query to HSS
 * - receive sessions response from HSS
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

export function onWorkspaceLoaded(dispatch) {
  dispatch(updateAppStatus(LIFECYCLE_WORKSPACE_LOADED));

  // open websocket connection
  connect();
}

export function onOpen(dispatch, requestDomains, requestSessions) {
  dispatch(updateStatus('main', 'connected'));
  dispatch(updateAppStatus(LIFECYCLE_CONNECTED_WITH_HSS));

  // TODO : update sessions and domains regularly
  series([
    // domains
    (callback) => {
      requestDomains((err, payload) => {
        if (err) {
          return callback(err);
        }

        dispatch(updateDomains(payload));
        return callback(null);
      });
    },
    // sessions
    (callback) => {
      requestSessions((err, payload = []) => {
        if (err) {
          return callback(err);
        }

        // TODO : remove following loop and offsetWithmachineTime key and implement an on-the-fly
        //        getSessionTime() call to DC
        const now = Date.now();
        payload.map(s => Object.assign(s, { offsetWithmachineTime: now - s.timestamp.ms }));

        dispatch(updateSessions(payload));
        return callback(null);
      });
    },
  ], (err) => {
    if (err) {
      // TODO : handle error in an error controller that dispatch to redux (displayed in react) and
      // output in console
      throw err;
    }

    dispatch(updateAppStatus(LIFECYCLE_READY));
  });
}

export function onDomainData(dispatch, payload) {
  dispatch(updateDomains(payload));
  dispatch(updateAppStatus(LIFECYCLE_READY));
}

export function onWindowOpened(dispatch) {
  dispatch(updateAppStatus(LIFECYCLE_STARTED));

  // pull data from HSS
  schedule();
}

export function onClose(dispatch) {
  setActingOn();
  stopDataPulling();
  clearRegisteredCallbacks();
  dispatch(updateAppStatus(LIFECYCLE_LOST_HSS_CONNECTION));
  dispatch(updateStatus('main', 'disconnected'));
  dispatch(removeAllRequests());
  dispatch(removeAllData());
  resetPreviousMap();

  // warning: timeout to handle a weird behavior that trigger data observer update
  setTimeout(setActingOff, 0);
}
