import {
  getData,
  getViewData,
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
      getData(state, 'view1').should.equal(state.viewData.view1);
    });
    it('should support empty state', () => {
      getData({}, 'view1');
    });
  });
});
