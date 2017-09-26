// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Write windows action creators tests
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Page add default timebar assignation.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Rewrite action/windows tests . .
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Transform closeWindow simple action creator in a thunk
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : change thunk pause into simple action
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : change thunk pause into simple action
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/actions
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : #6670 : 20/06/2017 : Fix store coverage (actions/windows) .
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Player middleware now pause when focus a page with another timebar
// END-HISTORY
// ====================================================================

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
            views: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            pages: ['p1', 'p2', 'p3', 'p4'],
          },
        },
      ]);
    });
  });
});
