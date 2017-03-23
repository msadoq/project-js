import {} from '../../common/test';
import { getPageViews } from './pages';

describe('store:page:selectors', () => {
  it('getPageViews', () => {
    const state = {
      pages: {
        myPageId: {
          views: ['view1'],
        },
      },
      views: {
        views1: {},
        views2: {},
      },
    };

    getPageViews(state, { pageId: 'myPageId' }).should.eql([
      { viewId: 'view1' },
    ]);
  });
});
