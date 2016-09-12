/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './pageActions';
import reducer, { getPage, getViews, getLayout } from './pageReducer';

describe('store:page', () => {
  describe('actions & reducer', () => {
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
          actions.add('myPageId', 'Title', ['myViewId'], [
            { viewId: 'myViewId', x: 10, y: 10, w: 10, h: 10 },
          ])
        );
        state.myPageId.should.deep.eql({
          title: 'Title',
          views: ['myViewId'],
          layout: [
            { viewId: 'myViewId', x: 10, y: 10, w: 10, h: 10 },
          ],
          editor: {
            isOpened: false,
            viewId: null,
            viewType: null,
            configuration: null,
          },
        });
      });
      it('add empty', () => {
        const state = reducer(
          undefined,
          actions.add('myPageId')
        );
        state.myPageId.should.deep.eql({
          title: 'Unknown',
          views: [],
          layout: [],
          editor: {
            isOpened: false,
            viewId: null,
            viewType: null,
            configuration: null,
          },
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
        let state = reducer(
          { myPageId: { views: ['myViewId', 'another'] } },
          actions.unmountView('myPageId', 'myViewId')
        );
        state.myPageId.views.should.eql(['another']);
        state = reducer(
          state,
          actions.unmountView('myPageId', 'another')
        );
        state.myPageId.views.should.eql([]);
      });
    });
    describe('open/close editor', () => {
      const editor = {
        isOpened: true,
        viewId: 'myViewId',
        viewType: 'plot',
        configuration: { foo: 'bar' },
      };
      it('open', () => {
        const state = reducer(
          reducer(undefined, actions.add('myPageId')),
          actions.openEditor('myPageId', 'myViewId', 'plot', { foo: 'bar'})
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
        getState().views[newViewId].title.should.equal('Unknown');
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
  describe('selectors', () => {
    it('getPage', () => {
      const { getState } = getStore({
        pages: {
          myPageId: { title: 'Title 1' },
        },
      });
      getPage(getState(), 'myPageId').should.have.property('title', 'Title 1');
      should.not.exist(getPage(getState(), 'unknownId'));
    });
    it('getViews', () => {
      const { getState } = getStore({
        pages: {
          myPageId: { views: ['v3', 'v1', 'v4'] },
        },
        views: { v1: {}, v2: {}, v3: {} },
      });
      getViews(getState(), 'myPageId').should.eql([
        { viewId: 'v3' },
        { viewId: 'v1' },
      ]);
    });
    it('getLayout', () => {
      // TODO getLayout
    });
  });
});
