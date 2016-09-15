/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './hssActions';
import reducer, { getStatus } from './hssReducer';

describe('store:hss', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.eql({});
    });
    it('unknown action', () => {
      reducer({ status: 'connected', err: null }, {})
        .should.eql({ status: 'connected', err: null });
    });

    it('add a state', () => {
      reducer(undefined, actions.updateStatus('main', 'connected')).should.eql({
        main: {
          status: 'connected',
          error: null,
        },
      });
    });
    it('add another state', () => {
      reducer({
        main: {
          status: 'connected',
          error: null,
        },
      }, actions.updateStatus('myWindowId', 'connected')).should.eql({
        main: { status: 'connected', error: null },
        myWindowId: { status: 'connected', error: null },
      });
    });
    it('add another state', () => {
      reducer({
        main: { status: 'connected', error: null },
        myWindowId: { status: 'connected', error: null },
      }, actions.updateStatus('myWindowId', 'disconnected')).should.eql({
        main: { status: 'connected', error: null },
        myWindowId: { status: 'disconnected', error: null },
      });
    });
    it('support error', () => {
      reducer(undefined, actions.updateStatus('main', 'error', 'My reason')).should.eql({
        main: {
          status: 'error',
          error: 'My reason',
        },
      });
    });
  });
  describe('selectors', () => {
    describe('getStatus', () => {
      it('getStatus', () => {
        const { getState } = getStore({
          hss: {
            main: {
              status: 'error',
              error: 'My error',
            },
            myWindowId: {
              status: 'connected',
              error: null,
            }
          },
        });
        getStatus(getState(), 'main').should.eql({ status: 'error', error: 'My error' });
        getStatus(getState(), 'myWindowId').should.eql({ status: 'connected', error: null });
        should.not.exist(getStatus(getState(), 'otherId'));
        should.not.exist(getStatus(getState()));
      });
    });
  });
});
