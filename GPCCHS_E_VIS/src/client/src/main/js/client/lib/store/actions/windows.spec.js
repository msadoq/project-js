import * as actions from './windows';
import { mockStore, freezeMe } from '../../common/jest';

describe('store:actions:windows', () => {
  const state = freezeMe({
    windows: {
      w1: {
        focusedPage: 'p1',
        pages: ['p1'],
      },
      w2: {
        focusedPage: null,
        pages: ['p2', 'p3', 'p4'],
      },
    },
    pages: {
      p1: {
        timebarUuid: 'tb1',
        views: [1, 2, 3],
      },
      p2: {
        timebarUuid: 'unknown',
        views: [4, 5, 6],
      },
      p3: {
        views: [7, 8, 9],
      },
    },
    hsc: {
      playingTimebarId: 'tb1',
    },
  });
  const store = mockStore(state);

  afterEach(() => {
    store.clearActions();
  });

  describe('focusPage', () => {
    test('set focus', () => {
      store.dispatch(actions.focusPage('myWindowId', 'p1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_WINDOW_PAGE_FOCUS',
          payload: { windowId: 'myWindowId', pageId: 'p1' },
        },
      ]);
    });
    test('do nothing when page is unknown', () => {
      store.dispatch(actions.focusPage('unknownWindow', 'unknownPage'));
      expect(store.getActions()).toEqual([]);
    });
  });
  describe('closeWindow', () => {
    test('dispatches an action with all documents ids which should be close', () => {
      store.dispatch(actions.closeWindow('w2'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_WINDOW_CLOSE',
          payload: {
            windowId: 'w2',
            views: [4, 5, 6, 7, 8, 9],
            pages: ['p2', 'p3', 'p4'],
          },
        },
      ]);
    });
  });
  describe('movePageToWindow', () => {
    test('check dispatched action, single case', () => {
      store.dispatch(actions.movePageToWindow('p1', 'w1', 'w2'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_PAGE_MOVE_TO_WINDOW',
          payload: { pageId: 'p1', fromWindowId: 'w1', toWindowId: 'w2' },
        },
        {
          type: 'WS_WINDOW_PAGE_FOCUS',
          payload: { pageId: 'p1', windowId: 'w2' },
        },
      ]);
    });
  });
});
