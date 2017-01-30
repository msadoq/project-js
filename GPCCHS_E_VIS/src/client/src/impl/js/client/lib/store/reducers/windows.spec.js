/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import * as actions from '../actions/windows';
import reducer from './windows';
import * as types from '../types';

describe('store:windows:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myWindowId: { title: 'Title' } }, {})
      .should.eql({ myWindowId: { title: 'Title' } });
  });
  describe('add', () => {
    it('add', () => {
      const { dispatch, getState } = getStore({});
      // const state = reducer(
      //   undefined,
      dispatch(actions.add('myWindowId', 'Title', { x: 110 }, ['myPageId'], null, true));
      getState().windows.myWindowId.should.deep.eql({
        title: 'Title',
        focusedPage: null,
        pages: ['myPageId'],
        geometry: { w: 800, h: 600, x: 110, y: 10 },
        debug: { whyDidYouUpdate: false, timebarVisibility: true },
        minimized: false,
        isModified: true,
      });
    });
    it('add empty', () => {
      const { dispatch, getState } = getStore({});
      dispatch(actions.add('myWindowId'));
      const win = getState().windows.myWindowId;
      win.title.should.eql('Unknown');
      win.isModified.should.eql(true);
      win.pages.should.have.length(1);
      win.focusedPage.should.eql(win.pages[0]);
      win.minimized.should.eql(false);
      win.geometry.should.deep.eql({ x: 10, y: 10, w: 800, h: 600 });
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
  describe('focus page', () => {
    it('should focus page corresponding to arg', () => {
      const { dispatch, getState } = getStore({
        windows: {
          myWindowId: { focusedPage: null },
        },
      });
      dispatch(actions.focusPage('myWindowId', 'myPageId'));
      getState().windows.myWindowId.focusedPage.should.equal('myPageId');
      dispatch(actions.focusPage('myWindowId'));
      should.not.exist(getState().windows.myWindowId.focusedPage);
    });
    it('should switch to pause if new focused page timebarUuid is different', () => {
      const { dispatch, getState } = getStore({
        windows: {
          myWindowId: { focusedPage: 'myPage' },
        },
        pages: {
          myPage: { timebarUuid: 10 },
          myOtherPage: { timebarUuid: 10 },
          anotherPage: { timebarUuid: 20 },
        },
        hsc: {
          playingTimebarId: 10,
        },
      });
      // same timebarUuid
      dispatch(actions.focusPage('myWindowId', 'myOtherPage'));
      getState().hsc.playingTimebarId.should.equal(10);
      getState().windows.myWindowId.focusedPage.should.equal('myOtherPage');
      // different timebarUuid
      dispatch(actions.focusPage('myWindowId', 'anotherPage'));
      should.not.exist(getState().hsc.playingTimebarId);
      getState().windows.myWindowId.focusedPage.should.equal('anotherPage');
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
  describe('minimize/restore window', () => {
    it('should minimize window', () => {
      const { dispatch, getState } = getStore({
        windows: {
          myWindowId: { minimized: false },
        },
      });
      dispatch(actions.minimize('myWindowId'));
      getState().windows.myWindowId.minimized.should.be.true;
    });
    it('should restore window', () => {
      const { dispatch, getState } = getStore({
        windows: {
          myWindowId: { minimized: true },
        },
      });
      dispatch(actions.restore('myWindowId'));
      getState().windows.myWindowId.minimized.should.not.be.true;
    });
  });
  describe('close_workspace', () => {
    const newState = reducer({ myTimelineId: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
    newState.should.be.an('object').that.is.empty;
  });
  describe('setModified', () => {
    reducer({ myWindowId: { title: 'Title', isModified: false } },
    actions.setModified('myWindowId', true))
      .should.eql({ myWindowId: { title: 'Title', isModified: true } });
  });
});
