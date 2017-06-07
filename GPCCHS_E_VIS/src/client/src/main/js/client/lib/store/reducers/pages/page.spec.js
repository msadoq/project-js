/* eslint no-unused-expressions: 0 */
import { freezeArgs, should } from '../../../common/test';
import * as actions from '../../actions/pages';
import pagesReducer from '../pages';
import * as types from '../../types';

const reducer = freezeArgs(pagesReducer);

describe('store:page:reducer', () => {
  describe('update layout', () => {
    it('update layout simple', () => {
      const state = reducer(
        { myPageId: { layout: [{ i: '1' }, { i: '2', collapsed: true }], title: 'aa' } },
        actions.updateLayout('myPageId', [{ i: '2', x: 1, y: 2 }])
      );
      expect(state.myPageId.layout).toEqual([{ i: '1' }, { i: '2', x: 1, y: 2, collapsed: true }]);
      expect(state.myPageId.isModified).toBe(true);
    });
    it('does not update dimensions when collapsed', () => {
      const state = reducer(
        { myPageId: { layout: [{ i: '1' }, { i: '2', collapsed: true }], title: 'aa' } },
        actions.updateLayout('myPageId', [{ i: '2', h: 1, w: 2 }])
      );
      expect(state.myPageId.layout).toEqual([{ i: '1' }, { i: '2', collapsed: true }]);
    });
  });
  describe('updateAbsolutePath', () => {
    it('empty state', () => {
      expect(typeof reducer({}, actions.updateAbsolutePath('myPage', 'myPath'))).toHaveLength(0);
    });
    it('invalid page id', () => {
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
    it('valid page id', () => {
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
    it('update absolutePath for new page', () => {
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
    it('empty state', () => {
      const newState = reducer({}, {
        type: types.WS_PAGE_UPDATEPATH,
        payload: {
          pageId: 'myPage',
          newPath: 'myPath',
        },
      });
      expect(typeof newState).toHaveLength(0);
    });
    it('valid page id', () => {
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
    it('empty state', () => {
      const newState = reducer({}, {
        type: types.WS_PAGE_SET_OID,
        payload: {
          pageId: 'myPage',
          oid: '1234',
        },
      });
      expect(typeof newState).toHaveLength(0);
    });
    it('sets oid', () => {
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
    it('no change', () => {
      expect(
        reducer({ myPage: { isModified: false } }, actions.setModified('myPage', false))
      ).toEqual({ myPage: { isModified: false } });
      expect(
        reducer({ myPage: { isModified: true } }, actions.setModified('myPage', true))
      ).toEqual({ myPage: { isModified: true } });
    });
    it('false -> true', () => {
      expect(
        reducer({ myPage: { isModified: false } }, actions.setModified('myPage', true))
      ).toEqual({ myPage: { isModified: true } });
    });
    it('true -> false', () => {
      expect(
        reducer({ myPage: { isModified: true } }, actions.setModified('myPage', false))
      ).toEqual({ myPage: { isModified: false } });
    });
    it('invalid view id', () => {
      const state = { myPage: { isModified: true } };
      expect(reducer(state, actions.setModified('noPage', false))).toEqual(state);
    });
  });
  describe('mount and unmount timebar', () => {
    it('tb1 -> newTb1', () => {
      const state = { myPage: { timebarUuid: 'tb1' } };
      const action = { type: types.WS_PAGE_TIMEBAR_MOUNT, payload: { pageId: 'myPage', timebarUuid: 'newTb1' } };
      const nextState = reducer(state, action);
      expect(nextState.myPage.timebarUuid).toEqual('newTb1');
    });
    it('tb1 -> null', () => {
      const state = { myPage: { timebarUuid: 'tb1' } };
      const action = { type: types.WS_PAGE_TIMEBAR_UNMOUNT, payload: { pageId: 'myPage' } };
      const nextState = reducer(state, action);
      expect(nextState.myPage.timebarUuid).toBeFalsy();
    });
  });
  describe('updateTItle', () => {
    it('ok', () => {
      const state = { myPage: { title: 'tb 1' } };
      const action = { type: types.WS_PAGE_UPDATE_TITLE, payload: { pageId: 'myPage', title: 'tb 2' } };
      const nextState = reducer(state, action);
      expect(nextState.myPage).toEqual({ title: 'tb 2', isModified: true });
    });
  });
});
