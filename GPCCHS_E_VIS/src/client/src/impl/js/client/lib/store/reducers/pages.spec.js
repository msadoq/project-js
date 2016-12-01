/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import * as actions from '../actions/pages';
import reducer from './pages';

describe('store:page:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myPageId: { title: 'Title' } }, {})
      .should.eql({ myPageId: { title: 'Title' } });
  });
  describe('add', () => {
    it('add', () => {
      const state = reducer(
        undefined,
        actions.add('myPageId', 'myTimebarId', 'Title', ['myViewId'], [
          { viewId: 'myViewId', x: 10, y: 10, w: 10, h: 10 },
        ])
      );
      state.myPageId.should.deep.eql({
        title: 'Title',
        timebarHeight: 135,
        timebarId: 'myTimebarId',
        views: ['myViewId'],
        layout: [
          { viewId: 'myViewId', x: 10, y: 10, w: 10, h: 10 },
        ],
        editor: {
          isOpened: false,
          viewId: null,
          viewType: null,
        },
        path: undefined,
        oId: undefined,
        absolutePath: undefined,
        isModified: false,
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
        timebarId: null,
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
        isModified: false,
      });
    });
  });
  describe('remove', () => {
    it('remove', () => {
      const state = reducer(
        { myPageId: { title: 'Title' } },
        actions.remove('myPageId')
      );
      state.should.not.have.property('myPageId');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myPageId: { title: 'Title' } },
        actions.remove('foo')
      );
      state.should.have.property('myPageId');
    });
  });
  describe('un/mount view', () => {
    it('mount', () => {
      let state = reducer(
        { myPageId: { views: [] } },
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
      const { dispatch, getState } = getStore({ pages: { myPageId: { views: ['myViewId', 'another'] } } });
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
  it('update layout', () => {
    const state = reducer(
      { myPageId: { layout: [{ key: '1' }, { key: '2' }] } },
      actions.updateLayout('myPageId', [{ key: '2' }, { key: '1' }])
    );
    state.myPageId.layout.should.eql([{ key: '2' }, { key: '1' }]);
  });
  describe('addAndMount/unmountAndRemove', () => {
    const { dispatch, getState } = getStore({ pages: { myPageId: { views: ['v1'] } } });
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
  describe('openViewInEditor', () => {
    // TODO actions.unmountAndRemove
  });
});
