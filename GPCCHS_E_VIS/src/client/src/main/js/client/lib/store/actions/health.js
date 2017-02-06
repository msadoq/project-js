import _throttle from 'lodash/throttle';
import { HSC_PUBSUB_MONITORING_FREQUENCY } from 'common/constants';
import simple from '../simpleActionCreator';
import * as types from '../types';
import {
  getDcStatus,
  getHssStatus,
  getMainStatus,
  getLastPubSubTimestamp,
} from '../selectors/health';

/**
 * Health status
 */
export const updateDcStatus = simple(types.HSS_UPDATE_DC_STATUS, 'status');
export const updateHssStatus = simple(types.HSS_UPDATE_HEALTH_STATUS, 'status');
export const updateMainStatus = simple(types.HSS_UPDATE_MAIN_STATUS, 'status');
export const updateWindowsStatus = simple(types.HSS_UPDATE_WINDOWS_STATUS, 'status');

/**
 * Identify last received timestamp from pubsub data
 */
export const updateLastPubSubTimestamp = simple(types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP, 'timestamp');
const updateLastPubSubTimestampThrottled = _throttle(
  (dispatch, timestamp) => dispatch(updateLastPubSubTimestamp(timestamp)),
  HSC_PUBSUB_MONITORING_FREQUENCY
);

// TODO rperrot test
export const updateHealth = ({ dcStatus, hssStatus, mainStatus, lastPubSubTimestamp }) =>
  (dispatch, getState) => {
    if (getDcStatus(getState()) !== dcStatus) {
      dispatch(updateDcStatus(dcStatus));
    }
    if (getHssStatus(getState()) !== hssStatus) {
      dispatch(updateHssStatus(hssStatus));
    }
    if (getMainStatus(getState()) !== mainStatus) {
      dispatch(updateMainStatus(mainStatus));
    }
    if (getLastPubSubTimestamp(getState()) !== lastPubSubTimestamp) {
      updateLastPubSubTimestampThrottled(dispatch, lastPubSubTimestamp);
    }
  };
