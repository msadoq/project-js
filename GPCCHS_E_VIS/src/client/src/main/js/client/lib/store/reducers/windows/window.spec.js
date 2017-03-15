/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/windows';
import windowsReducer from '.././windows';
import * as types from '../../types';

const reducer = freezeArgs(windowsReducer);

describe('store:windows:reducer:window', () => {
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
  describe('setModified', () => {
    it('ok', () => {
      reducer({ myWindowId: { title: 'Title', isModified: false } },
      actions.setModified('myWindowId', true))
        .should.eql({ myWindowId: { title: 'Title', isModified: true } });
    });
  });
  describe('setIsLoaded', () => {
    it('should set is loaded', () => {
      reducer({ myWindowId: { title: 'Title', isLoaded: false } },
        actions.setIsLoaded('myWindowId'))
        .should.eql({ myWindowId: { title: 'Title', isLoaded: true } });
    });
  });
  describe('explorer', () => { // TODO boxmodel remove
    it('currentExplorer', () => { // TODO boxmodel remove
      reducer({ myWindowId: { title: 'Title', isModified: false } }, // TODO boxmodel remove
      actions.currentExplorer('myWindowId', 'perView')) // TODO boxmodel remove
        .should.eql({ myWindowId: { title: 'Title', isModified: false, tabName: 'perView' } }); // TODO boxmodel remove
      reducer({ myWindowId: { title: 'Title', isModified: false, tabName: 'perView' } }, // TODO boxmodel remove
      actions.currentExplorer('myWindowId', 'perRemoteId')) // TODO boxmodel remove
        .should.eql({ myWindowId: { title: 'Title', isModified: false, tabName: 'perRemoteId' } }); // TODO boxmodel remove
    }); // TODO boxmodel remove
    it('updateExplorerWidth', () => { // TODO boxmodel remove
      reducer({ myWindowId: { title: 'Title', isModified: false } }, // TODO boxmodel remove
      actions.updateExplorerWidth('myWindowId', 100)) // TODO boxmodel remove
        .should.eql({ myWindowId: { title: 'Title', isModified: false, explorerWidth: 100 } }); // TODO boxmodel remove
      reducer({ myWindowId: { title: 'Title', isModified: false, explorerWidth: 100 } }, // TODO boxmodel remove
      actions.updateExplorerWidth('myWindowId', 200)) // TODO boxmodel remove
        .should.eql({ myWindowId: { title: 'Title', isModified: false, explorerWidth: 200 } }); // TODO boxmodel remove
    }); // TODO boxmodel remove
    it('updateExplorerFlag', () => { // TODO boxmodel remove
      const action = actions.updateExplorerFlag('myWindowId', 'explorerFlag', true); // TODO boxmodel remove
      const nextState = reducer({ myWindowId: { title: 'Title', explorerFlag: false } }, action); // TODO boxmodel remove
      nextState.myWindowId.explorerFlag.should.be.true; // TODO boxmodel remove
    }); // TODO boxmodel remove
    it('displayExplorer', () => { // TODO boxmodel remove
      const action = actions.displayExplorer('myWindowId', true); // TODO boxmodel remove
      const nextState = reducer({ myWindowId: { title: 'Title', displayExplorer: false } }, action); // TODO boxmodel remove
      nextState.myWindowId.displayExplorer.should.be.true; // TODO boxmodel remove
    }); // TODO boxmodel remove
  }); // TODO boxmodel remove
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
  it('displayHelp', () => {
    const state = { myId: { title: 'Title', displayHelp: false } };
    const nextState = reducer(state, actions.displayHelp('myId', true));
    nextState.myId.displayHelp.should.equal(true);
    reducer(nextState, actions.displayHelp('myId', false))
      .myId.displayHelp.should.equal(false);
  });
});
