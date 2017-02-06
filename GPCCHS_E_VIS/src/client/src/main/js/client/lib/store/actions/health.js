import _throttle from 'lodash/throttle';
import { HSC_PUBSUB_MONITORING_FREQUENCY } from 'common/constants';
import simple from '../simpleActionCreator';
import * as types from '../types';
import {
  getDcStatus,
  getHssStatus,
  getLastPubSubTimestamp,
} from '../selectors/health';

/**
 * Health status
 */
export const updateDcStatus = simple(types.HSS_UPDATE_DC_STATUS, 'dcStatus');
export const updateHssStatus = simple(types.HSS_UPDATE_HSS_STATUS, 'hssStatus');

/**
 * Identify last received timestamp from pubsub data
 */
export const updateLastPubSubTimestamp = simple(types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP, 'lastPubSubTimestamp');
const updateLastPubSubTimestampThrottled = _throttle(
  (dispatch, timestamp) => dispatch(updateLastPubSubTimestamp(timestamp)),
  HSC_PUBSUB_MONITORING_FREQUENCY
);

/**
 * Identify slow renderers to ignore some ticks in orchestration
 */
export const addSlowRenderer = simple(types.HSC_ADD_SLOW_RENDERER, 'windowId', 'interval');
export const removeSlowRenderer = simple(types.HSC_REMOVE_SLOW_RENDERER, 'windowId');


// TODO rperrot test
export const updateHealth = (dcStatus, hssStatus, timestamp) =>
  (dispatch, getState) => {
    if (getDcStatus(getState()) !== dcStatus) {
      dispatch(updateDcStatus(dcStatus));
    }
    if (getHssStatus(getState()) !== hssStatus) {
      dispatch(updateHssStatus(hssStatus));
    }
    if (getLastPubSubTimestamp(getState()) !== timestamp) {
      updateLastPubSubTimestampThrottled(dispatch, timestamp);
    }
  };
