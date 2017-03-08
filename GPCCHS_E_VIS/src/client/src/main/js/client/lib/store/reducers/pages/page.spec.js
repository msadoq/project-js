/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/pages';
import pagesReducer from '.././pages';
import * as types from '../../types';

const reducer = freezeArgs(pagesReducer);

describe('store:page:reducer', () => {
  describe('un/mount view', () => {
    it('mount', () => {
      let state = reducer(
        { myPageId: { views: [], title: 'aa' } },
        actions.mountView('myPageId', 'myViewId')
      );
      state.myPageId.views.should.eql(['myViewId']);
      state = reducer(
        state,
        actions.mountView('myPageId', 'another')
      );
      state.myPageId.views.should.eql(['myViewId', 'another']);
    });
    it('unmount', () => {
      const state = { myPageId: { views: ['myViewId', 'another'], title: 'aa' } };
      const nextState = reducer(state, actions.unmountView('myPageId', 'myViewId'));
      nextState.myPageId.views.should.eql(['another']);
    });
  });
  describe('open/close editor', () => {
    const editor = {
      isOpened: true,
      viewId: 'myViewId',
      viewType: 'plot',
    };
    it('open', () => {
      const state = reducer(
        reducer(undefined, actions._add('myPageId')),
        actions.openEditor('myPageId', 'myViewId', 'plot', { foo: 'bar' })
      );
      state.myPageId.editor.should.eql(editor);
    });
    it('close', () => {
      const state = reducer(
        { myPageId: { editor } },
        actions.closeEditor('myPageId')
      );
      state.myPageId.editor.should.eql(Object.assign({}, editor, { isOpened: false }));
    });
  });
  describe('update layout', () => {
    it('update layout simple', () => {
      const state = reducer(
        { myPageId: { layout: [{ key: '1' }, { key: '2' }], title: 'aa' } },
        actions.updateLayout('myPageId', [{ key: '3' }, { key: '4' }])
      );
      state.myPageId.layout.should.eql([{ key: '3' }, { key: '4' }]);
      state.myPageId.isModified.should.be.true;
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
    it('flase -> true', () => {
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
  describe('updateTimebarHeight', () => {
    it('ok', () => {
      reducer({ myPage: { timebarHeight: 5 } }, actions.updateTimebarHeight('myPage', 210))
      .should.eql({ myPage: { timebarHeight: 210, isModified: true } });
    });
    it('height to small', () => {
      reducer({ myPage: { timebarHeight: 5 } }, actions.updateTimebarHeight('myPage', 20))
      .should.eql({ myPage: { timebarHeight: 135, isModified: true } });
    });
    it('invalid view id', () => {
      reducer({ myPage: { timebarHeight: 5 } }, actions.updateTimebarHeight('noPage', 10))
      .should.eql({ myPage: { timebarHeight: 5 } });
    });
  });
  describe('collapse', () => {
    it('collapses timebar', () => {
      const state = { myPage: { timebarHeight: 42 } };
      const action = actions.collapseTimebar('myPage', true);
      const newState = reducer(state, action);
      newState.myPage.should.be.eql({
        timebarHeight: 42,
        timebarCollapsed: true,
        isModified: true,
      });
    });
  });
});
