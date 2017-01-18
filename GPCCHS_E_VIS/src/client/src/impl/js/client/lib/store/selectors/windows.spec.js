/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import {
  getWindow,
  getWindows,
  getWindowsArray,
  getWindowPages,
  getWindowPageIds,
  getWindowFocusedPageId,
  getWindowFocusedPageSelector,
  getWindowDebug,
  getWindowsFocusedPageIds,
  getWindowsFocusedPage,
  getWindowsVisibleViewIds,
  getWindowsVisibleViews,
  getWindowMinimized,
  getWindowsTitle,
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
  it('getWindows', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title' },
        myOtherId: { title: 'Title other' },
      },
    };
    const { getState } = getStore(state);
    getWindows(getState()).should.equal(state.windows);
  });
  it('getWindowsArray', () => {
    const state = {
      windows: {
        window1: { title: 'foo' },
        window2: { title: 'bar' }
      }
    };
    getWindowsArray(state).should.eql([
      { id: 'window1', title: 'foo' },
      { id: 'window2', title: 'bar' }
    ]);
  });
  it('getWindowPageIds', () => {
    const state = {
      windows: {
        window1: {
          pages: ['page1', 'page2']
        }
      }
    };
    getWindowPageIds(state, 'window1').should.eql(['page1', 'page2']);
  });
  it('getWindowPages', () => {
    const state = {
      windows: {
        myWindowId: {
          pages: ['page1', 'page2']
        }
      },
      pages: {
        page1: {
          title: 'foo'
        },
        page2: {
          title: 'bar'
        }
      }
    };
    getWindowPages(state, 'myWindowId').should.eql([
      { pageId: 'page1', title: 'foo' },
      { pageId: 'page2', title: 'bar' }
    ]);
  });
  it('getWindowFocusedPageId', () => {
    const state = {
      windows: {
        window1: {
          focusedPage: 'page1'
        }
      }
    };
    getWindowFocusedPageId(state, 'window1').should.eql('page1');
  });
  it('getWindowFocusedPageSelector', () => {
    const state = {
      windows: {
        window1: {
          focusedPage: 'page1'
        }
      },
      pages: {
        page1: {
          title: 'foo'
        }
      }
    };
    getWindowFocusedPageSelector(state, 'window1').should.eql({
      title: 'foo'
    });
  });
  it('getWindowDebug', () => {
    const state = {
      windows: {
        window1: {
          debug: false
        }
      }
    };
    getWindowDebug(state, { windowId: 'window1' }).should.eql(false);
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
    it('should returns focused pages ids', () => {
      getWindowsFocusedPageIds(getState()).should.eql([10, 20]);
    });
    it('should memoize', () => {
      getWindowsFocusedPageIds.resetRecomputations();
      const r = getWindowsFocusedPageIds(getState());
      getWindowsFocusedPageIds.recomputations().should.equal(0);
      getWindowsFocusedPageIds(getState()).should.eql(r);
      getWindowsFocusedPageIds.recomputations().should.equal(0);
      getWindowsFocusedPageIds({}).should.not.eql(r);
      getWindowsFocusedPageIds.recomputations().should.equal(1);
    });
    it('should support empty windows list', () => {
      getWindowsFocusedPageIds({ windows: {} }).should.eql([]);
    });
  });
  describe('getWindowMinimized', () => {
    it('should returns minimized window state', () => {
      const state = {
        windows: {
          myWindowId: { minimized: true },
        },
      };
      const { getState } = getStore(state);
      getWindowMinimized(getState(), 'myWindowId').should.equal(true);
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
    it('should returns focused pages', () => {
      getWindowsFocusedPage(getState()).should.eql([
        { title: 'Page 10' },
        { title: 'Page 20' },
      ]);
    });
    it('should memoize', () => {
      getWindowsFocusedPage.resetRecomputations();
      const r = getWindowsFocusedPage(getState());
      getWindowsFocusedPage.recomputations().should.equal(0);
      getWindowsFocusedPage(getState()).should.eql(r);
      getWindowsFocusedPage.recomputations().should.equal(0);
      getWindowsFocusedPage({}).should.not.eql(r);
      getWindowsFocusedPage.recomputations().should.equal(1);
    });
    it('should support empty pages list', () => {
      getWindowsFocusedPage({
        windows: {
          myWindowId: { title: 'Title', focusedPage: 10 },
        },
        pages: {},
      }).should.eql([]);
    });
  });
  describe('getWindowsVisibleViewIds', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title', focusedPage: 10 },
      },
      pages: {
        10: { title: 'Page 10', views: [100, 200], timebarUuid: 1000 },
      },
    };
    const { getState } = getStore(state);
    it('should returns focused views ids', () => {
      getWindowsVisibleViewIds(getState()).should.eql([{
        timebarUuid: 1000,
        viewIds: [100, 200],
      }]);
    });
    it('should memoize', () => {
      getWindowsVisibleViewIds.resetRecomputations();
      const r = getWindowsVisibleViewIds(getState());
      getWindowsVisibleViewIds.recomputations().should.equal(0);
      getWindowsVisibleViewIds(getState()).should.eql(r);
      getWindowsVisibleViewIds.recomputations().should.equal(0);
      getWindowsVisibleViewIds({}).should.not.eql(r);
      getWindowsVisibleViewIds.recomputations().should.equal(1);
    });
    it('should return nothing', () => {
      const otherState = {
        windows: {
          window1: { title: 'foo', focusedPage: 'page1' }
        },
        pages: {
          page1: { title: 'bar' }
        }
      };
      getWindowsVisibleViewIds(otherState).should.eql([]);
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
    };
    const { getState } = getStore(state);
    it('should returns focused views', () => {
      getWindowsVisibleViews(getState()).should.eql([
        { timebarUuid: 1000, viewData: { title: 'Title 100' }, viewId: 100 },
        { timebarUuid: 1000, viewData: { title: 'Title 200' }, viewId: 200 },
        { timebarUuid: 2000, viewData: { title: 'Title 500' }, viewId: 500 },
      ]);
    });
    it('should memoize', () => {
      getWindowsVisibleViews.resetRecomputations();
      const r = getWindowsVisibleViews(getState());
      getWindowsVisibleViews.recomputations().should.equal(0);
      getWindowsVisibleViews(getState()).should.eql(r);
      getWindowsVisibleViews.recomputations().should.equal(0);
      getWindowsVisibleViews({}).should.not.eql(r);
      getWindowsVisibleViews.recomputations().should.equal(1);
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
  describe('getWindowsTitle', () => {
    const state = {
      windows: {
        notModified: { title: 'Not modified', isModified: false },
        modified: { title: 'Modified', isModified: true },
        noField: { title: 'No field' },
      },
    };
    const { getState } = getStore(state);
    it('should returns windows titles', () => {
      getWindowsTitle(getState()).should.eql({
        notModified: 'Not modified - VIMA',
        modified: 'Modified * - VIMA',
        noField: 'No field - VIMA',
      });
    });
    it('should memoize', () => {
      getWindowsTitle.resetRecomputations();
      const r = getWindowsTitle(getState());
      getWindowsTitle.recomputations().should.equal(0);
      getWindowsTitle(getState()).should.eql(r);
      getWindowsTitle.recomputations().should.equal(0);
      getWindowsTitle({}).should.not.eql(r);
      getWindowsTitle.recomputations().should.equal(1);
    });
    it('should support empty windows list', () => {
      getWindowsTitle({ windows: {} }).should.eql({});
    });
  });
});
