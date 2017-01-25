import globalConstants from 'common/constants';
import { should, getStore } from '../../common/test';
import {
  getLastPubSubTimestamp,
  getDcStatus,
} from './monitoring';

describe('store:monitoring:selectors', () => {
  describe('getLastPubSubTimestamp', () => {
    it('should return status', () => {
      const { getState } = getStore({ monitoring: { lastPubSubTimestamp: 42 } });
      getLastPubSubTimestamp(getState()).should.eql(42);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ monitoring: {} });
      should.not.exist(getLastPubSubTimestamp(getState()));
    });
  });
  describe('getDcStatus', () => {
    it('should return status', () => {
      const { getState } = getStore({
        monitoring: {
          dcStatus: globalConstants.DC_STATUS_CONGESTION
        },
      });
      getDcStatus(getState()).should.eql(globalConstants.DC_STATUS_CONGESTION);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ monitoring: {} });
      should.not.exist(getDcStatus(getState()));
    });
  });
});
