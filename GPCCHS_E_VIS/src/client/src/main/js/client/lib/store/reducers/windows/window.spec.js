/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/windows';
import windowsReducer from '.././windows';
import * as types from '../../types';

const reducer = freezeArgs(windowsReducer);

describe('store:windows:reducer:window', () => {
  describe('update title', () => {
    it('updates title', () => {
      const state = reducer(
        { myWindowId: { title: 'window 1' } },
        actions.updateTitle('myWindowId', 'window 2')
      );
      state.myWindowId.title.should.eql('window 2');
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
  describe('setIsLoaded', () => {
    it('should set is loaded', () => {
      reducer({ myWindowId: { title: 'Title', isLoaded: false } },
        actions.setIsLoaded('myWindowId'))
        .should.eql({ myWindowId: { title: 'Title', isLoaded: true } });
    });
  });
  it('displayHelp', () => {
    const state = { myId: { title: 'Title', displayHelp: false } };
    const nextState = reducer(state, actions.displayHelp('myId', true));
    nextState.myId.displayHelp.should.equal(true);
    reducer(nextState, actions.displayHelp('myId', false))
      .myId.displayHelp.should.equal(false);
  });
  it('should update sessionName', () => {
    const newState = reducer({ w1: {} }, actions.updateSessionName('w1', 'mySession'));
    newState.w1.sessionName.should.eql('mySession');
    reducer(newState, actions.updateSessionName('w1', null)).should.eql({ w1: {} });
  });
  it('should update domainName', () => {
    const newState = reducer({ w1: {} }, actions.updateDomainName('w1', 'myDomain'));
    newState.w1.domainName.should.eql('myDomain');
    reducer(newState, actions.updateDomainName('w1', null)).should.eql({ w1: {} });
  });
});
