import { should, getStore } from '../../common/test';
import {
  getStatus,
  getWindowsOpened,
  getWorkspaceOpened,
  getLastTick,
  getLastCacheInvalidation,
  getPlayingTimebarId,
} from './hsc';

describe('store:hsc:selectors', () => {
  describe('getStatus', () => {
    it('should return status', () => {
      const { getState } = getStore({ hsc: { status: 'myStatus' } });
      getStatus(getState()).should.eql('myStatus');
    });
    it('should support empty state', () => {
      const { getState } = getStore({ hsc: {} });
      should.not.exist(getStatus(getState()));
    });
  });
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
  describe('getLastTick', () => {
    it('should return status', () => {
      const { getState } = getStore({ hsc: { lastTick: 10 } });
      getLastTick(getState()).should.eql(10);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ hsc: {} });
      should.not.exist(getLastTick(getState()));
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
