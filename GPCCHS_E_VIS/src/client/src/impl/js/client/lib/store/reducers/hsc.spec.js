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
  });
  it('should ignore unknown action', () => {
    const state = freezeMe({ status: 'myStatus' });
    reducer(state, {}).should.equal(state);
  });
  it('should update status', () => {
    reducer(undefined, actions.updateStatus('myStatus'))
      .should.be.an('object')
      .with.property('status', 'myStatus');
  });
  it('should update lastCacheInvalidation', () => {
    reducer(undefined, actions.updateCacheInvalidation(123)).should.eql({
      status: 'LIFECYCLE_NOT_STARTED',
      lastCacheInvalidation: 123,
    });
  });
});
