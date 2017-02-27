import {
  getData,
  getViewData,
  getCount,
} from './viewData';

describe('store:viewData:selectors', () => {
  describe('getViewData', () => {
    it('should retrieve viewData', () => {
      const state = { viewData: { view1: {} } };
      getViewData(state).should.equal(state.viewData);
    });
    it('should support empty state', () => {
      getViewData({});
    });
  });
  describe('getData', () => {
    it('should retrieve viewData for given view', () => {
      const state = { viewData: { view1: {} } };
      getData(state, { viewId: 'view1' }).should.equal(state.viewData.view1);
    });
    it('should support empty state', () => {
      getData({}, { viewId: 'view1' });
    });
  });
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
