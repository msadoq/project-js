/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import { getStatus } from './hss';

describe('store:hss', () => {
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
        getStatus(getState(), 'otherId').should.eql({ status: 'disconnected' });
        getStatus(getState()).should.eql({ status: 'disconnected' });
      });
    });
  });
});
