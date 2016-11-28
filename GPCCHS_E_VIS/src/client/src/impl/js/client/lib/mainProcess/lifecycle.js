import { series } from 'async';
import {
  LIFECYCLE_CONNECTED_WITH_HSS,
  LIFECYCLE_STARTED,
  LIFECYCLE_LOST_HSS_CONNECTION,
} from 'common/constants';
import { clear as clearRegisteredCallbacks } from 'common/callbacks/register';
import { updateStatus } from '../store/actions/hss';
import { getWorkspaceOpened } from '../store/selectors/hsc';
import { updateStatus as updateAppStatus } from '../store/actions/hsc';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';
import { removeAllData } from '../store/actions/viewData';
import openWorkspace from './openWorkspace';
import { start, stop } from './orchestration';

/**
 * Launching
 *
 * - electron app is starting
 * - LIFECYCLE_NOT_STARTED
 * - connect ws
 * - LIFECYCLE_CONNECTED_WITH_HSS
 * - send domains query to HSS
 * - receive domains response from HSS
 * - send sessions query to HSS
 * - receive sessions response from HSS
 * - if not already opened, read workspace or load default one, load in redux
 * - LIFECYCLE_STARTED
 * - launch data pull
 * - first 'requestData'
 *
 * Server disconnecting
 * - LIFECYCLE_LOST_HSS_CONNECTION
 * - stop orchestration
 * - remove all registered callbacks
 * - remove all data
 *
 * Server reconnecting
 * - LIFECYCLE_LOST_HSS_CONNECTION
 * - same as app launching
 * - LIFECYCLE_STARTED
 */

export function onOpen(getState, dispatch, requestDomains, requestSessions) {
  dispatch(updateStatus('main', 'connected'));
  dispatch(updateAppStatus(LIFECYCLE_CONNECTED_WITH_HSS));

  // TODO : retrieve sessions list on-demand and session time on realtime jump
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
    // workspace
    (callback) => {
      if (getWorkspaceOpened(getState())) {
        return callback(null);
      }

      openWorkspace(dispatch, getState, callback);
    }
  ], (err) => {
    if (err) {
      // TODO : handle error in an error controller that dispatch to redux (displayed in react) and
      // output in console
      throw err;
    }

    dispatch(updateAppStatus(LIFECYCLE_STARTED));
  });
}

export function onStarted() {
  // start orchestration
  start();
}

export function onClose(dispatch) {
  // stop orchestration
  stop();

  clearRegisteredCallbacks();
  dispatch(updateAppStatus(LIFECYCLE_LOST_HSS_CONNECTION));
  dispatch(updateStatus('main', 'disconnected'));
  dispatch(removeAllData());
}
