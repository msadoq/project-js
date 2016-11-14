import { should, getStore } from '../../common/test';
import { getStatus, getLastCacheInvalidation } from './hsc';

describe('store:hss', () => {
  describe('selectors', () => {
    describe('getStatus', () => {
      it('works', () => {
        const { getState } = getStore({ hsc: { status: 'myStatus' } });
        getStatus(getState()).should.eql('myStatus');
      });
      it('empty', () => {
        const { getState } = getStore({ hsc: {} });
        should.not.exist(getStatus(getState()));
      });
    });
    describe('getLastCacheInvalidation', () => {
      it('works', () => {
        const { getState } = getStore({ hsc: { lastCacheInvalidation: 123 } });
        getLastCacheInvalidation(getState()).should.eql(123);
      });
      it('empty', () => {
        const { getState } = getStore({ hsc: {} });
        should.not.exist(getLastCacheInvalidation(getState()));
      });
    });
  });
});
