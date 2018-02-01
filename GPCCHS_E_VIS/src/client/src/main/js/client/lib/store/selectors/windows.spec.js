// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Write last windows selectors tests
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Ignore not loaded views in dataMap and data requesting
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Add displayHelp key in window reducer to store help screen state in store
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Remove old explorer keys from store
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Simplify simple selector getWindowsArray .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused selectors . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all windows simple selectors in store/reducers/windows
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsTitle in windowsManager/selectors .
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getModifiedWindowsIds in menuManager selectors
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsVisibleViews in dataManager/map.js .
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add number of points per view in explorer panel
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import { freezeMe, testMemoization } from 'common/jest';

import {
  getFocusedWindow,
  getWindowPages,
  getWindowFocusedPageSelector,
  getWindowsVisibleViews,
  getFocusedWindowPages,
} from './windows';

describe('store:window:selectors', () => {
  const emptyState = {};
  describe('getFocusedWindow', () => {
    test('should return focused window', () => {
      const state = {
        hsc: {
          focusWindow: 'window1',
        },
        windows: {
          window1: { title: 'foo' },
          window2: { title: 'bar' },
        },
      };
      expect(getFocusedWindow(state)).toEqual({ title: 'foo' });
    });
    test('should return undefined with no focusWindow', () => {
      const state = {
        windows: {
          window1: { title: 'foo' },
          window2: { title: 'bar' },
        },
      };
      expect(getFocusedWindow(state)).toBeUndefined();
    });
    test('should return undefined with empty state', () => {
      expect(getFocusedWindow(emptyState)).toBeUndefined();
    });
  });
  test('getWindowPages', () => {
    const state = {
      windows: {
        myWindowId: {
          pages: ['page1', 'page2'],
        },
      },
      pages: {
        page1: {
          title: 'foo',
        },
        page2: {
          title: 'bar',
        },
      },
    };
    expect(getWindowPages(state, { windowId: 'myWindowId' })).toEqual([
      { pageId: 'page1', title: 'foo' },
      { pageId: 'page2', title: 'bar' },
    ]);
    expect(getWindowPages(state, { windowId: 'unknownWindow' })).toEqual([]);
  });
  test('getWindowFocusedPageSelector', () => {
    const state = {
      windows: {
        window1: {
          focusedPage: 'page1',
        },
      },
      pages: {
        page1: {
          title: 'foo',
        },
      },
    };
    expect(getWindowFocusedPageSelector(state, { windowId: 'window1' })).toEqual({
      title: 'foo',
    });
  });
  describe('getWindowsVisibleViews', () => {
    const state = freezeMe({
      windows: {
        myWindowId: { title: 'Title', focusedPage: 10, isLoaded: true },
        myOtherWindow: { title: 'Title', focusedPage: 20, isLoaded: true },
        anotherWindow: { title: 'Title', focusedPage: 30, isLoaded: true },
      },
      pages: {
        10: { title: 'Page 10', views: [100, 200, 300], timebarUuid: 1000 },
        20: { title: 'Page 20', views: [500], timebarUuid: 2000 },
        30: { title: 'Page 30', views: [600] },
      },
      views: {
        100: { title: 'Title 100' },
        200: { title: 'Title 200' },
        400: { title: 'Title 400' },
        500: { title: 'Title 500' },
        600: { title: 'Title 600' },
      },
    });
    test('should returns focused views', () => {
      expect(getWindowsVisibleViews(state)).toEqual([
        { timebarUuid: 1000, viewData: { title: 'Title 100' }, viewId: 100 },
        { timebarUuid: 1000, viewData: { title: 'Title 200' }, viewId: 200 },
        { timebarUuid: 2000, viewData: { title: 'Title 500' }, viewId: 500 },
      ]);
    });
    test('should memoize', () => {
      testMemoization(getWindowsVisibleViews, state);
    });
    test('should support empty views list', () => {
      expect(getWindowsVisibleViews({
        windows: {
          myWindowId: { title: 'Title', focusedPage: 10 },
        },
        pages: {
          10: { title: 'Page 10', views: [100], timebarUuid: 1000 },
        },
        views: {},
      })).toEqual([]);
    });
  });
  describe('getFocusedWindowPages', () => {
    const state = {
      hsc: {
        focusWindow: 'window1',
      },
      pages: {
        10: { title: 'Page 10', views: [100, 200, 300], timebarUuid: 1000 },
        20: { title: 'Page 20', views: [500], timebarUuid: 2000 },
        30: { title: 'Page 30', views: [600] },
      },
      windows: {
        window1: { title: 'foo', pages: ['10', '20'] },
        window2: { title: 'bar', pages: ['30'] },
      },
    };
    test('should returns focused views', () => {
      expect(getFocusedWindowPages(state)).toEqual({
        10: { title: 'Page 10', views: [100, 200, 300], timebarUuid: 1000 },
        20: { title: 'Page 20', views: [500], timebarUuid: 2000 },
      });
    });
  });
});
