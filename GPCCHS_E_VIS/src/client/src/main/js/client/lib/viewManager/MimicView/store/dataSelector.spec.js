// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Fix tests on mimic view
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import { getCount } from './dataSelector';

describe('viewManager/MimicView/store/dataSelector', () => {
  describe('getCount', () => {
    test('counts data: empty state', () => {
      expect(getCount({ MimicViewData: {} })).toEqual({ all: 0 });
    });
    test('counts data', () => {
      const state = {
        MimicViewData: {
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
});
