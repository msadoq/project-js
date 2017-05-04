import { getCount } from './dataSelectors';

describe('viewManager/TextView/store/dataSelector', () => {
  describe('getCount', () => {
    it('counts data: empty state', () => {
      getCount({ textViewData: {} }).should.be.eql({ all: 0 });
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
});
