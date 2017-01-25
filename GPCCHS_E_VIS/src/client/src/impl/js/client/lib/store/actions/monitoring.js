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

export const updateMonitoring = (dcStatus, hssStatus, lastPubSubTimestamp) =>
  (dispatch, getState) => {
    if (getDcStatus(getState()) !== dcStatus) {
      dispatch(updateDcStatus(dcStatus));
    }
    if (getLastPubSubTimestamp(getState()) !== lastPubSubTimestamp) {
      dispatch(updateLastPubSubTimestamp(lastPubSubTimestamp));
    }
    if (getHssStatus(getState()) !== hssStatus) {
      dispatch(updateHssStatus(hssStatus));
    }
  };
