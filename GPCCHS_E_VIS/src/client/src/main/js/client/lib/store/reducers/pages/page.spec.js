/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
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
      state.myPageId.layout.should.eql([{ i: '1' }, { i: '2', x: 1, y: 2, collapsed: true }]);
      state.myPageId.isModified.should.be.true;
    });
    it('does not update dimensions when collapsed', () => {
      const state = reducer(
        { myPageId: { layout: [{ i: '1' }, { i: '2', collapsed: true }], title: 'aa' } },
        actions.updateLayout('myPageId', [{ i: '2', h: 1, w: 2 }])
      );
      state.myPageId.layout.should.eql([{ i: '1' }, { i: '2', collapsed: true }]);
    });
  });
  describe('updateAbsolutePath', () => {
    it('empty state', () => {
      reducer({}, actions.updateAbsolutePath('myPage', 'myPath'))
      .should.be.an('object').that.is.empty;
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
      newState.should.eql(state);
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
      newState.should.eql({ page1: { absolutePath: 'newPath', isModified: true } });
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
      newState.should.eql({ page1: { pageId: 'page1', absolutePath: 'newPath', isModified: true } });
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
      newState.should.be.an('object').that.is.empty;
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
      newState.should.eql({ page1: { path: 'newPath', isModified: true } });
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
      newState.should.be.an('object').that.is.empty;
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
      newState.should.eql({ page1: { oId: '1234', isModified: true } });
    });
  });
  describe('setModified', () => {
    it('no change', () => {
      reducer({ myPage: { isModified: false } }, actions.setModified('myPage', false))
      .should.eql({ myPage: { isModified: false } });
      reducer({ myPage: { isModified: true } }, actions.setModified('myPage', true))
      .should.eql({ myPage: { isModified: true } });
    });
    it('false -> true', () => {
      reducer({ myPage: { isModified: false } }, actions.setModified('myPage', true))
      .should.eql({ myPage: { isModified: true } });
    });
    it('true -> false', () => {
      reducer({ myPage: { isModified: true } }, actions.setModified('myPage', false))
      .should.eql({ myPage: { isModified: false } });
    });
    it('invalid view id', () => {
      const state = { myPage: { isModified: true } };
      reducer(state, actions.setModified('noPage', false))
      .should.eql(state);
    });
  });
  describe('updateTimebarId', () => {
    it('ok', () => {
      const state = { myPage: { timebarUuid: 'tb1' } };
      const action = { type: types.WS_PAGE_UPDATE_TIMEBARID, payload: { pageId: 'myPage', timebarUuid: 'newTb1' } };
      const nextState = reducer(state, action);
      nextState.myPage.timebarUuid.should.be.eql('newTb1');
    });
  });
  describe('updateTItle', () => {
    it('ok', () => {
      const state = { myPage: { title: 'tb 1' } };
      const action = { type: types.WS_PAGE_UPDATE_TITLE, payload: { pageId: 'myPage', title: 'tb 2' } };
      const nextState = reducer(state, action);
      nextState.myPage.should.eql({ title: 'tb 2', isModified: true });
    });
  });
});
