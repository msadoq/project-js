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
