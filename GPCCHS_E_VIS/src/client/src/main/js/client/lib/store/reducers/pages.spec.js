/* eslint no-unused-expressions: 0 */
import { should, getStore, freezeMe } from '../../common/test';
import * as actions from '../actions/pages';
import reducer from './pages';
import * as types from '../types';

describe('store:page:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    const state = { myPageId: { title: 'Title' } };
    reducer(state, {}).should.eql(state);
  });
  it('unknown action with pageId', () => {
    const state = { myPageId: { title: 'Title' } };
    reducer(state, { payload: { pageId: 'myPageId' } }).should.eql(state);
  });
  describe('add', () => {
    it('add', () => {
      // 'path', 'oId', 'absolutePath', 'isModified'
      const state = reducer(
        undefined,
        actions.add('myPageId', 'myTimebarId', 'Title', ['myViewId'], [
          { viewId: 'myViewId', x: 10, y: 10, w: 10, h: 10 },
        ], '/path', '1234', '/absolutePath', true, [1, 2, 3, 4])
      );
      state.myPageId.should.deep.eql({
        title: 'Title',
        timebarHeight: 135,
        timebarUuid: 'myTimebarId',
        views: ['myViewId'],
        layout: [
          { viewId: 'myViewId', x: 10, y: 10, w: 10, h: 10 },
        ],
        editor: {
          isOpened: false,
          viewId: null,
          viewType: null,
        },
        path: '/path',
        oId: '1234',
        absolutePath: '/absolutePath',
        isModified: true,
        properties: [1, 2, 3, 4],
        timebarCollapsed: false,
      });
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions.add('myPageId')
      );
      state.myPageId.should.deep.eql({
        title: 'Unknown',
        timebarHeight: 135,
        timebarUuid: null,
        views: [],
        layout: [],
        editor: {
          isOpened: false,
          viewId: null,
          viewType: null,
        },
        path: undefined,
        oId: undefined,
        absolutePath: undefined,
        isModified: true,
        properties: [],
        timebarCollapsed: false,
      });
    });
  });
  describe('remove', () => { // TODO changer car thunk
    it('removePage', () => {
      const state = reducer(
        { myPageId: { title: 'Title' } },
        actions.removePage('myPageId')
      );
      state.should.not.have.property('myPageId');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myPageId: { title: 'Title' } },
        actions.removePage('foo')
      );
      state.should.have.property('myPageId');
    });
    it('remove', () => {
      const { dispatch, getState } = getStore({ pages:
        { myPageId: { title: 'Title', views: ['view1'] } },
        views: { view1: {} } });
      dispatch(actions.remove('myPageId'));
      getState().pages.should.not.have.property('myPageId');
      getState().views.should.not.have.property('view1');
    });
    it('remove unknown', () => {
      const { dispatch, getState } = getStore({ pages:
        { myPageId: { title: 'Title', views: ['view1'] } },
        views: { view1: {} } });
      dispatch(actions.remove('wrongPageId'));
      getState().pages.should.have.property('myPageId');
      getState().views.should.have.property('view1');
    });
  });
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
      const { dispatch, getState } = getStore({ pages: { myPageId: { views: ['myViewId', 'another'], title: 'aa' } } });
      dispatch(actions.unmountView('myPageId', 'myViewId'));
      getState().pages.myPageId.views.should.eql(['another']);
      dispatch(actions.unmountView('myPageId', 'another'));
      getState().pages.myPageId.views.should.eql([]);
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
        reducer(undefined, actions.add('myPageId')),
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
        actions.updateLayoutSimple('myPageId', [{ key: '3' }, { key: '4' }])
      );
      state.myPageId.layout.should.eql([{ key: '3' }, { key: '4' }]);
    });
    it('update layout', () => {
      const { dispatch, getState } = getStore({
        pages:
        { myPageId: { layout: [{ h: 2, i: 'v1' }, { h: 2, i: 'v2' }], title: 'aa' } },
        views:
        {
          v1: { configuration: { collapsed: true } },
          v2: { configuration: { collapsed: false } },
        },
      });
      dispatch(actions.updateLayout('myPageId', [{ h: 3, i: 'v1' }, { h: 4, i: 'v2' }]));
      getState().pages.should.eql(
        { myPageId: { layout: [{ h: 3, i: 'v1' }, { h: 4, i: 'v2' }], title: 'aa', isModified: true } });
      getState().views.should.eql(
        {
          v1: {
            configuration: { collapsed: false },
            isModified: true,
          },
          v2: { configuration: { collapsed: false } },
        }
      );
    });
  });
  describe('addAndMount/unmountAndRemove', () => {
    const { dispatch, getState } = getStore({ pages: { myPageId: { views: ['v1'], title: 'aa' } } });
    let newViewId;
    it('addAndMount', () => {
      dispatch(actions.addAndMount('myPageId'));
      getState().pages.myPageId.views.should.be.an('array').with.lengthOf(2);
      newViewId = getState().pages.myPageId.views[1];
    });
    it('unmountAndRemove', () => {
      dispatch(actions.unmountAndRemove('myPageId', newViewId));
      getState().pages.myPageId.views.should.be.an('array').with.lengthOf(1);
      should.not.exist(getState().views[newViewId]);
    });
  });
  describe('moveViewToPage', () => {
    let dispatch;
    let getState;
    beforeEach(() => {
      const store = getStore({
        pages: {
          myPageId: { views: ['v1'], layout: [], title: 'aa' },
          myOtherPage: { views: ['v2'], layout: [], title: 'bb' },
        },
      });
      dispatch = store.dispatch;
      getState = store.getState;
    });
    it('existing toPage ok', () => {
      dispatch(actions.moveViewToPage('myWindowId', 'myPageId', 'myOtherPage', 'v1'));
      getState().pages.should.deep.equal({
        myPageId: { views: [], isModified: true, layout: [], title: 'aa' },
        myOtherPage: { views: ['v2', 'v1'],
          isModified: true,
          layout: [{ h: 5, i: 'v1', w: 5, x: 0, y: 0 }],
          title: 'bb',
        },
      });
    });
    it('toPage is a new page', () => {
      dispatch(actions.moveViewToPage('myWindowId', 'myPageId', 'newId', 'v1'));
      getState().pages.myPageId.should.deep.equal({ views: [], isModified: true, layout: [], title: 'aa' });
      getState().pages.myOtherPage.should.deep.equal({ views: ['v2'], layout: [], title: 'bb' });
      const pageId = Object.keys(getState().pages)[2];
      getState().pages[pageId].views.should.deep.equal(['v1']);
      getState().pages[pageId].isModified.should.deep.equal(true);
    });
    it('move to the same page', () => {
      const oldState = getState();
      dispatch(actions.moveViewToPage('myWindowId', 'myPageId', 'myPageId', 'v1'));
      getState().should.equal(oldState);
    });
  });
  describe('updateAbsolutePath', () => {
    it('empty state', () => {
      reducer({}, actions.updateAbsolutePath('myPage', 'myPath'))
      .should.be.an('object').that.is.empty;
    });
    it('invalid page id', () => {
      const state = { page1: {} };
      const newState = reducer(freezeMe(state), {
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
      const newState = reducer(freezeMe(state), {
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
      const newState = reducer(freezeMe(state), {
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
      const newState = reducer(freezeMe(state), {
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
      const newState = reducer(freezeMe(state), {
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
    // export const setModified = simple(types.WS_PAGE_SETMODIFIED, 'pageId', 'flag');
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
      reducer(freezeMe(state), actions.setModified('noPage', false))
      .should.eql(state);
    });
  });
  describe('updateTimebarId', () => {
    it('ok', () => {
      const { dispatch, getState } = getStore({ pages: { myPage: { timebarUuid: 't1' } } });
      dispatch(actions.updateTimebarId('myPage', 'time1'));
      getState().pages.myPage.should.deep.equal({ timebarUuid: 'time1' });
    });
    it('invalid view id', () => {
      const { dispatch, getState } = getStore({ pages: { myPage: { timebarUuid: 't1' } } });
      dispatch(actions.updateTimebarId('noPage', 'time1'));
      getState().pages.myPage.should.deep.equal({ timebarUuid: 't1' });
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
  describe('close workspace', () => {
    it('close', () => {
      reducer(freezeMe({ myPage: { timebarHeight: 5 } }), { type: types.HSC_CLOSE_WORKSPACE })
      .should.be.an('object').that.is.empty;
    });
  });
  describe('collapse', () => {
    it('collapses timebar', () => {
      const state = freezeMe({ myPage: { timebarHeight: 42 } });
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
