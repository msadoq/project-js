// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/health . . .
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Refacto reducers/health . . .
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Clean health.windowsStatus when close workspace or window
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add middlware to induce stress => not possible - Modify health logic, change as soon as the critical delay is reached
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Add JSDoc on codeEditor, domains & health reducers
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import _some from 'lodash/some';
import _get from 'lodash/get';
import {
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_CRITICAL,
  HEALTH_STATUS_WARNING,
} from '../../../constants';

import * as types from '../../types';

/* --- Reducer -------------------------------------------------------------- */

const initialState = {
  dcStatus: HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'congestion')
  hssStatus: HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'warning', 2:'error')
  mainStatus: HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'warning', 2:'error')
  windowsStatus: {}, // object
  lastPubSubTimestamp: null, // number,
  stress: {
    main: false,
    server: false,
    window: false,
  },
};

/**
 * Update health property in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */
export default function health(state = initialState, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return _.set('windowsStatus', {}, state);
    case types.WS_WINDOW_CLOSE:
      return _.update('windowsStatus', _.omit(action.payload.windowId), state);
    case types.HSS_UPDATE_DC_STATUS:
      return _.set('dcStatus', action.payload.status, state);
    case types.HSS_UPDATE_HEALTH_STATUS:
      return _.set('hssStatus', action.payload.status, state);
    case types.HSS_UPDATE_MAIN_STATUS:
      return _.set('mainStatus', action.payload.status, state);
    case types.HSS_UPDATE_WINDOW_STATUS:
      return _.set(['windowsStatus', action.payload.windowId], action.payload.status, state);
    case types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP:
      return _.set('lastPubSubTimestamp', action.payload.timestamp, state);
    case types.HSC_UPDATE_STRESS:
      switch (action.payload.process) {
        case 'main':
          return _.set('stress.main', action.payload.isStressed, state);
        case 'server':
          return _.set('stress.server', action.payload.isStressed, state);
        case 'windows':
          return _.set('stress.windows', action.payload.isStressed, state);
        default:
          return state;
      }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

// simple

/**
 * Get the health property in redux store.
 * @param {object} state - The current state.
 * @return {object} health property of redux store.
 */
export const getHealth = state => state.health;

/**
 * Get the status of DC in redux store.
 * @param {object} state - The current state.
 * @return {string} DC status.
 */
export const getDcStatus = state => state.health.dcStatus;

/**
 * Get the status of HSS in redux store.
 * @param {object} state - The current state.
 * @return {string} HSS status.
 */
export const getHssStatus = state => state.health.hssStatus;

/**
 * Get the status of Main in redux store.
 * @param {object} state - The current state.
 * @return {string} Main status.
 */
export const getMainStatus = state => state.health.mainStatus;

/**
 * Get the status of windows in redux store.
 * @param {object} state - The current state.
 * @return {object} window id as key, window status as value.
 */
export const getWindowsStatus = state => state.health.windowsStatus;

/**
 * Get the last pubsub timestamp in redux store.
 * @param {object} state - The current state.
 * @return {number} HSS status.
 */
export const getLastPubSubTimestamp = state => state.health.lastPubSubTimestamp;

export const getStress = state => state.health.stress;
export const isServerStressed = state => state.health.stress.server;
export const isMainStressed = state => state.health.stress.main;
export const isWindowsStressed = state => state.health.stress.windows;

// simple
// TODO : test dbrugne
/**
 * Get the status of dc, hss, main and the more critical status of windows.
 * @param {object} state - The current state.
 * @return {object}.
 */
export const getHealthMap = createSelector(
  getHealth,
  ({ dcStatus, hssStatus, mainStatus, windowsStatus }) => {
    let windows = HEALTH_STATUS_HEALTHY;
    if (_some(windowsStatus, w => w === HEALTH_STATUS_CRITICAL)) {
      windows = HEALTH_STATUS_CRITICAL;
    } else if (_some(windowsStatus, w => w === HEALTH_STATUS_WARNING)) {
      windows = HEALTH_STATUS_WARNING;
    }

    return {
      dc: dcStatus,
      hss: hssStatus,
      main: mainStatus,
      windows,
    };
  });

// simple
// TODO : test dbrugne
/**
 * Get the status of dc, hss, main and window status of a window.
 * @param {object} state - The current state.
 * @param {object} own props - { windowId }.
 * @return {object} healthMap for a window.
 */
export const getHealthMapForWindow = createSelector([
  getHealth,
  (state, { windowId }) => windowId,
], ({ dcStatus, hssStatus, mainStatus,
      windowsStatus, lastPubSubTimestamp, stress }, windowId) => ({
        dc: dcStatus,
        hss: {
          status: hssStatus,
          isStressed: stress.server,
        },
        main: {
          status: mainStatus,
          isStressed: stress.main,
        },
        windows: {
          status: _get(windowsStatus, [windowId], HEALTH_STATUS_HEALTHY),
          isStressed: stress.windows,
        },
        lastPubSubTimestamp,
      }));

export const getStressStatus = createSelector(
  getStress,
  ({ server, main, windows }) =>
    ({
      server,
      main,
      windows,
    })
);
