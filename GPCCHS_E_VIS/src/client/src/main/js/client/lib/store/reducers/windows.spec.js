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
  describe('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
    });
  });
});
