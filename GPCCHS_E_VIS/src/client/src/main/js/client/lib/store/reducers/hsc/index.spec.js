/* eslint no-unused-expressions: 0 */
import { freezeArgs, should } from '../../../common/test';
import * as actions from '../../actions/hsc';
import { HSC_PAUSE } from '../../types';

import hscReducer, {
  getWindowsOpened,
  getLastCacheInvalidation,
  getPlayingTimebarId,
  getFocusedWindowId,
  getIsWorkspaceOpening,
} from '.';

const reducer = freezeArgs(hscReducer);

describe('store:hsc:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.has.property('lastCacheInvalidation');
    r.lastCacheInvalidation.should.be.a('number');
    r.should.have.property('windowsOpened', false);
    r.should.have.property('playingTimebarId', null);
    r.should.have.property('folder', null);
    r.should.have.property('file', null);
  });
  it('should ignore unknown action', () => {
    const state = {
      lastCacheInvalidation: 10,
      playingTimebarId: 10,
    };
    reducer(state, {}).should.equal(state);
  });
  it('should update windows state', () => {
    reducer(undefined, actions.setWindowsAsOpened())
      .should.have.property('windowsOpened', true);
  });
  it('should update filepath', () => {
    const state = reducer(undefined, actions.updatePath('myFolder', 'myFile'));
    state.should.have.property('folder', 'myFolder');
    state.should.have.property('file', 'myFile');
  });
  it('should update isWorkspaceOpening', () => {
    reducer({ isWorkspaceOpening: false }, actions.isWorkspaceOpening(true))
      .should.have.property('isWorkspaceOpening', true);
    reducer({ isWorkspaceOpening: true }, actions.isWorkspaceOpening(false))
      .should.have.property('isWorkspaceOpening', false);
  });
  it('should closeWorkspace', () => {
    reducer({ isWorkspaceOpening: false, folder: 'myFolder', file: 'myFile' },
      actions.closeWorkspace()).should.deep.equal({ isWorkspaceOpening: false });
  });
  describe('play/pause', () => {
    it('should set timebarUuid as playing', () => {
      reducer({}, actions.play(10)).should.have.property('playingTimebarId', 10);
    });
    it('should replace playing timebarUuid', () => {
      reducer({
        playingTimebarId: 10,
      }, actions.play(20)).should.have.property('playingTimebarId', 20);
    });
    it('should set all timebar as paused', () => {
      reducer({
        playingTimebarId: 10,
      }, { type: HSC_PAUSE }).should.have.property('playingTimebarId', null);
    });
  });
  it('should update lastCacheInvalidation', () => {
    reducer(undefined, actions.updateCacheInvalidation(10))
      .should.have.property('lastCacheInvalidation', 10);
  });
  it('should save current focused window', () => {
    reducer(undefined, actions.focusWindow('some window id'))
    .should.have.properties({
      focusWindow: 'some window id',
    });
  });
  it('should blur current focused window', () => {
    reducer({
      focusWindow: 'some window id',
    }, actions.blurWindow('some window id'))
    .should.eql({
      focusWindow: null,
    });
  });
  it('should not blur current focused window', () => {
    reducer({
      focusWindow: 'some window id',
    }, actions.blurWindow('some window id 2'))
    .should.eql({
      focusWindow: 'some window id',
    });
  });
  it('should update forecast', () => {
    reducer({ }, actions.updateForecast(20))
    .should.eql({ forecast: 20 });
    reducer({ forecast: 20 }, actions.updateForecast(25))
    .should.eql({ forecast: 25 });
  });
});


describe('store:hsc:selectors', () => {
  const emptyState = {};

  describe('getWindowsOpened', () => {
    it('should return status', () => {
      const state = { hsc: { windowsOpened: false } };
      getWindowsOpened(state).should.eql(false);
    });
    it('should support empty state', () => {
      should.not.exist(getWindowsOpened(emptyState));
    });
  });
  describe('getPlayingTimebarId', () => {
    it('should return playingTimebarId', () => {
      const state = { hsc: { playingTimebarId: 10 } };
      getPlayingTimebarId(state).should.eql(10);
    });
    it('should support empty state', () => {
      should.not.exist(getPlayingTimebarId(emptyState));
    });
  });
  describe('getFocusedWindowId', () => {
    it('should return getFocusedWindowId', () => {
      const state = { hsc: { focusWindow: 'some window id' } };
      getFocusedWindowId(state).should.eql('some window id');
    });
    it('should support empty state', () => {
      should.not.exist(getFocusedWindowId(emptyState));
    });
  });
  describe('getLastCacheInvalidation', () => {
    it('should return lastCacheInvalidation', () => {
      const state = { hsc: { lastCacheInvalidation: 10 } };
      getLastCacheInvalidation(state).should.eql(10);
    });
    it('should support empty state', () => {
      should.not.exist(getLastCacheInvalidation(emptyState));
    });
  });
  describe('getIsWorkspaceOpening', () => {
    it('should return getIsWorkspaceOpening', () => {
      const state = { hsc: { isWorkspaceOpening: true } };
      getIsWorkspaceOpening(state).should.eql(true);
    });
    it('should support empty state', () => {
      should.not.exist(getIsWorkspaceOpening(emptyState));
    });
  });
});
