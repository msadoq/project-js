import _throttle from 'lodash/throttle';
import _memoize from 'lodash/memoize';
import simple from '../simpleActionCreator';
import * as types from '../types';
import {
  getDcStatus,
  getHssStatus,
  getLastPubSubTimestamp,
} from '../selectors/health';

export const updateDcStatus = simple(types.HSS_UPDATE_DC_STATUS, 'status');
export const updateHssStatus = simple(types.HSS_UPDATE_HEALTH_STATUS, 'status');
export const updateMainStatus = simple(types.HSS_UPDATE_MAIN_STATUS, 'status');
export const updateWindowStatus = simple(types.HSS_UPDATE_WINDOW_STATUS, 'windowId', 'status');
export const updateLastPubSubTimestamp = simple(types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP, 'timestamp');

// we need to memoize to keep throttling computed informations in memory
const updateLastPubSubTimestampThrottled = _memoize(delay => _throttle(
  (dispatch, timestamp) => dispatch(updateLastPubSubTimestamp(timestamp)),
  delay,
  { leading: true }
));

export const updateHealth = ({ dcStatus, hssStatus, lastPubSubTimestamp }, throttleDelay) =>
  (dispatch, getState) => {
    if (getDcStatus(getState()) !== dcStatus) {
      dispatch(updateDcStatus(dcStatus));
    }
    if (getHssStatus(getState()) !== hssStatus) {
      dispatch(updateHssStatus(hssStatus));
    }
    if (getLastPubSubTimestamp(getState()) !== lastPubSubTimestamp) {
      updateLastPubSubTimestampThrottled(throttleDelay)(dispatch, lastPubSubTimestamp);
    }
  };
