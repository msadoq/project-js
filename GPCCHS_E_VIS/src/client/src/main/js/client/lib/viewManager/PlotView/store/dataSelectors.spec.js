// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : Rename dataSelector in dataSelectors .
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Implement automation for data reducers in viewManager
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import moment from 'moment';
import { getCount, getLastValue } from './dataSelectors';

describe('viewManager/PlotView/store/dataSelector', () => {
  describe.skip('getCount', () => {
    test('counts data: empty state', () => {
      expect(getCount({ PlotViewData: {} })).toEqual({ all: 0 });
    });
    test('counts data', () => {
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
    test('should support empty state', () => {
      expect(getLastValue({ PlotViewData: {} }, { epName: 'ep1', viewId: 'v1' })).toBeFalsy();
    });
    test('should support empty props', () => {
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
    test('get last value (symbol)', () => {
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
    test('get last value (value)', () => {
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
