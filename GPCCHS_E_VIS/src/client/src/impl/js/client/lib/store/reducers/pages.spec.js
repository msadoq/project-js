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
        actions.remove('foo')
      );
      state.should.have.property('myPageId');
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
  it('update layout', () => {
    const state = reducer(
      { myPageId: { layout: [{ key: '1' }, { key: '2' }], title: 'aa' } },
      actions.updateLayout('myPageId', [{ key: '2' }, { key: '1' }])
    );
    state.myPageId.layout.should.eql([{ key: '2' }, { key: '1' }]);
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
  describe('openViewInEditor', () => {
    // TODO actions.unmountAndRemove
  });
  describe('moveViewToPage', () => {
    let dispatch;
    let getState;
    beforeEach(() => {
      const store = getStore({
        pages: {
          myPageId: { views: ['v1'], layout: [], title: 'aa' },
          myOtherPage: { views: ['v2'], layout: [], title: 'bb' },
        }
      });
      dispatch = store.dispatch;
      getState = store.getState;
    });
    it('existing toPage ok', () => {
      dispatch(actions.moveViewToPage('myWindowId', 'myPageId', 'myOtherPage', 'v1'));
      getState().pages.should.deep.equal({
        myPageId: { views: [], isModified: true, layout: [], title: '* aa' },
        myOtherPage: { views: ['v2', 'v1'],
          isModified: true,
          layout: [{ h: 5, i: 'v1', w: 5, x: 0, y: 0 }],
          title: '* bb',
        },
      });
    });
    it('toPage is a new page', () => {
      dispatch(actions.moveViewToPage('myWindowId', 'myPageId', 'newId', 'v1'));
      getState().pages.myPageId.should.deep.equal({ views: [], isModified: true, layout: [], title: '* aa' });
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
});
