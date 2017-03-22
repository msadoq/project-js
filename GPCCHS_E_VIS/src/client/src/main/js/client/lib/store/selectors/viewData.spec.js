import { getCount } from './viewData';

describe('store:viewData:selectors', () => {
  describe('getCount', () => {
    it('counts data', () => {
      const state = {
        viewData: {
          v1: { values: { a: true, b: true, c: true } },
          v2: { columns: [{ a: true, b: true, x: 1 }, { a: false, b: false, x: 2 }] },
          v3: {},
          v4: {},
          v5: {},
        },
      };
      getCount(state).should.be.eql(10);
      getCount({}).should.be.eql(0);
    });
  });
});
