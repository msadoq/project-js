import { should, getStore } from '../../common/test';
import {
  getWindowsOpened,
  getWorkspaceOpened,
  getLastCacheInvalidation,
  getPlayingTimebarId,
  getSlowRenderers,
  getFocusedWindowId,
} from './hsc';

describe('store:hsc:selectors', () => {
  describe('getWindowsOpened', () => {
    it('should return status', () => {
      const { getState } = getStore({ hsc: { windowsOpened: false } });
      getWindowsOpened(getState()).should.eql(false);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ hsc: {} });
      should.not.exist(getWindowsOpened(getState()));
    });
  });
  describe('getWorkspaceOpened', () => {
    it('should return status', () => {
      const { getState } = getStore({ hsc: { workspaceOpened: false } });
      getWorkspaceOpened(getState()).should.eql(false);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ hsc: {} });
      should.not.exist(getWorkspaceOpened(getState()));
    });
  });
  describe('getPlayingTimebarId', () => {
    it('should return playingTimebarId', () => {
      const { getState } = getStore({ hsc: { playingTimebarId: 10 } });
      getPlayingTimebarId(getState()).should.eql(10);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ hsc: {} });
      should.not.exist(getPlayingTimebarId(getState()));
    });
  });
  describe('getSlowRenderers', () => {
    it('should return getSlowRenderers', () => {
      const { getState } = getStore({ hsc: { slowRenderers: [{ 'some window id': 100 }] } });
      getSlowRenderers(getState()).should.eql([{ 'some window id': 100 }]);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ hsc: {} });
      should.not.exist(getSlowRenderers(getState()));
    });
  });
  describe('getFocusedWindowId', () => {
    it('should return getFocusedWindowId', () => {
      const { getState } = getStore({ hsc: { focusWindow: 'some window id' } });
      getFocusedWindowId(getState()).should.eql('some window id');
    });
    it('should support empty state', () => {
      const { getState } = getStore({ hsc: {} });
      should.not.exist(getFocusedWindowId(getState()));
    });
  });
  describe('getLastCacheInvalidation', () => {
    it('should return lastCacheInvalidation', () => {
      const { getState } = getStore({ hsc: { lastCacheInvalidation: 10 } });
      getLastCacheInvalidation(getState()).should.eql(10);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ hsc: {} });
      should.not.exist(getLastCacheInvalidation(getState()));
    });
  });
});
