/* eslint no-unused-expressions: 0 */
import { freezeMe } from '../../common/test';
import * as actions from '../actions/hsc';
import reducer from './hsc';

describe('store:hss', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.be.an('object').with.property('status', 'LIFECYCLE_NOT_STARTED');
    r.should.has.property('lastCacheInvalidation');
    r.lastCacheInvalidation.should.be.a('number');
    r.should.have.property('playingTimebarId', null);
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
