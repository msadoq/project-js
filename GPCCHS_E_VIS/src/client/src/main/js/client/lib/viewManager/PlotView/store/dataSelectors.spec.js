import moment from 'moment';
import { should } from '../../../common/test';
import { getCount, getLastValue } from './dataSelectors';

describe('viewManager/PlotView/store/dataSelector', () => {
  describe('getCount', () => {
    it('counts data: empty state', () => {
      expect(getCount({ PlotViewData: {} })).toEqual({ all: 0 });
    });
    it('counts data', () => {
      const state = {
        PlotViewData: {
          v1: { lines: { ep1: [{ a: true, b: true }] } },
          v2: { lines: {
            ep1: [{ a: true, x: 1 }, { a: false, x: 2 }],
            ep2: [{ a: false, x: 2 }] } },
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
      expect(getLastValue({ PlotViewData: {} }, { epName: 'ep1', viewId: 'v1' })).toBeFalsy();
    });
    it('should support empty props', () => {
      const state = {
        PlotViewData: {
          v1: {
            indexes: { ep1: [123] },
            lines: { ep1: [{ value: 1 }] },
          },
        },
      };
      expect(getLastValue(state, { epName: 'ep1' })).toBeFalsy();
      expect(getLastValue(state, { viewId: 'v1' })).toBeFalsy();
    });
    it('get last value (symbol)', () => {
      const state = {
        PlotViewData: {
          v1: {
            indexes: { ep1: [122, 123] },
            lines: { ep1: [{ symbol: '1', value: 1 }, { symbol: '2', value: 2 }] },
          },
        },
      };
      expect(getLastValue(state, { epName: 'ep1', viewId: 'v1' })).toEqual({
        timestamp: moment(123).utc().toISOString(),
        value: '2',
      });
    });
    it('get last value (value)', () => {
      const state = {
        PlotViewData: {
          v1: {
            indexes: { ep1: [122, 123] },
            lines: { ep1: [{ value: 1 }, { value: 2 }] },
          },
        },
      };
      expect(getLastValue(state, { epName: 'ep1', viewId: 'v1' })).toEqual({
        timestamp: moment(123).utc().toISOString(),
        value: 2,
      });
    });
  });
});
