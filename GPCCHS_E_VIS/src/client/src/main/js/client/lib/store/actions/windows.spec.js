import * as actions from './windows';
import { mockStore, freezeMe } from '../../common/test';

describe('store:actions:windows', () => {
  const state = freezeMe({
    windows: {
      w1: {
        focusedPage: 'p1',
        pages: ['p1'],
      },
      w2: {
        focusedPage: null,
        pages: ['p1', 'p2', 'p3', 'p4'],
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
    it('set focus', () => {
      store.dispatch(actions.focusPage('myWindowId', 'p1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_WINDOW_PAGE_FOCUS',
          payload: { windowId: 'myWindowId', pageId: 'p1' },
        },
      ]);
    });
    it('set pause then set focus', () => {
      store.dispatch(actions.focusPage('myWindowId', 'p2'));
      expect(store.getActions()).toEqual([
        { type: 'HSC_PAUSE', payload: {} },
        {
          type: 'WS_WINDOW_PAGE_FOCUS',
          payload: { windowId: 'myWindowId', pageId: 'p2' },
        },
      ]);
    });
  });
  describe('closeWindow', () => {
    it('dispatches an action with all documents ids which should be close', () => {
      store.dispatch(actions.closeWindow('w2'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_WINDOW_CLOSE',
          payload: {
            windowId: 'w2',
            views: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            pages: ['p1', 'p2', 'p3', 'p4'],
          },
        },
      ]);
    });
  });
});
