import '../../common/test';
import * as actions from '../actions/hss';
import reducer from './hss';

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
});
