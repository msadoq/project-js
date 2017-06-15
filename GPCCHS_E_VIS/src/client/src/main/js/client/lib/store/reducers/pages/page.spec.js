import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/pages';
import pagesReducer from '../pages';
import * as types from '../../types';

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
});
