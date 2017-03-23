import { testMemoization } from '../../common/test';
import { getPageModifiedViewsIds, getModifiedWindowsIds } from './selectors';

describe('store:page:selectors', () => {
  describe('getPageModifiedViewsIds', () => {
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
    it('returns modified views ids', () => {
      getPageModifiedViewsIds(state, { pageId: 'myPageId1' }).should.eql(['view1', 'view3']);
      getPageModifiedViewsIds(state, { pageId: 'otherPageId' }).should.eql([]);
    });
    it('should memoize', () => {
      testMemoization(getPageModifiedViewsIds, state, { pageId: 'myPageId1' });
    });
  });

  describe('getModifiedWindowsIds', () => {
    const state = {
      windows: {
        a: { isModified: true },
        b: {},
        c: { isModified: true },
        d: {},
      },
    };
    it('returns modified windows ids', () => {
      getModifiedWindowsIds(state).should.be.eql(['a', 'c']);
    });
    it('should memoize', () => {
      testMemoization(getModifiedWindowsIds, state);
    });
  });
});
