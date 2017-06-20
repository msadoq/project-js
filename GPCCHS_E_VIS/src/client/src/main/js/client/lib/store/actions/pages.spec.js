// import sinon from 'sinon';
import { freezeMe, mockStore } from '../../common/jest';
import * as actions from './pages';

describe('store:actions:pages', () => {
  const state = freezeMe({
    hsc: {
      focusWindow: 'w1',
    },
    windows: {
      w1: { pages: ['p1'] },
    },
    pages: {
      p1: {
        views: ['v1', 'v2'],
        panels: {
          editorWidth: 100,
        },
      },
      p2: {
        views: ['v3', 'v4'],
        panels: {
          editorWidth: 0,
        },
      },
    },
    timebars: { tb1: {} },
  });
  const store = mockStore(state);

  afterEach(() => {
    store.clearActions();
  });

  describe('addBlankPage', () => {
    test('dispatches WS_PAGE_ADD_BLANK with given windowId and newPageId', () => {
      store.dispatch(actions.addBlankPage('myWindow1', 'myPage1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_PAGE_ADD_BLANK',
          payload: {
            windowId: 'myWindow1',
            page: { uuid: 'myPage1', timebarUuid: 'tb1' },
          },
        },
      ]);
    });
    test('dispatches WS_PAGE_ADD_BLANK without windowId', () => {
      store.dispatch(actions.addBlankPage(undefined, 'myPage1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_PAGE_ADD_BLANK',
          payload: {
            windowId: 'w1',
            page: { uuid: 'myPage1', timebarUuid: 'tb1' },
          },
        },
      ]);
    });
    test('dispatched WS_PAGE_ADD_BLANK without newPageId', () => {
      store.dispatch(actions.addBlankPage('myWindow1', undefined));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_PAGE_ADD_BLANK',
          payload: {
            windowId: 'myWindow1',
            page: {
              timebarUuid: 'tb1',
            },
          },
        },
      ]);
      expect(store.getActions()[0].payload.page.uuid).toBeAnUuid();
    });
    test('dispatched WS_PAGE_ADD_BLANK without windowId and newPageId', () => {
      store.dispatch(actions.addBlankPage(undefined, undefined));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_PAGE_ADD_BLANK',
          payload: {
            windowId: 'w1',
            page: {
              timebarUuid: 'tb1',
            },
          },
        },
      ]);
    });
  });

  describe('moveViewToPage', () => {
    test('dispatches a WS_VIEW_MOVE_TO_PAGE', () => {
      store.dispatch(actions.moveViewToPage('w1', 'fromPage', 'toPage', 'myViewId'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_VIEW_MOVE_TO_PAGE',
          payload: {
            fromPageId: 'fromPage',
            toPageId: 'toPage',
            viewId: 'myViewId',
          },
        },
      ]);
    });
    test('dispatches addBlankPage and WS_VIEW_MOVE_TO_PAGE', () => {
      store.dispatch(actions.moveViewToPage('w1', 'fromPage', '', 'myViewId'));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_PAGE_ADD_BLANK',
          payload: {
            windowId: 'w1',
            page: {
              timebarUuid: 'tb1',
            },
          },
        },
        {
          type: 'WS_VIEW_MOVE_TO_PAGE',
          payload: {
            fromPageId: 'fromPage',
            viewId: 'myViewId',
          },
        },
      ]);
      expect(store.getActions()[0].payload.page.uuid).toBeAnUuid();
      expect(store.getActions()[1].payload.toPageId).toBeAnUuid();
    });
  });

  describe('closePage', () => {
    test('dispatches a WS_CLOSE_PAGE action', () => {
      store.dispatch(actions.closePage('w1', 'p1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_PAGE_CLOSE',
          payload: { windowId: 'w1', pageId: 'p1', viewIds: ['v1', 'v2'] },
        },
      ]);
    });
  });

  describe('openEditor', () => {
    test('opens editor', () => {
      store.dispatch(actions.openEditor('p1', 'v1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_PAGE_PANELS_MINIMIZE_EDITOR',
          payload: { pageId: 'p1', isMinimized: false },
        },
        {
          type: 'WS_PAGE_PANELS_LOAD_IN_EDITOR',
          payload: { pageId: 'p1', viewId: 'v1' },
        },
      ]);
    });
    test('resizes editor to 350px if editorWidth is lower than 0', () => {
      store.dispatch(actions.openEditor('p2', 'v3'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_PAGE_PANELS_MINIMIZE_EDITOR',
          payload: { pageId: 'p2', isMinimized: false },
        },
        {
          type: 'WS_PAGE_PANELS_RESIZE_EDITOR',
          payload: { pageId: 'p2', size: 350 },
        },
        {
          type: 'WS_PAGE_PANELS_LOAD_IN_EDITOR',
          payload: { pageId: 'p2', viewId: 'v3' },
        },
      ]);
    });
  });
  describe('focusPage', () => {
    test('focusPage when page exists', () => {
      store.dispatch(actions.focusPage('p1'));
      expect(store.getActions()).toEqual([
        { type: 'WS_WINDOW_PAGE_FOCUS', payload: { windowId: 'w1', pageId: 'p1' } },
      ]);
    });
    test('focusPage with unknown page', () => {
      store.dispatch(actions.focusPage('unknownPage'));
      expect(store.getActions()).toEqual([]);
    });
  });
});
