import {
  getViewData,
} from './viewData';

describe('store:viewData:selectors', () => {
  it('getViewData', () => {
    getViewData({
      viewData: {
        view1: {},
      },
    }, 'view1').should.be.an('object');
  });
});
