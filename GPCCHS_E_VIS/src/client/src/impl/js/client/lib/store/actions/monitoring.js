import _throttle from 'lodash/throttle';
import { HSC_PUBSUB_MONITORING_FREQUENCY } from 'common/constants';
import simple from '../simpleActionCreator';
import * as types from '../types';
import {
  getDcStatus,
  getHssStatus,
  getLastPubSubTimestamp
} from '../selectors/monitoring';

// eslint-disable-next-line import/prefer-default-export
export const updateDcStatus = simple(types.HSS_UPDATE_DC_STATUS, 'dcStatus');

export const updateHssStatus = simple(types.HSS_UPDATE_HSS_STATUS, 'hssStatus');

export const updateLastPubSubTimestamp = simple(types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP, 'lastPubSubTimestamp');

const updateLastPubSubTimestampThrottled = _throttle(
  (dispatch, timestamp) => dispatch(updateLastPubSubTimestamp(timestamp)),
  HSC_PUBSUB_MONITORING_FREQUENCY
);
export const updateMonitoring = (dcStatus, hssStatus, timestamp) =>
  (dispatch, getState) => {
    if (getDcStatus(getState()) !== dcStatus) {
      dispatch(updateDcStatus(dcStatus));
    }
    if (getLastPubSubTimestamp(getState()) !== timestamp) {
      updateLastPubSubTimestampThrottled(dispatch, timestamp);
    }
    if (getHssStatus(getState()) !== hssStatus) {
      dispatch(updateHssStatus(hssStatus));
    }
  };
