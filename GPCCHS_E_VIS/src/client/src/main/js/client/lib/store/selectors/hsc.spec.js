import { should } from '../../common/test';
import {
  getWindowsOpened,
  getWorkspaceOpened,
  getLastCacheInvalidation,
  getPlayingTimebarId,
  getFocusedWindowId,
  getIsWorkspaceOpening,
} from './hsc';

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
  describe('getWorkspaceOpened', () => {
    it('should return status', () => {
      const state = { hsc: { workspaceOpened: false } };
      getWorkspaceOpened(state).should.eql(false);
    });
    it('should support empty state', () => {
      should.not.exist(getWorkspaceOpened(emptyState));
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
