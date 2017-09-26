// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rename Page/ContentSelector in Page/ContentSelectors .
// VERSION : 1.1.2 : DM : #5828 : 21/04/2017 : A maximized view can be closed, it wont be taken into consideration anymore.
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in windowProcess
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { freezeMe, testMemoization } from '../../common/jest';

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
