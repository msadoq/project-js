/* eslint no-unused-expressions: 0 */
import { freezeMe } from '../../common/test';
import * as actions from '../actions/hsc';
import reducer from './hsc';

describe('store:hsc:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.be.an('object').with.property('status', 'LIFECYCLE_NOT_STARTED');
    r.should.has.property('lastCacheInvalidation');
    r.lastCacheInvalidation.should.be.a('number');
    r.should.have.property('windowsOpened', false);
    r.should.have.property('workspaceOpened', false);
    r.should.have.property('playingTimebarId', null);
    r.should.have.property('folder', null);
    r.should.have.property('file', null);
  });
  it('should ignore unknown action', () => {
    const state = freezeMe({
      status: 'LIFECYCLE_NOT_STARTED',
      lastCacheInvalidation: 10,
      playingTimebarId: 10,
    });
    reducer(state, {}).should.equal(state);
  });
  it('should update status', () => {
    reducer(undefined, actions.updateStatus('myStatus'))
      .should.have.property('status', 'myStatus');
  });
  it('should update windows state', () => {
    reducer(undefined, actions.setWindowsAsOpened())
      .should.have.property('windowsOpened', true);
  });
  it('should update workspace state', () => {
    reducer(undefined, actions.setWorkspaceAsOpened())
      .should.have.property('workspaceOpened', true);
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
    it('should set timebarId as playing', () => {
      reducer(freezeMe({}), actions.play(10)).should.have.property('playingTimebarId', 10);
    });
    it('should replace playing timebarId', () => {
      reducer(freezeMe({
        playingTimebarId: 10,
      }), actions.play(20)).should.have.property('playingTimebarId', 20);
    });
    it('should set all timebar as paused', () => {
      reducer(freezeMe({
        playingTimebarId: 10,
      }), actions.pause()).should.have.property('playingTimebarId', null);
    });
  });
  it('should update lastCacheInvalidation', () => {
    reducer(undefined, actions.updateCacheInvalidation(10))
      .should.have.property('lastCacheInvalidation', 10);
  });
});
