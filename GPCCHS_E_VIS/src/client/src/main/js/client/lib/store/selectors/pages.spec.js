/* eslint no-unused-expressions: 0 */
import {} from '../../common/test';

import {
  getPageViews,
  getPageModifiedViewsIds,
} from './pages';

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
  it('getPageModifiedViewsIds', () => {
    const state = {
      pages: {
        myPageId1: { uuid: 'myPageId1', views: ['view1', 'view2', 'view3'] },
      },
      views: {
        view1: { uuid: 'view1', isModified: true },
        view2: { uuid: 'view2', isModified: false },
        view3: { uuid: 'view3', isModified: true },
      },
    };

    getPageModifiedViewsIds(state, { pageId: 'myPageId1' }).should.eql(['view1', 'view3']);
    getPageModifiedViewsIds(state, { pageId: 'otherPageId' }).should.eql([]);
  });
});
