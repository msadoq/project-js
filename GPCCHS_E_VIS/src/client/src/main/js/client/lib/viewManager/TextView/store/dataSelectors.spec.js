import moment from 'moment';
import { should } from '../../../common/test';
import { getCount, getLastValue } from './dataSelectors';

describe('viewManager/TextView/store/dataSelector', () => {
  describe('getCount', () => {
    it('counts data: empty state', () => {
      getCount({ TextViewData: {} }).should.be.eql({ all: 0 });
    });
    it('counts data', () => {
      const state = {
        TextViewData: {
          v1: { index: { ep1: 10 } },
          v2: { index: { ep1: 10, ep2: 2, ep3: 5 } },
          v3: {},
          v4: {},
          v5: {},
        },
      };
      getCount(state).should.be.eql({
        v1: 1,
        v2: 3,
        v3: 0,
        v4: 0,
        v5: 0,
        all: 4,
      });
    });
  });
  describe('getLastValue', () => {
    it('should support empty state', () => {
      should.not.exist(getLastValue({ TextViewData: {} }, { epName: 'ep1', viewId: 'v1' }));
    });
    it('should support empty props', () => {
      const state = {
        TextViewData: {
          v1: {
            index: { ep1: 123 },
            values: { ep1: { value: 1 } },
          },
        },
      };
      should.not.exist(getLastValue(state, { epName: 'ep1' }));
      should.not.exist(getLastValue(state, { viewId: 'v1' }));
    });
    it('get last value', () => {
      const state = {
        TextViewData: {
          v1: {
            index: { ep1: 123 },
            values: { ep1: { value: 1 } },
          },
        },
      };
      getLastValue(state, { epName: 'ep1', viewId: 'v1' }).should.be.eql({
        timestamp: moment(123).utc().toISOString(),
        value: 1,
      });
    });
  });
});
