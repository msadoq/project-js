import {
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_CRITICAL,
  HEALTH_STATUS_WARNING,
} from 'common/constants';
import { createSelector } from 'reselect';
import _some from 'lodash/some';
import _get from 'lodash/get';

export const getHealth = state => state.health;
export const getDcStatus = state => state.health.dcStatus;
export const getHssStatus = state => state.health.hssStatus;
export const getMainStatus = state => state.health.mainStatus;
export const getWindowsStatus = state => state.health.windowsStatus;
export const getLastPubSubTimestamp = state => state.health.lastPubSubTimestamp;

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
