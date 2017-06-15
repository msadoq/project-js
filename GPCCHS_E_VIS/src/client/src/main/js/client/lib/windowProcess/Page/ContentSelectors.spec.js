import { freezeMe, testMemoization } from '../../common/test';

import {
  getPageLayoutWithCollapsed,
  getTimebarUuid,
  getMaximizedViewdUuid,
} from './ContentSelectors';

describe('windowProcess:Page:ContentSelector', () => {
  const state = freezeMe({
    windows: {
      myWindow: { focusedPage: 'myPage' },
      w2: { focusedPage: 'pageWithMaximised' },
    },
    pages: {
      myPage: {
        timebarUuid: 'tbuuid',
        views: ['layout1', 'layout2'],
        layout: [
          { i: 'layout1' },
          { i: 'layout2' },
        ],
      },
      pageWithMaximised: {
        views: ['geometry1'],
        layout: [{ i: 'geometry1', maximized: true }],
      },
    },
  });
  describe('getPageLayoutWithCollapsed', () => {
    test('returns page layout with collapsed geometries', () => {
      const layout = getPageLayoutWithCollapsed(state, { pageId: 'myPage' });
      expect(layout).toHaveProperty('lg.0.i', 'layout1');
      expect(layout).toHaveProperty('lg.1.i', 'layout2');
    });
    test('should memoize', () => {
      testMemoization(getPageLayoutWithCollapsed, state, { pageId: 'myPage' });
    });
  });

  describe('getTimebarUuid', () => {
    test('returns focused page timebarUuid', () => {
      expect(getTimebarUuid(state, { windowId: 'myWindow' })).toEqual('tbuuid');
    });
    test('should memoize', () => {
      testMemoization(getTimebarUuid, state, { windowId: 'myWindow' });
    });
  });

  describe('getMaximizedViewdUuid', () => {
    test('should returns null when no maximised views', () => {
      expect(getMaximizedViewdUuid(state, { windowId: 'myWindow' })).toBeFalsy();
    });
    test('should returns maximised view uuid', () => {
      expect(getMaximizedViewdUuid(state, { windowId: 'w2' })).toEqual('geometry1');
    });
    test('should memoize', () => {
      testMemoization(getMaximizedViewdUuid, state, { windowId: 'w2' });
    });
  });
});
