/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import {
  getWindow,
  getWindows,
  getWindowsFocusedPageIds,
  getWindowsFocusedPage,
  getWindowsVisibleViewIds,
  getWindowsVisibleViews,
} from './windows';

describe('store:window:selectors', () => {
  describe('getWindow', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title 1' },
      },
    };
    const { getState } = getStore(state);
    it('should returns window', () => {
      getWindow(getState(), 'myWindowId').should.equal(state.windows.myWindowId);
    });
    it('should support not existing window', () => {
      should.not.exist(getWindow(getState(), 'unknownId'));
    });
  });
  describe('getWindows', () => {
    it('should returns windows', () => {
      const state = {
        windows: {
          myWindowId: { title: 'Title' },
          myOtherId: { title: 'Title other' },
        },
      };
      const { getState } = getStore(state);
      getWindows(getState()).should.equal(state.windows);
    });
  });
  describe('getWindowsFocusedPageIds', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title', focusedPage: 10 },
        noField: { title: 'Title noField' },
        emptyField: { title: 'Title emptyField' },
        myOtherId: { title: 'Title myOtherId', focusedPage: 20 },
      },
    };
    const { getState } = getStore(state);
    let r;
    it('should returns focused pages ids', () => {
      r = getWindowsFocusedPageIds(getState());
      r.should.eql([10, 20]);
      getWindowsFocusedPageIds.recomputations().should.equal(1);
    });
    it('should memoize', () => {
      getWindowsFocusedPageIds(getState()).should.eql(r);
      getWindowsFocusedPageIds.recomputations().should.equal(1);
    });
    it('should support empty windows list', () => {
      getWindowsFocusedPageIds({ windows: {} }).should.eql([]);
      getWindowsFocusedPageIds.recomputations().should.equal(2);
    });
  });
  describe('getWindowsFocusedPage', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title', focusedPage: 10 },
        myOtherId: { title: 'Title myOtherId', focusedPage: 20 },
        anotherId: { title: 'Title anotherId', focusedPage: 30 },
      },
      pages: {
        10: { title: 'Page 10' },
        20: { title: 'Page 20' },
        40: { title: 'Page 40' },
      },
    };
    const { getState } = getStore(state);
    let r;
    it('should returns focused pages', () => {
      r = getWindowsFocusedPage(getState());
      r.should.eql([
        { title: 'Page 10' },
        { title: 'Page 20' },
      ]);
      getWindowsFocusedPage.recomputations().should.equal(1);
    });
    it('should memoize', () => {
      getWindowsFocusedPage(getState()).should.eql(r);
      getWindowsFocusedPage.recomputations().should.equal(1);
    });
    it('should support empty pages list', () => {
      getWindowsFocusedPage({
        windows: {
          myWindowId: { title: 'Title', focusedPage: 10 },
        },
        pages: {},
      }).should.eql([]);
      getWindowsFocusedPage.recomputations().should.equal(2);
    });
  });
  describe('getWindowsVisibleViewIds', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title', focusedPage: 10 },
      },
      pages: {
        10: { title: 'Page 10', views: [100, 200], timebarId: 1000 },
      },
    };
    const { getState } = getStore(state);
    let r;
    it('should returns focused views ids', () => {
      r = getWindowsVisibleViewIds(getState());
      r.should.eql([{
        timebarId: 1000,
        viewIds: [100, 200],
      }]);
      getWindowsVisibleViewIds.recomputations().should.equal(1);
    });
    it('should memoize', () => {
      getWindowsVisibleViewIds(getState()).should.eql(r);
      getWindowsVisibleViewIds.recomputations().should.equal(1);
    });
  });
  describe('getWindowsVisibleViews', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title', focusedPage: 10 },
        myOtherWindow: { title: 'Title', focusedPage: 20 },
        anotherWindow: { title: 'Title', focusedPage: 30 },
      },
      pages: {
        10: { title: 'Page 10', views: [100, 200, 300], timebarId: 1000 },
        20: { title: 'Page 20', views: [500], timebarId: 2000 },
        30: { title: 'Page 30', views: [600] },
      },
      views: {
        100: { title: 'Title 100' },
        200: { title: 'Title 200' },
        400: { title: 'Title 400' },
        500: { title: 'Title 500' },
        600: { title: 'Title 600' },
      },
    };
    const { getState } = getStore(state);
    let r;
    it('should returns focused views', () => {
      r = getWindowsVisibleViews(getState());
      r.should.eql([
        { timebarId: 1000, viewData: { title: 'Title 100' }, viewId: 100 },
        { timebarId: 1000, viewData: { title: 'Title 200' }, viewId: 200 },
        { timebarId: 2000, viewData: { title: 'Title 500' }, viewId: 500 },
      ]);
      getWindowsVisibleViews.recomputations().should.equal(1);
    });
    it('should memoize', () => {
      getWindowsVisibleViews(getState()).should.eql(r);
      getWindowsVisibleViews.recomputations().should.equal(1);
    });
    it('should support empty views list', () => {
      getWindowsVisibleViews({
        windows: {
          myWindowId: { title: 'Title', focusedPage: 10 },
        },
        pages: {
          10: { title: 'Page 10', views: [100], timebarId: 1000 },
        },
        views: {},
      }).should.eql([]);
      getWindowsVisibleViews.recomputations().should.equal(2);
    });
  });
});
