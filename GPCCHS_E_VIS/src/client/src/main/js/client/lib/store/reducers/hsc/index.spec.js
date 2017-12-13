// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : request modification to add forecast
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Fix forecast when focused page changes and visuWindow goes backwards
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Move windows observer from main orchestration in a pure store observer
// VERSION : 1.1.2 : DM : #6700 : 22/06/2017 : Remove forcast info from Redux store
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Remove forcast info from Redux store
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : Add isWorkspaceOpened boolean in hsc state
// END-HISTORY
// ====================================================================

import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/hsc';
import { HSC_PAUSE } from 'store/types';
import { setIsLoaded } from 'store/actions/windows';

import hscReducer, {
  getWindowsOpened,
  getLastCacheInvalidation,
  getPlayingTimebarId,
  getIsPlaying,
  getFocusedWindowId,
  getIsWorkspaceOpening,
  getIsWorkspaceOpened,
  getDomainName,
  getSessionName,
} from './index';

const reducer = freezeArgs(hscReducer);

describe('store:hsc:reducer', () => {
  test('should returns initial state', () => {
    const r = reducer(undefined, {});
    expect(r).toHaveProperty('lastCacheInvalidation');
    expect(typeof r.lastCacheInvalidation).toBe('number');
    expect(r).toHaveProperty('windowsOpened', false);
    expect(r).toHaveProperty('playingTimebarId', null);
    expect(r).toHaveProperty('folder', null);
    expect(r).toHaveProperty('file', null);
    expect(r).toHaveProperty('sessionName', null);
    expect(r).toHaveProperty('domainName', null);
  });
  test('should ignore unknown action', () => {
    const state = {
      lastCacheInvalidation: 10,
      playingTimebarId: 10,
    };
    expect(reducer(state, {})).toBe(state);
  });
  test('should update windows state', () => {
    expect(reducer(undefined, actions.setWindowsAsOpened())).toHaveProperty('windowsOpened', true);
    expect(reducer(undefined, setIsLoaded('myId'))).toHaveProperty('windowsOpened', true);
  });
  test('should update filepath', () => {
    const state = reducer(undefined, actions.updatePath('myFolder', 'myFile'));
    expect(state).toHaveProperty('folder', 'myFolder');
    expect(state).toHaveProperty('file', 'myFile');
  });
  test('should update isWorkspaceOpening', () => {
    expect(reducer({ isWorkspaceOpening: false }, actions.isWorkspaceOpening(true)))
      .toHaveProperty('isWorkspaceOpening', true);
    expect(reducer({ isWorkspaceOpening: true }, actions.isWorkspaceOpening(false)))
      .toHaveProperty('isWorkspaceOpening', false);
  });
  test('should closeWorkspace', () => {
    expect(reducer({ isWorkspaceOpening: false, folder: 'myFolder', file: 'myFile' },
      actions.closeWorkspace())).toEqual({ isWorkspaceOpening: false, isWorkspaceOpened: false });
  });
  describe('play/pause', () => {
    test('should set timebarUuid as playing', () => {
      expect(reducer({}, actions.play(10))).toHaveProperty('playingTimebarId', 10);
    });
    test('should replace playing timebarUuid', () => {
      expect(reducer({
        playingTimebarId: 10,
      }, actions.play(20))).toHaveProperty('playingTimebarId', 20);
    });
    test('should set all timebar as paused', () => {
      expect(reducer({
        playingTimebarId: 10,
      }, { type: HSC_PAUSE })).toHaveProperty('playingTimebarId', null);
    });
  });
  test('should update lastCacheInvalidation', () => {
    expect(reducer(undefined, actions.updateCacheInvalidation(10))).toHaveProperty('lastCacheInvalidation', 10);
  });
  test('should save current focused window', () => {
    expect(reducer(undefined, actions.focusWindow('some window id'))).toMatchObject({
      focusWindow: 'some window id',
    });
  });
  test('should blur current focused window', () => {
    expect(reducer({
      focusWindow: 'some window id',
    }, actions.blurWindow('some window id'))).toEqual({
      focusWindow: null,
    });
  });
  test('should not blur current focused window', () => {
    expect(reducer({
      focusWindow: 'some window id',
    }, actions.blurWindow('some window id 2'))).toEqual({
      focusWindow: 'some window id',
    });
  });
  test('should update sessionName', () => {
    expect(reducer({}, actions.updateSessionName('mySession'))).toEqual({ sessionName: 'mySession', isModified: true });
    expect(reducer({ sessionName: 'mySession' }, actions.updateSessionName(null))).toEqual({ isModified: true });
  });
  test('should update domainName', () => {
    expect(reducer({}, actions.updateDomainName('myDomain'))).toEqual({ domainName: 'myDomain', isModified: true });
    expect(reducer({ domainName: 'myDomain' }, actions.updateDomainName(null))).toEqual({ isModified: true });
  });
});


describe('store:hsc:selectors', () => {
  const emptyState = {};

  describe('getWindowsOpened', () => {
    test('should return status', () => {
      const state = { hsc: { windowsOpened: false } };
      expect(getWindowsOpened(state)).toEqual(false);
    });
    test('should support empty state', () => {
      expect(getWindowsOpened(emptyState)).toBeFalsy();
    });
  });
  describe('getPlayingTimebarId', () => {
    test('should return playingTimebarId', () => {
      const state = { hsc: { playingTimebarId: 10 } };
      expect(getPlayingTimebarId(state)).toEqual(10);
    });
    test('should support empty state', () => {
      expect(getPlayingTimebarId(emptyState)).toBeFalsy();
    });
  });
  describe('getIsPlaying', () => {
    test('return true', () => {
      const state = { hsc: { playingTimebarId: 10 } };
      expect(getIsPlaying(state)).toBe(true);
    });
    test('return false', () => {
      expect(getIsPlaying(emptyState)).toBe(false);
    });
  });
  describe('getFocusedWindowId', () => {
    test('should return getFocusedWindowId', () => {
      const state = { hsc: { focusWindow: 'some window id' } };
      expect(getFocusedWindowId(state)).toEqual('some window id');
    });
    test('should support empty state', () => {
      expect(getFocusedWindowId(emptyState)).toBeFalsy();
    });
  });
  describe('getLastCacheInvalidation', () => {
    test('should return lastCacheInvalidation', () => {
      const state = { hsc: { lastCacheInvalidation: 10 } };
      expect(getLastCacheInvalidation(state)).toEqual(10);
    });
    test('should support empty state', () => {
      expect(getLastCacheInvalidation(emptyState)).toBeFalsy();
    });
  });
  describe('getIsWorkspaceOpening', () => {
    test('should return getIsWorkspaceOpening', () => {
      const state = { hsc: { isWorkspaceOpening: true } };
      expect(getIsWorkspaceOpening(state)).toEqual(true);
    });
    test('should support empty state', () => {
      expect(getIsWorkspaceOpening(emptyState)).toBeFalsy();
    });
  });
  describe('getIsWorkspaceOpened', () => {
    test('should return getIsWorkspaceOpened', () => {
      const state = { hsc: { isWorkspaceOpened: true } };
      expect(getIsWorkspaceOpened(state)).toEqual(true);
    });
    test('should support empty state', () => {
      expect(getIsWorkspaceOpened(emptyState)).toBeFalsy();
    });
  });
  describe('getDomainName', () => {
    test('should return domainName', () => {
      const state = { hsc: { domainName: 'myDomain' } };
      expect(getDomainName(state)).toEqual('myDomain');
    });
    test('should support empty state', () => {
      expect(getDomainName(emptyState)).toBeFalsy();
    });
  });
  describe('getSessionName', () => {
    test('should return sessionName', () => {
      const state = { hsc: { sessionName: 'mySession' } };
      expect(getSessionName(state)).toEqual('mySession');
    });
    test('should support empty state', () => {
      expect(getSessionName(emptyState)).toBeFalsy();
    });
  });
});
