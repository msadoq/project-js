import { testMemoization } from '../../common/test';
import { getPageModifiedViewsIds } from './selectors';

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
    test('returns modified views ids', () => {
      expect(getPageModifiedViewsIds(state, { pageId: 'myPageId1' })).toEqual(['view1', 'view3']);
      expect(getPageModifiedViewsIds(state, { pageId: 'otherPageId' })).toEqual([]);
    });
    test('should memoize', () => {
      testMemoization(getPageModifiedViewsIds, state, { pageId: 'myPageId1' });
    });
  });
});
