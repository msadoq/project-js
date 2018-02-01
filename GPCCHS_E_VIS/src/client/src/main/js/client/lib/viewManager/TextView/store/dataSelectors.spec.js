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

describe('viewManager/TextView/store/dataSelector', () => {
  describe('getCount', () => {
    test('counts data: empty state', () => {
      expect(getCount({ TextViewData: {} })).toEqual({ all: 0 });
    });
    test('counts data', () => {
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
    test('should support empty state', () => {
      expect(getLastValue({ TextViewData: {} }, { epName: 'ep1', viewId: 'v1' })).toBeFalsy();
    });
    test('should support empty props', () => {
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
    test('get last value', () => {
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
