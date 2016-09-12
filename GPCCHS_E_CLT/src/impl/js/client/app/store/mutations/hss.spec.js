/* eslint no-unused-expressions: 0 */
import { getStore } from '../../utils/test';
import * as actions from './hssActions';
import reducer, { getStatus } from './hssReducer';

describe('store:hss', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.eql({
        status: 'disconnected',
        error: null,
      });
    });
    it('unknown action', () => {
      reducer({ status: 'connected', err: null }, {})
        .should.eql({ status: 'connected', err: null });
    });
    it('update status', () => {
      const state = reducer(
        { status: 'connected', error: null },
        actions.updateStatus('error', 'My error')
      );
      state.should.eql({ status: 'error', error: 'My error' });
      reducer(state, actions.updateStatus('connected')).should.eql({
        status: 'connected',
        error: undefined,
      });
    });
  });
  describe('selectors', () => {
    it('getStatus', () => {
      const { getState } = getStore({
        hss: {
          status: 'error',
          error: 'My error',
        },
      });
      getStatus(getState()).should.eql({
        status: 'error',
        error: 'My error',
      });
    });
  });
});
