import { getCount } from './dataSelectors';

describe('viewManager/PlotView/store/dataSelector', () => {
  describe('getCount', () => {
    it('counts data: empty state', () => {
      getCount({ plotViewData: {} }).should.be.eql({ all: 0 });
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
