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
export const getAppStatus = createSelector(
  [getHealth],
  ({ dcStatus, hssStatus, mainStatus, windowsStatus }) => {
    let app = HEALTH_STATUS_HEALTHY;

    const criticals = [];
    const warnings = [];
    const fill = (name, status) => {
      if (status === HEALTH_STATUS_CRITICAL) {
        criticals.push(name);
        app = HEALTH_STATUS_CRITICAL;
      } else if (status === HEALTH_STATUS_WARNING) {
        warnings.push(name);
        if (app === HEALTH_STATUS_HEALTHY) {
          app = HEALTH_STATUS_WARNING;
        }
      }
    };

    fill('dc', dcStatus);
    fill('hss', hssStatus);
    fill('main', mainStatus);

    let windows = HEALTH_STATUS_HEALTHY;
    if (_some(windowsStatus, w => w === HEALTH_STATUS_WARNING)) {
      windows = HEALTH_STATUS_CRITICAL;
    } else if (_some(windowsStatus, w => w === HEALTH_STATUS_WARNING)) {
      windows = HEALTH_STATUS_WARNING;
    }
    fill('windows', windows);

    return { status: app, criticals, warnings };
  });

// TODO : test dbrugne
export const getHealthMap = createSelector([
  getHealth,
  (state, { windowId }) => windowId,
], ({ dcStatus, hssStatus, mainStatus, windowsStatus, lastPubSubTimestamp }, windowId) => ({
  dc: dcStatus,
  hss: hssStatus,
  main: mainStatus,
  window: _get(windowsStatus, [windowId], HEALTH_STATUS_HEALTHY),
  lastPubSubTimestamp,
}));
