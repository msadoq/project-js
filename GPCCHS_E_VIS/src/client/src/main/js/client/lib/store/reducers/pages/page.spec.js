// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : store/reducers/*.spec.js : spliting between plurial and singular specs.
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Change tests in reducers/pages/page .
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Implement a page panels reducer to allow panels configuration storage in page
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix a layout bug, add a test for abesson
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { freezeArgs, freezeMe } from 'common/jest';
import * as actions from 'store/actions/pages';
import * as types from 'store/types';
import pagesReducer from '../pages';

const reducer = freezeArgs(pagesReducer);

describe('store:page:reducer', () => {
  describe('update layout', () => {
    test('update layout simple', () => {
      const state = reducer(
        { myPageId: { layout: [{ i: '1' }, { i: '2', collapsed: true }], title: 'aa' } },
        actions.updateLayout('myPageId', [{ i: '2', x: 1, y: 2 }])
      );
      expect(state.myPageId.layout).toEqual([{ i: '1' }, { i: '2', x: 1, y: 2, collapsed: true }]);
      expect(state.myPageId.isModified).toBe(true);
    });
    test('does not update dimensions when collapsed', () => {
      const state = reducer(
        { myPageId: { layout: [{ i: '1' }, { i: '2', collapsed: true }], title: 'aa' } },
        actions.updateLayout('myPageId', [{ i: '2', h: 1, w: 2 }])
      );
      expect(state.myPageId.layout).toEqual([{ i: '1' }, { i: '2', collapsed: true }]);
    });
  });
  describe('updateAbsolutePath', () => {
    test('empty state', () => {
      expect(reducer({}, actions.updateAbsolutePath('myPage', 'myPath'))).toEqual({});
    });
    test('invalid page id', () => {
      const state = { page1: {} };
      const newState = reducer(state, {
        type: types.WS_PAGE_UPDATE_ABSOLUTEPATH,
        payload: {
          pageId: 'myPage',
          newPath: 'myPath',
        },
      });
      expect(newState).toEqual(state);
    });
    test('valid page id', () => {
      const state = { page1: { absolutePath: 'path1' } };
      const newState = reducer(state, {
        type: types.WS_PAGE_UPDATE_ABSOLUTEPATH,
        payload: {
          pageId: 'page1',
          newPath: 'newPath',
        },
      });
      expect(newState).toEqual({ page1: { absolutePath: 'newPath', isModified: true } });
    });
    test('update absolutePath for new page', () => {
      const state = { page1: { pageId: 'page1' } };
      const newState = reducer(state, {
        type: types.WS_PAGE_UPDATE_ABSOLUTEPATH,
        payload: {
          pageId: 'page1',
          newPath: 'newPath',
        },
      });
      expect(newState).toEqual({ page1: { pageId: 'page1', absolutePath: 'newPath', isModified: true } });
    });
  });
  describe('updatePath', () => {
    test('empty state', () => {
      const newState = reducer({}, {
        type: types.WS_PAGE_UPDATEPATH,
        payload: {
          pageId: 'myPage',
          newPath: 'myPath',
        },
      });
      expect(newState).toEqual({});
    });
    test('valid page id', () => {
      const state = { page1: { path: 'path1' } };
      const newState = reducer(state, {
        type: types.WS_PAGE_UPDATEPATH,
        payload: {
          pageId: 'page1',
          newPath: 'newPath',
        },
      });
      expect(newState).toEqual({ page1: { path: 'newPath', isModified: true } });
    });
  });
  describe('set page oid', () => {
    test('empty state', () => {
      const newState = reducer({}, {
        type: types.WS_PAGE_SET_OID,
        payload: {
          pageId: 'myPage',
          oid: '1234',
        },
      });
      expect(newState).toEqual({});
    });
    test('sets oid', () => {
      const state = { page1: { } };
      const newState = reducer(state, {
        type: types.WS_PAGE_SET_OID,
        payload: {
          pageId: 'page1',
          oid: '1234',
        },
      });
      expect(newState).toEqual({ page1: { oId: '1234', isModified: true } });
    });
  });
  describe('setModified', () => {
    test('no change', () => {
      expect(
        reducer({ myPage: { isModified: false } }, actions.setModified('myPage', false))
      ).toEqual({ myPage: { isModified: false } });
      expect(
        reducer({ myPage: { isModified: true } }, actions.setModified('myPage', true))
      ).toEqual({ myPage: { isModified: true } });
    });
    test('false -> true', () => {
      expect(
        reducer({ myPage: { isModified: false } }, actions.setModified('myPage', true))
      ).toEqual({ myPage: { isModified: true } });
    });
    test('true -> false', () => {
      expect(
        reducer({ myPage: { isModified: true } }, actions.setModified('myPage', false))
      ).toEqual({ myPage: { isModified: false } });
    });
    test('invalid view id', () => {
      const state = { myPage: { isModified: true } };
      expect(reducer(state, actions.setModified('noPage', false))).toEqual(state);
    });
  });
  describe('mount and unmount timebar', () => {
    test('tb1 -> newTb1', () => {
      const state = { myPage: { timebarUuid: 'tb1' } };
      const action = { type: types.WS_PAGE_TIMEBAR_MOUNT, payload: { pageId: 'myPage', timebarUuid: 'newTb1' } };
      const nextState = reducer(state, action);
      expect(nextState.myPage.timebarUuid).toEqual('newTb1');
    });
    test('tb1 -> null', () => {
      const state = { myPage: { timebarUuid: 'tb1' } };
      const action = { type: types.WS_PAGE_TIMEBAR_UNMOUNT, payload: { pageId: 'myPage' } };
      const nextState = reducer(state, action);
      expect(nextState.myPage.timebarUuid).toBeFalsy();
    });
  });
  describe('updateTItle', () => {
    test('ok', () => {
      const state = { myPage: { title: 'tb 1' } };
      const action = { type: types.WS_PAGE_UPDATE_TITLE, payload: { pageId: 'myPage', title: 'tb 2' } };
      const nextState = reducer(state, action);
      expect(nextState.myPage).toEqual({ title: 'tb 2', isModified: true });
    });
  });
  describe('minimize search panel', () => {
    test('searchIsminimized should be false', () => {
      const state = freezeMe({
        myPage: {
          title: 'tb 1',
          panels: {
            searchIsMinimized: true,
            searchViewsIds: ['myViewId'],
            searchCount: {
              myViewId: 5,
            },
          },
        },
      });
      const action = { type: types.WS_PAGE_PANELS_MINIMIZE_SEARCH, payload: { pageId: 'myPage', isMinimized: false } };
      const nextState = reducer(state, action);
      expect(nextState.myPage.panels.searchIsMinimized).toBeFalsy();
    });
    test('searchIsminimized should be true, searchViewId should be null and searchCount should be null', () => {
      const state = freezeMe({
        myPage: {
          title: 'tb 1',
          panels: {
            searchIsMinimized: true,
            searchViewsIds: ['myViewId'],
            searchCount: {
              myViewId: 5,
            },
          },
        },
      });
      const action = { type: types.WS_PAGE_PANELS_MINIMIZE_SEARCH, payload: { pageId: 'myPage', isMinimized: true } };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        myPage: {
          title: 'tb 1',
          panels: {
            searchIsMinimized: true,
            searchViewsIds: [],
            searchCount: null,
          },
        },
      });
    });
  });
  describe('updateSearchCount', () => {
    test('search count should be 10', () => {
      const state = freezeMe({
        myPage: {
          title: 'tb 1',
          panels: {
            searchCount: 2,
          },
        },
      });
      const action = { type: types.WS_PAGE_PANELS_UPDATE_SEARCH_COUNT, payload: { pageId: 'myPage', searchCount: 10 } };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        myPage: {
          panels: {
            searchCount: 10,
          },
          title: 'tb 1',
        },
      });
    });
    test('search count should be 10', () => {
      const state = freezeMe({
        myPage: {
          title: 'tb 1',
          panels: {
          },
        },
      });
      const action = { type: types.WS_PAGE_PANELS_UPDATE_SEARCH_COUNT, payload: { pageId: 'myPage', searchCount: 10 } };
      const nextState = reducer(state, action);
      expect(nextState).toEqual({
        myPage: {
          panels: {
            searchCount: 10,
          },
          title: 'tb 1',
        },
      });
    });
  });
  describe('Resize Search Panel', () => {
    test('searchWidth should be 350', () => {
      const state = freezeMe({
        myPage: {
          title: 'tb 1',
          panels: {
            searchWidth: 250,
          },
        },
      });
      const action = { type: types.WS_PAGE_PANELS_RESIZE_SEARCH, payload: { pageId: 'myPage', size: 350 } };
      const nextState = reducer(state, action);
      expect(nextState.myPage.panels).toEqual({ searchWidth: 350 });
    });
  });
});
