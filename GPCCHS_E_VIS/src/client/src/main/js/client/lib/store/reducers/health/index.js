import _ from 'lodash/fp';
import {
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_CRITICAL,
  HEALTH_STATUS_WARNING,
} from 'common/constants';
import { createSelector } from 'reselect';
import _some from 'lodash/some';
import _get from 'lodash/get';

import * as types from '../../types';

/* --- Reducer -------------------------------------------------------------- */

const initialState = {
  dcStatus: HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'congestion')
  hssStatus: HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'warning', 2:'error')
  mainStatus: HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'warning', 2:'error')
  windowsStatus: {}, // object
  lastPubSubTimestamp: null, // number
};

export default function health(state = initialState, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return _.set('windowsStatus', {}, state);
    case types.WS_WINDOW_CLOSE:
      return _.update('windowsStatus', _.omit(action.payload.windowId), state);
    case types.HSS_UPDATE_DC_STATUS:
      return Object.assign(
        {},
        state,
        { dcStatus: action.payload.status }
      );
    case types.HSS_UPDATE_HEALTH_STATUS:
      return Object.assign(
        {},
        state,
        { hssStatus: action.payload.status }
      );
    case types.HSS_UPDATE_MAIN_STATUS:
      return Object.assign(
        {},
        state,
        { mainStatus: action.payload.status }
      );
    case types.HSS_UPDATE_WINDOW_STATUS:
      return Object.assign(
        {},
        state,
        {
          windowsStatus: {
            ...state.windowsStatus,
            [action.payload.windowId]: action.payload.status,
          },
        }
      );
    case types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP:
      return Object.assign(
        {},
        state,
        { lastPubSubTimestamp: action.payload.timestamp }
      );
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */


// simple
export const getHealth = state => state.health;
export const getDcStatus = state => state.health.dcStatus;
export const getHssStatus = state => state.health.hssStatus;
export const getMainStatus = state => state.health.mainStatus;
export const getWindowsStatus = state => state.health.windowsStatus;
export const getLastPubSubTimestamp = state => state.health.lastPubSubTimestamp;

// simple
// TODO : test dbrugne
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
export const getHealthMapForWindow = createSelector([
  getHealth,
  (state, { windowId }) => windowId,
], ({ dcStatus, hssStatus, mainStatus, windowsStatus, lastPubSubTimestamp }, windowId) => ({
  dc: dcStatus,
  hss: hssStatus,
  main: mainStatus,
  window: _get(windowsStatus, [windowId], HEALTH_STATUS_HEALTHY),
  lastPubSubTimestamp,
}));
