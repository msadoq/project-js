import { freezeArgs, freezeMe } from '../../../common/test';
import * as actions from '../../actions/windows';
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
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('unknown action', () => {
    expect(
      reducer({ myWindowId: { title: 'Title' } }, { payload: { windowId: 'myWindowId' } })
    ).toEqual({ myWindowId: { title: 'Title' } });
  });
  describe('add', () => {
    it('should add in store', () => {
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
    it('should support empty add', () => {
      const state = reducer(undefined, actions.addWindow('myWindowId'));
      const win = state.myWindowId;
      expect(win.title).toEqual('Unknown');
      expect(win.minimized).toEqual(false);
      expect(win.geometry).toEqual({ x: 10, y: 10, w: 800, h: 600 });
    });
  });
  describe('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: 'HSC_CLOSE_WORKSPACE' });
      expect(newState).toEqual({});
    });
  });
  describe('should modify workspace', () => {
    const state = { window1: {}, window2: { isModified: false } };
    it('modify if new timeline', () => {
      const newState = reducer(state, { type: 'WS_TIMELINE_CREATE_NEW' });
      expect(newState.window1.isModified).toBe(true);
      expect(newState.window2.isModified).toBe(true);
    });
    it('modify if remove timeline', () => {
      const newState = reducer(state, { type: 'WS_TIMELINE_REMOVE' });
      expect(newState.window1.isModified).toBe(true);
      expect(newState.window2.isModified).toBe(true);
    });
    it('modify if update timebarId', () => {
      const newState = reducer(state, { type: 'WS_PAGE_TIMEBAR_MOUNT' });
      expect(newState.window1.isModified).toBe(true);
      expect(newState.window2.isModified).toBe(true);
    });
    it('modify if update timebarId', () => {
      const newState = reducer(state, { type: 'WS_PAGE_TIMEBAR_UNMOUNT' });
      expect(newState.window1.isModified).toBe(true);
      expect(newState.window2.isModified).toBe(true);
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:windows:selectors', () => {
  it('getWindowsArray', () => {
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
  it('getWindows', () => {
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
    it('should returns window', () => {
      expect(getWindow(state, { windowId: 'myWindowId' })).toBe(state.windows.myWindowId);
    });
    it('should support not existing window', () => {
      expect(getWindow(state, { windowId: 'unknownId' })).toBeFalsy();
    });
  });
  describe('getWindowTitle', () => {
    const state = freezeMe({
      windows: {
        myWindowId: { title: 'Title 1' },
      },
    });
    it('should returns window', () => {
      expect(getWindowTitle(state, { windowId: 'myWindowId' })).toBe(state.windows.myWindowId.title);
    });
    it('should support not existing window', () => {
      expect(getWindowTitle(state, { windowId: 'unknownId' })).toBeFalsy();
    });
  });
  it('getWindowPageIds', () => {
    const state = freezeMe({
      windows: {
        window1: {
          pages: ['page1', 'page2'],
        },
      },
    });
    expect(getWindowPageIds(state, { windowId: 'window1' })).toEqual(['page1', 'page2']);
  });
  it('getWindowFocusedPageId', () => {
    const state = freezeMe({
      windows: {
        window1: {
          focusedPage: 'page1',
        },
      },
    });
    expect(getWindowFocusedPageId(state, { windowId: 'window1' })).toEqual('page1');
  });
  it('getDisplayHelp', () => {
    const state = freezeMe({
      windows: {
        w1: { displayHelp: true },
      },
    });
    expect(getDisplayHelp(state, { windowId: 'w1' })).toBe(true);
    expect(getDisplayHelp({}, {})).toBeFalsy();
  });
  it('getWindowIdByPageId', () => {
    // const state = {
    //   windows: {
    //     w1: { pages: ['page1', 'page2', 'page3'] },
    //     w2: { pages: ['page10', 'page20', 'page30'] },
    //   },
    // };
    // getWindowIdByPageId(state, { pageId: 'page2' }).should.eql('w1');
    // should.not.exist(getWindowIdByPageId(state, { pageId: 'page200' }));
  });
});
