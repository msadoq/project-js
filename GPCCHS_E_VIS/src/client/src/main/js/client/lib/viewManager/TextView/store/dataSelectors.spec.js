import moment from 'moment';
import { getCount, getLastValue } from './dataSelectors';

describe('viewManager/TextView/store/dataSelector', () => {
  describe('getCount', () => {
    it('counts data: empty state', () => {
      expect(getCount({ TextViewData: {} })).toEqual({ all: 0 });
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
      expect(getCount(state)).toEqual({
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
      expect(getLastValue({ TextViewData: {} }, { epName: 'ep1', viewId: 'v1' })).toBeFalsy();
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
      expect(getLastValue(state, { epName: 'ep1' })).toBeFalsy();
      expect(getLastValue(state, { viewId: 'v1' })).toBeFalsy();
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
      expect(getLastValue(state, { epName: 'ep1', viewId: 'v1' })).toEqual({
        timestamp: moment(123).utc().toISOString(),
        value: 1,
      });
    });
  });
});
