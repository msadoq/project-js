import { freezeMe, testMemoization, should } from '../../common/test';

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
    it('returns page layout with collapsed geometries', () => {
      expect(getPageLayoutWithCollapsed(state, { pageId: 'myPage' })).have.properties({
        lg: [{ i: 'layout1' }, { i: 'layout2' }],
      });
    });
    it('should memoize', () => {
      testMemoization(getPageLayoutWithCollapsed, state, { pageId: 'myPage' });
    });
  });

  describe('getTimebarUuid', () => {
    it('returns focused page timebarUuid', () => {
      expect(getTimebarUuid(state, { windowId: 'myWindow' })).toEqual('tbuuid');
    });
    it('should memoize', () => {
      testMemoization(getTimebarUuid, state, { windowId: 'myWindow' });
    });
  });

  describe('getMaximizedViewdUuid', () => {
    it('should returns null when no maximised views', () => {
      expect(getMaximizedViewdUuid(state, { windowId: 'myWindow' })).toBeFalsy();
    });
    it('should returns maximised view uuid', () => {
      expect(getMaximizedViewdUuid(state, { windowId: 'w2' })).toEqual('geometry1');
    });
    it('should memoize', () => {
      testMemoization(getMaximizedViewdUuid, state, { windowId: 'w2' });
    });
  });
});
