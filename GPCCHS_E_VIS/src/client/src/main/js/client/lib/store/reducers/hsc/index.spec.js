import { freezeArgs } from '../../../common/jest';
import * as actions from '../../actions/hsc';
import { HSC_PAUSE } from '../../types';

import hscReducer, {
  getWindowsOpened,
  getLastCacheInvalidation,
  getPlayingTimebarId,
  getFocusedWindowId,
  getIsWorkspaceOpening,
  getDomainName,
  getSessionName,
} from '.';

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
  });
  test('should update filepath', () => {
    const state = reducer(undefined, actions.updatePath('myFolder', 'myFile'));
    expect(state).toHaveProperty('folder', 'myFolder');
    expect(state).toHaveProperty('file', 'myFile');
  });
  test('should update isWorkspaceOpening', () => {
    expect(reducer({ isWorkspaceOpening: false }, actions.isWorkspaceOpening(true))).toHaveProperty('isWorkspaceOpening', true);
    expect(reducer({ isWorkspaceOpening: true }, actions.isWorkspaceOpening(false))).toHaveProperty('isWorkspaceOpening', false);
  });
  test('should closeWorkspace', () => {
    expect(reducer({ isWorkspaceOpening: false, folder: 'myFolder', file: 'myFile' },
      actions.closeWorkspace())).toEqual({ isWorkspaceOpening: false });
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
  test('should update forecast', () => {
    expect(
      reducer({ }, actions.updateForecast(20, 30))
    ).toEqual({ forecast: { lower: 20, upper: 30 } });
    expect(
      reducer({ forecast: { lower: 20, upper: 30 } }, actions.updateForecast(25, 35))
    ).toEqual({ forecast: { lower: 25, upper: 35 } });
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
