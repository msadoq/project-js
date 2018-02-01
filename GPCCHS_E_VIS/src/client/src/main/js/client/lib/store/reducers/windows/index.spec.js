// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all windows simple selectors in store/reducers/windows
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : set workspace (all windows) is modified when manipulate timebars / timelines
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : Add getWindowTitle selector + replace all "getState().x"
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Move isModified from state.windows to state.hsc
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Migrate merged new tests in jest
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';
import { freezeArgs, freezeMe } from 'common/jest';
import * as actions from 'store/actions/windows';
import windowsReducer, {
  getWindow,
  getWindows,
  getWindowsArray,
  getWindowPageIds,
  getWindowFocusedPageId,
  getDisplayHelp,
  getWindowTitle,
  getWindowIdByPageId,
} from '../windows';

const reducer = freezeArgs(windowsReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:windows:reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('unknown action', () => {
    expect(
      reducer({ myWindowId: { title: 'Title' } }, { payload: { windowId: 'myWindowId' } })
    ).toEqual({ myWindowId: { title: 'Title' } });
  });
  describe('WS_PAGE_MOVE_TO_WINDOW', () => {
    test('same windows, nothing to do', () => {
      const pageId = v4();
      const pageId2 = v4();
      const pageId3 = v4();
      const state = freezeMe({
        foo: { pages: [pageId] },
        bar: { pages: [pageId2] },
        baz: { pages: [pageId3] },
      });
      const newState = reducer(state, { type: 'WS_PAGE_MOVE_TO_WINDOW',
        payload: {
          fromWindowId: 'foo',
          toWindowId: 'foo',
          pageId,
        },
      });
      expect(newState).toEqual({
        foo: { pages: [pageId] },
        bar: { pages: [pageId2] },
        baz: { pages: [pageId3] },
      });
    });
    test('undefined pageId, nothing to do', () => {
      const pageId = v4();
      const pageId2 = v4();
      const state = freezeMe({
        foo: { pages: [pageId] },
        bar: { pages: [pageId2] },
      });
      const newState = reducer(state, { type: 'WS_PAGE_MOVE_TO_WINDOW',
        payload: {
          fromWindowId: 'foo',
          toWindowId: 'bar',
          pageId: v4(),
        },
      });
      expect(newState).toEqual({
        foo: { pages: [pageId] },
        bar: { pages: [pageId2] },
      });
    });
    test('only one window', () => {
      const pageId = v4();
      const pageId2 = v4();
      const state = freezeMe({
        foo: { pages: [pageId, pageId2] },
      });
      const newState = reducer(state, { type: 'WS_PAGE_MOVE_TO_WINDOW',
        payload: {
          fromWindowId: 'foo',
          toWindowId: 'bar',
          pageId,
        },
      });
      expect(newState).toEqual({
        foo: { pages: [pageId2] },
        bar: { pages: [pageId] },
      });
    });
    test('two windows, page key undefined', () => {
      const pageId = v4();
      const pageId2 = v4();
      const state = freezeMe({
        foo: { pages: [pageId, pageId2] },
        bar: { },
      });
      const newState = reducer(state, { type: 'WS_PAGE_MOVE_TO_WINDOW',
        payload: {
          fromWindowId: 'foo',
          toWindowId: 'bar',
          pageId,
        },
      });
      expect(newState).toEqual({
        foo: { pages: [pageId2] },
        bar: { pages: [pageId] },
      });
    });
    test('two windows, move a single page', () => {
      const pageId = v4();
      const pageId2 = v4();
      const pageId3 = v4();
      const state = freezeMe({
        foo: { pages: [pageId, pageId2] },
        bar: { pages: [pageId3] },
      });
      const newState = reducer(state, { type: 'WS_PAGE_MOVE_TO_WINDOW',
        payload: {
          fromWindowId: 'foo',
          toWindowId: 'bar',
          pageId,
        },
      });
      expect(newState).toEqual({
        foo: { pages: [pageId2] },
        bar: { pages: [pageId, pageId3] },
      });
    });
    test('three windows, move a single page', () => {
      const pageId = v4();
      const pageId2 = v4();
      const pageId3 = v4();
      const state = freezeMe({
        foo: { pages: [pageId] },
        bar: { pages: [pageId2] },
        baz: { pages: [pageId3] },
      });
      const newState = reducer(state, { type: 'WS_PAGE_MOVE_TO_WINDOW',
        payload: {
          fromWindowId: 'foo',
          toWindowId: 'bar',
          pageId,
        },
      });
      expect(newState).toEqual({
        foo: { pages: [] },
        bar: { pages: [pageId, pageId2] },
        baz: { pages: [pageId3] },
      });
    });
  });
  describe('add', () => {
    test('should add in store', () => {
      const action = actions.addWindow('myWindowId', 'Title', { x: 110 }, ['myPageId'], null, true);
      const state = reducer(undefined, action);
      expect(state.myWindowId).toEqual({
        title: 'Title',
        displayHelp: false,
        focusedPage: null,
        pages: ['myPageId'],
        geometry: { w: 800, h: 600, x: 110, y: 10 },
        minimized: false,
        isLoaded: false,
        uuid: 'myWindowId',
      });
    });
    test('should support empty add', () => {
      const state = reducer(undefined, actions.addWindow('myWindowId'));
      const win = state.myWindowId;
      expect(win.title).toEqual('Unknown');
      expect(win.minimized).toEqual(false);
      expect(win.geometry).toEqual({ x: 10, y: 10, w: 800, h: 600 });
    });
  });
  describe('HSC workspace', () => {
    test('close', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: 'HSC_CLOSE_WORKSPACE' });
      expect(newState).toEqual({});
    });
  });
  describe('should modify workspace', () => {
    const state = { window1: {}, window2: { isModified: false } };
    test('modify if new timeline', () => {
      const newState = reducer(state, { type: 'WS_TIMELINE_CREATE_NEW' });
      expect(newState.window1.isModified).toBe(true);
      expect(newState.window2.isModified).toBe(true);
    });
    test('modify if remove timeline', () => {
      const newState = reducer(state, { type: 'WS_TIMELINE_REMOVE' });
      expect(newState.window1.isModified).toBe(true);
      expect(newState.window2.isModified).toBe(true);
    });
    test('modify if update timebarId', () => {
      const newState = reducer(state, { type: 'WS_PAGE_TIMEBAR_MOUNT' });
      expect(newState.window1.isModified).toBe(true);
      expect(newState.window2.isModified).toBe(true);
    });
    test('modify if update timebarId', () => {
      const newState = reducer(state, { type: 'WS_PAGE_TIMEBAR_UNMOUNT' });
      expect(newState.window1.isModified).toBe(true);
      expect(newState.window2.isModified).toBe(true);
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:windows:selectors', () => {
  test('getWindowsArray', () => {
    const state = freezeMe({
      windows: {
        window1: { title: 'foo' },
        window2: { title: 'bar' },
      },
    });
    expect(getWindowsArray(state)).toEqual([
      { title: 'foo' },
      { title: 'bar' },
    ]);
  });
  test('getWindows', () => {
    const state = freezeMe({
      windows: {
        myWindowId: { title: 'Title' },
        myOtherId: { title: 'Title other' },
      },
    });
    expect(getWindows(state)).toBe(state.windows);
  });
  describe('getWindow', () => {
    const state = freezeMe({
      windows: {
        myWindowId: { title: 'Title 1' },
      },
    });
    test('should returns window', () => {
      expect(getWindow(state, { windowId: 'myWindowId' })).toBe(state.windows.myWindowId);
    });
    test('should support not existing window', () => {
      expect(getWindow(state, { windowId: 'unknownId' })).toBeFalsy();
    });
  });
  describe('getWindowTitle', () => {
    const state = freezeMe({
      windows: {
        myWindowId: { title: 'Title 1' },
      },
    });
    test('should returns window', () => {
      expect(getWindowTitle(state, { windowId: 'myWindowId' })).toBe(state.windows.myWindowId.title);
    });
    test('should support not existing window', () => {
      expect(getWindowTitle(state, { windowId: 'unknownId' })).toBeFalsy();
    });
  });
  test('getWindowPageIds', () => {
    const state = freezeMe({
      windows: {
        window1: {
          pages: ['page1', 'page2'],
        },
      },
    });
    expect(getWindowPageIds(state, { windowId: 'window1' })).toEqual(['page1', 'page2']);
  });
  test('getWindowFocusedPageId', () => {
    const state = freezeMe({
      windows: {
        window1: {
          focusedPage: 'page1',
        },
      },
    });
    expect(getWindowFocusedPageId(state, { windowId: 'window1' })).toEqual('page1');
  });
  test('getDisplayHelp', () => {
    const state = freezeMe({
      windows: {
        w1: { displayHelp: true },
      },
    });
    expect(getDisplayHelp(state, { windowId: 'w1' })).toBe(true);
    expect(getDisplayHelp({}, {})).toBeFalsy();
  });
  test('getWindowIdByPageId', () => {
    const state = {
      windows: {
        w1: { pages: ['page1', 'page2', 'page3'] },
        w2: { pages: ['page10', 'page20', 'page30'] },
      },
    };
    expect(getWindowIdByPageId(state, { pageId: 'page2' })).toEqual('w1');
    expect(getWindowIdByPageId(state, { pageId: 'page200' })).toBeUndefined();
  });
});
