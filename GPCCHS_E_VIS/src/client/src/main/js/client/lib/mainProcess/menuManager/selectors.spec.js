import {} from '../../common/test';
import { getPageModifiedViewsIds, getModifiedWindowsIds } from './selectors';

describe('store:page:selectors', () => {
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
  it('getModifiedWindowsIds', () => {
    const state = {
      windows: {
        a: { isModified: true },
        b: {},
        c: { isModified: true },
        d: {},
      },
    };
    getModifiedWindowsIds(state).should.be.eql(['a', 'c']);
  });
});
