// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : store/reducers/*.spec.js : spliting between plurial and singular specs.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove some tests in windows.spec.js and window.spec.js
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Ignore not loaded views in dataMap and data requesting
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Add displayHelp key in window reducer to store help screen state in store
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Remove old explorer keys from store
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Tests windows is modified when manipulate timelines / timebars
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Move isModified from state.windows to state.hsc
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/windows';
import * as types from 'store/types';
import windowsReducer from './index';

const reducer = freezeArgs(windowsReducer);

describe('store:windows:reducer:window', () => {
  describe('update title', () => {
    test('updates title', () => {
      const state = reducer(
        { myWindowId: { title: 'window 1' } },
        actions.updateTitle('myWindowId', 'window 2')
      );
      expect(state.myWindowId.title).toEqual('window 2');
    });
  });
  describe('update geometry', () => {
    test('update only one', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
        actions.updateGeometry('myWindowId', 120)
      );
      expect(state.myWindowId).toEqual({
        geometry: {
          x: 120,
          y: 100,
          w: 100,
          h: 100,
        },
      });
    });
    test('update all', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
        actions.updateGeometry('myWindowId', 120, 130, 140, 150)
      );
      expect(state.myWindowId).toEqual({
        geometry: { x: 120, y: 130, w: 140, h: 150 },
      });
    });
    test('update nothing', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 120, y: 130, w: 140, h: 150 } } },
        actions.updateGeometry('myWindowId')
      );
      expect(state.myWindowId).toEqual({
        geometry: { x: 120, y: 130, w: 140, h: 150 },
      });
    });
  });
  describe('focus page', () => {
    test('should focus page corresponding to arg', () => {
      const state = { myWindowId: { focusedPage: null } };
      const action = {
        type: types.WS_WINDOW_PAGE_FOCUS,
        payload: {
          windowId: 'myWindowId',
          pageId: 'myFocusedPageId',
        },
      };
      const nextState = reducer(state, action);
      expect(nextState.myWindowId.focusedPage).toEqual('myFocusedPageId');
    });
  });
  describe('reorder pages', () => {
    test('reorder', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2', '3'] } },
        actions.reorderPages('myWindowId', ['2', '3', '1'])
      );
      expect(state.myWindowId.pages).toEqual(['2', '3', '1']);
    });
    test('doesn\'t remove key', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2', '3'] } },
        actions.reorderPages('myWindowId', ['2', '3'])
      );
      expect(state.myWindowId.pages).toEqual(['2', '3', '1']);
    });
    test('doesn\'t add key', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2'] } },
        actions.reorderPages('myWindowId', ['2', '3', '1'])
      );
      expect(state.myWindowId.pages).toEqual(['2', '1']);
    });
  });
  describe('minimize/restore window', () => {
    test('should minimize window', () => {
      const state = {
        myWindowId: { minimized: false },
      };
      const action = actions.minimize('myWindowId');
      expect(reducer(state, action).myWindowId.minimized).toBe(true);
    });
    test('should restore window', () => {
      const state = {
        myWindowId: { minimized: true },
      };
      const action = actions.restore('myWindowId');
      expect(reducer(state, action).myWindowId.minimized).not.toBe(true);
    });
  });
  describe('setIsLoaded', () => {
    test('should set is loaded', () => {
      expect(reducer({ myWindowId: { title: 'Title', isLoaded: false } },
        actions.setIsLoaded('myWindowId'))).toEqual({ myWindowId: { title: 'Title', isLoaded: true } });
    });
  });
  test('displayHelp', () => {
    const state = { myId: { title: 'Title', displayHelp: false } };
    const nextState = reducer(state, actions.displayHelp('myId', true));
    expect(nextState.myId.displayHelp).toBe(true);
    expect(reducer(nextState, actions.displayHelp('myId', false))
      .myId.displayHelp).toBe(false);
  });
});
