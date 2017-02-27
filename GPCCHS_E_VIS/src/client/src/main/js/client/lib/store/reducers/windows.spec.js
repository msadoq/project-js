/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../common/test';
import * as actions from '../actions/windows';
import windowsReducer from './windows';
import * as types from '../types';

const reducer = freezeArgs(windowsReducer);

describe('store:windows:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myWindowId: { title: 'Title' } }, { payload: { windowId: 'myWindowId' } })
      .should.eql({ myWindowId: { title: 'Title' } });
  });
  describe('add', () => {
    it('add', () => {
      const action = actions.addWindow('myWindowId', 'Title', { x: 110 }, ['myPageId'], null, true);
      const state = reducer(undefined, action);
      state.myWindowId.should.deep.eql({
        title: 'Title',
        focusedPage: null,
        pages: ['myPageId'],
        geometry: { w: 800, h: 600, x: 110, y: 10 },
        debug: { whyDidYouUpdate: false, timebarVisibility: true },
        minimized: false,
        isModified: true,
        tabName: 'perRemoteId',
      });
    });
    it('add empty', () => {
      const state = reducer(undefined, actions.addWindow('myWindowId'));
      const win = state.myWindowId;
      win.title.should.eql('Unknown');
      win.isModified.should.eql(true);
      win.minimized.should.eql(false);
      win.geometry.should.deep.eql({ x: 10, y: 10, w: 800, h: 600 });
      win.tabName.should.eql('perRemoteId');
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
        x: 120, y: 100, w: 100, h: 100,
      });
    });
    it('update all', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
        actions.updateGeometry('myWindowId', 120, 130, 140, 150)
      );
      state.myWindowId.should.have.property('geometry').with.properties({
        x: 120, y: 130, w: 140, h: 150,
      });
    });
    it('update nothing', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 120, y: 130, w: 140, h: 150 } } },
        actions.updateGeometry('myWindowId')
      );
      state.myWindowId.should.have.property('geometry').with.properties({
        x: 120, y: 130, w: 140, h: 150,
      });
    });
  });
  describe('focus page', () => {
    it('should focus page corresponding to arg', () => {
      const state = { myWindowId: { focusedPage: null } };
      const action = {
        type: types.WS_WINDOW_PAGE_FOCUS,
        payload: {
          windowId: 'myWindowId',
          pageId: 'myFocusedPageId',
        },
      };
      const nextState = reducer(state, action);
      nextState.myWindowId.focusedPage.should.be.eql('myFocusedPageId');
    });
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
  describe('minimize/restore window', () => {
    it('should minimize window', () => {
      const state = {
        myWindowId: { minimized: false },
      };
      const action = actions.minimize('myWindowId');
      reducer(state, action).myWindowId.minimized.should.be.true;
    });
    it('should restore window', () => {
      const state = {
        myWindowId: { minimized: true },
      };
      const action = actions.restore('myWindowId');
      reducer(state, action).myWindowId.minimized.should.not.be.true;
    });
  });
  describe('close_workspace', () => {
    it('ok', () => {
      const newState = reducer({ myTimelineId: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
    });
  });
  describe('setModified', () => {
    it('ok', () => {
      reducer({ myWindowId: { title: 'Title', isModified: false } },
      actions.setModified('myWindowId', true))
        .should.eql({ myWindowId: { title: 'Title', isModified: true } });
    });
  });
  describe('explorer', () => {
    it('currentExplorer', () => {
      reducer({ myWindowId: { title: 'Title', isModified: false } },
      actions.currentExplorer('myWindowId', 'perView'))
        .should.eql({ myWindowId: { title: 'Title', isModified: false, tabName: 'perView' } });
      reducer({ myWindowId: { title: 'Title', isModified: false, tabName: 'perView' } },
      actions.currentExplorer('myWindowId', 'perRemoteId'))
        .should.eql({ myWindowId: { title: 'Title', isModified: false, tabName: 'perRemoteId' } });
    });
    it('updateExplorerWidth', () => {
      reducer({ myWindowId: { title: 'Title', isModified: false } },
      actions.updateExplorerWidth('myWindowId', 100))
        .should.eql({ myWindowId: { title: 'Title', isModified: false, explorerWidth: 100 } });
      reducer({ myWindowId: { title: 'Title', isModified: false, explorerWidth: 100 } },
      actions.updateExplorerWidth('myWindowId', 200))
        .should.eql({ myWindowId: { title: 'Title', isModified: false, explorerWidth: 200 } });
    });
    it('updateExplorerFlag', () => {
      const action = actions.updateExplorerFlag('myWindowId', 'explorerFlag', true);
      const nextState = reducer({ myWindowId: { title: 'Title', explorerFlag: false } }, action);
      nextState.myWindowId.explorerFlag.should.be.true;
    });
    it('displayExplorer', () => {
      const action = actions.displayExplorer('myWindowId', true);
      const nextState = reducer({ myWindowId: { title: 'Title', displayExplorer: false } }, action);
      nextState.myWindowId.displayExplorer.should.be.true;
    });
  });
  describe('updateTimebarId', () => {
    const action = {
      type: types.WS_PAGE_UPDATE_TIMEBARID,
      payload: {
        windowId: 'myWindowId',
        pageId: 'myPageId',
        timebarUuid: 'myTimebarUuid',
      },
    };
    it('set isModified to true', () => {
      reducer({ myWindowId: { pages: ['myPageId'] } }, action).should.be.eql({
        myWindowId: { pages: ['myPageId'], isModified: true },
      });
    });
    it('do not set isModified to true', () => {
      reducer({ myWindowId: { pages: ['1', '2', '3'] } }, action).should.be.eql({
        myWindowId: { pages: ['1', '2', '3'] },
      });
    });
  });
});
