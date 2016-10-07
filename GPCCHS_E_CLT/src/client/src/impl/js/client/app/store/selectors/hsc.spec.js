/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import { getStatus } from './hsc';

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
  });
});
