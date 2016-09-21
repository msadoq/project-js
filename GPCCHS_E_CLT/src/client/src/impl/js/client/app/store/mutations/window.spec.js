/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './windowActions';
import reducer, {
  getWindow,
  getPages,
  getFocusedPage,
  getWindowSubscriptions,
} from './windowReducer';

describe('store:window', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.be.an('object').that.is.empty;
    });
    it('unknown action', () => {
      reducer({ myWindowId: { title: 'Title' } }, {})
        .should.eql({ myWindowId: { title: 'Title' } });
    });
    describe('add', () => {
      it('add', () => {
        const state = reducer(
          undefined,
          actions.add('myWindowId', 'Title', { x: 110 }, ['myPageId'])
        );
        state.myWindowId.should.deep.eql({
          title: 'Title',
          focusedPage: null,
          pages: ['myPageId'],
          geometry: { w: 800, h: 600, x: 110, y: 10 },
        });
      });
      it('add empty', () => {
        const state = reducer(
          undefined,
          actions.add('myWindowId')
        );
        state.myWindowId.should.deep.eql({
          title: 'Unknown',
          focusedPage: null,
          pages: [],
          geometry: { x: 10, y: 10, w: 800, h: 600 },
        });
      });
    });
    describe('remove', () => {
      it('remove', () => {
        const state = reducer(
          { myWindowId: { title: 'Title' } },
          actions.remove('myWindowId')
        );
        state.should.not.have.property('myWindowId');
      });
      it('remove unknown', () => {
        const state = reducer(
          { myWindowId: { title: 'Title' } },
          actions.remove('foo')
        );
        state.should.have.property('myWindowId');
      });
    });
    describe('update geometry', () => {
      it('update only one', () => {
        const state = reducer(
          { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
          actions.updateGeometry('myWindowId', 120)
        );
        state.myWindowId.should.have.property('geometry').with.properties({
          x: 120, y: 100, w: 100, h: 100
        });
      });
      it('update all', () => {
        const state = reducer(
          { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
          actions.updateGeometry('myWindowId', 120, 130, 140, 150)
        );
        state.myWindowId.should.have.property('geometry').with.properties({
          x: 120, y: 130, w: 140, h: 150
        });
      });
      it('update nothing', () => {
        const state = reducer(
          { myWindowId: { geometry: { x: 120, y: 130, w: 140, h: 150 } } },
          actions.updateGeometry('myWindowId')
        );
        state.myWindowId.should.have.property('geometry').with.properties({
          x: 120, y: 130, w: 140, h: 150
        });
      });
    });
    it('focus page', () => {
      let state = reducer(
        { myWindowId: { focusedPage: null } },
        actions.focusPage('myWindowId', 'myPageId')
      );
      state.myWindowId.focusedPage.should.equal('myPageId');
      state = reducer(
        state,
        actions.focusPage('myWindowId')
      );
      should.not.exist(state.myWindowId.focusedPage);
    });
    describe('un/mount page', () => {
      it('mount', () => {
        let state = reducer(
          { myWindowId: { pages: [] } },
          actions.mountPage('myWindowId', 'myPageId')
        );
        state.myWindowId.pages.should.eql(['myPageId']);
        state = reducer(
          state,
          actions.mountPage('myWindowId', 'another')
        );
        state.myWindowId.pages.should.eql(['myPageId', 'another']);
      });
      it('unmount', () => {
        let state = reducer(
          { myWindowId: { pages: ['myPageId', 'another'] } },
          actions.unmountPage('myWindowId', 'myPageId')
        );
        state.myWindowId.pages.should.eql(['another']);
        state = reducer(
          state,
          actions.unmountPage('myWindowId', 'another')
        );
        state.myWindowId.pages.should.eql([]);
      });
    });
    describe('reorder pages', () => {
      it('reorder', () => {
        const state = reducer(
          { myWindowId: { pages: ['1', '2', '3'] } },
          actions.reorderPages('myWindowId', ['2', '3', '1'])
        );
        state.myWindowId.pages.should.eql(['2', '3', '1']);
      });
      it('doesn\'t remove key', () => {
        const state = reducer(
          { myWindowId: { pages: ['1', '2', '3'] } },
          actions.reorderPages('myWindowId', ['2', '3'])
        );
        state.myWindowId.pages.should.eql(['2', '3', '1']);
      });
      it('doesn\'t add key', () => {
        const state = reducer(
          { myWindowId: { pages: ['1', '2'] } },
          actions.reorderPages('myWindowId', ['2', '3', '1'])
        );
        state.myWindowId.pages.should.eql(['2', '1']);
      });
    });
    describe('addAndMount/unmountAndRemove', () => {
      const { dispatch, getState } = getStore({ windows: { myWindowId: { pages: ['1'] } } });
      it('addAndMount', () => {
        dispatch(actions.addAndMount('myWindowId'));
        getState().windows.myWindowId.pages.should.be.an('array').with.lengthOf(2);
        getState().pages[getState().windows.myWindowId.pages[1]].title.should.equal('Unknown');
      });
      it('unmountAndRemove', () => {
        dispatch(actions.unmountAndRemove('myWindowId', getState().windows.myWindowId.pages[1]));
        getState().windows.myWindowId.pages.should.be.an('array').with.lengthOf(1);
        should.not.exist(getState().pages[getState().windows.myWindowId.pages[1]]);
      });
    });
  });
  describe('selectors', () => {
    it('getWindow', () => {
      const { getState } = getStore({
        windows: {
          myWindowId: { title: 'Title 1' },
        },
      });
      getWindow(getState(), 'myWindowId').should.have.property('title', 'Title 1');
      should.not.exist(getWindow(getState(), 'unknownId'));
    });
    it('getPages', () => {
      const { getState } = getStore({
        windows: {
          myWindowId: { pages: ['p3', 'p1', 'p4'] },
        },
        pages: { p1: {}, p2: {}, p3: {} },
      });
      getPages(getState(), 'myWindowId').should.eql([
        { pageId: 'p3' },
        { pageId: 'p1' },
      ]);
    });
    describe('getFocusedPage', () => {
      it('works', () => {
        const { getState } = getStore({
          windows: {
            myWindowId: { focusedPage: 'p2', pages: ['p1', 'p2', 'p3'] },
          },
          pages: {
            p2: { title: 'Title 2' },
          },
        });
        getFocusedPage(getState(), 'myWindowId').should.equal('p2');
      });
      it('window doesn\'t exist', () => {
        const { getState } = getStore();
        should.not.exist(getFocusedPage(getState(), 'myWindowId'));
      });
      it('window hasn\'t page', () => {
        const { getState } = getStore({ windows: { myWindowId: {} } });
        should.not.exist(getFocusedPage(getState(), 'myWindowId'));
      });
      it('window has a focusedPage that isn\'t in pages', () => {
        const { getState } = getStore({ windows: { myWindowId: { focusedPage: 'p1' } } });
        should.not.exist(getFocusedPage(getState(), 'myWindowId'));
      });
      it('window has a focusedPage that doesn\'t exist', () => {
        const { getState } = getStore({
          windows: { myWindowId: { focusedPage: 'p1', pages: ['p1', 'p2'] } },
          pages: { p2: {} },
        });
        getFocusedPage(getState(), 'myWindowId').should.equal('p2');
      });
      it('window hasn\'t focusedPage and at least one page', () => {
        const { getState } = getStore({
          windows: { myWindowId: { pages: ['p1', 'p2'] } },
          pages: { p1: {} }
        });
        getFocusedPage(getState(), 'myWindowId').should.equal('p1');
      });
      it('window has a focusedPage that is not in pages', () => {
        const { getState } = getStore({
          windows: { myWindowId: { focusedPage: 'p2', pages: ['p1'] } },
          pages: { p1: {} }
        });
        getFocusedPage(getState(), 'myWindowId').should.equal('p1');
      });
      it('take the first existing page for this window', () => {
        const { getState } = getStore({
          windows: { myWindowId: { focusedPage: 'p1', pages: ['p2', 'p3', 'p4'] } },
          pages: { p3: {}, p4: {} }
        });
        getFocusedPage(getState(), 'myWindowId').should.equal('p3');
      });
    });
    describe('getWindowSubscriptions', () => {
      it('works', () => {
        const store = getStore({
          windows: { myWindowId: { pages: ['p1', 'p2', 'p3', 'not-exist'] }},
          pages: {
            p1: { views: ['v1'] },
            p2: { views: ['v2', 'not-exist', 'v3'] },
            p3: { views: [] },
          },
          views: {
            v1: { type: 'TextView', configuration: { textViewEntryPoints: [
              { connectedData: { uuid: 'cd1' } }
            ] } },
            v2: { type: 'TextView', configuration: [] },
            v3: { type: 'TextView', configuration: { textViewEntryPoints: [
              { connectedData: { uuid: 'cd2' } },
              { connectedData: { uuid: 'not-exist' } },
              { connectedData: { uuid: 'cd3' } },
            ] } },
          },
          connectedData: {
            cd1: { formula: 'f-f' },
            cd2: { formula: 'f+f' },
            cd3: { formula: 'f*f' },
          },
        });
        getWindowSubscriptions(store.getState(), 'myWindowId').should.eql([
          { connectedDataId: 'cd1', formula: 'f-f' },
          { connectedDataId: 'cd2', formula: 'f+f' },
          { connectedDataId: 'cd3', formula: 'f*f' },
        ]);
      });
      it('unknown window', () => {
        const store = getStore({});
        getWindowSubscriptions(store.getState(), 'myWindowId').should.eql([]);
      });
    });
  });
});
