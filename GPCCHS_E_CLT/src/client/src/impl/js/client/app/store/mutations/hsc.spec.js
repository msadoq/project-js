/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './hscActions';
import reducer, { getStatus } from './hscReducer';

describe.only('store:hss', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.eql({ status: 'not-started' });
    });
    it('unknown action', () => {
      reducer({ status: 'started' }, {})
        .should.eql({ status: 'started' });
    });
    it('set state', () => {
      reducer(undefined, actions.updateStatus('started')).should.eql({ status: 'started' });
    });
  });
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
