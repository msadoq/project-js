/* eslint no-unused-expressions: 0 */
import { getStore, testMemoization, expect } from '../../common/test';

import {
  getFocusedWindow,
  getWindowPages,
  getWindowFocusedPageSelector,
  getWindowsVisibleViews,
} from './windows';

describe('store:window:selectors', () => {
  const emptyState = {};
  describe('getFocusedWindow', () => {
    it('should return focused window', () => {
      const state = {
        hsc: {
          focusWindow: 'window1',
        },
        windows: {
          window1: { title: 'foo' },
          window2: { title: 'bar' },
        },
      };
      getFocusedWindow(state).should.eql({ title: 'foo' });
    });
    it('should return undefined with no focusWindow', () => {
      const state = {
        windows: {
          window1: { title: 'foo' },
          window2: { title: 'bar' },
        },
      };
      expect(getFocusedWindow(state)).to.be.undefined;
    });
    it('should return undefined with empty state', () => {
      expect(getFocusedWindow(emptyState)).to.be.undefined;
    });
  });

  it('getWindowPages', () => {
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
    getWindowPages(state, { windowId: 'myWindowId' }).should.eql([
      { pageId: 'page1', title: 'foo' },
      { pageId: 'page2', title: 'bar' },
    ]);
    getWindowPages(state, { windowId: 'unknownWindow' }).should.be.eql([]);
  });

  it('getWindowFocusedPageSelector', () => {
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
    getWindowFocusedPageSelector(state, { windowId: 'window1' }).should.eql({
      title: 'foo',
    });
  });
  describe('getWindowsVisibleViews', () => {
    const { getState } = getStore({
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
    it('should returns focused views', () => {
      getWindowsVisibleViews(getState()).should.eql([
        { timebarUuid: 1000, viewData: { title: 'Title 100' }, viewId: 100 },
        { timebarUuid: 1000, viewData: { title: 'Title 200' }, viewId: 200 },
        { timebarUuid: 2000, viewData: { title: 'Title 500' }, viewId: 500 },
      ]);
    });
    it('should memoize', () => {
      testMemoization(getWindowsVisibleViews, getState());
    });
    it('should support empty views list', () => {
      getWindowsVisibleViews({
        windows: {
          myWindowId: { title: 'Title', focusedPage: 10 },
        },
        pages: {
          10: { title: 'Page 10', views: [100], timebarUuid: 1000 },
        },
        views: {},
      }).should.eql([]);
    });
  });
});
