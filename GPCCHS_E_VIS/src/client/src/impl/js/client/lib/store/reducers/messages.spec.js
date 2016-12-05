/* eslint no-unused-vars: 0 */
import { should } from '../../common/test';
import * as actions from '../actions/messages';
import reducer from './messages';

describe('store:message:reducer', () => {
  describe('add', () => {
    it('add view message', () => {
      const state = reducer(
        undefined,
        actions.add('views', 'error', 'my message', 'myId')
      );
      state.should.deep.eql({
        views: {
          myId: [
            {
              type: 'danger',
              message: 'my message',
            }
          ]
        }
      });
    });
    it('add global message', () => {
      const state = reducer(undefined, actions.add('global', 'success', 'my message'));
      state.should.deep.eql({
        global: [{ type: 'success', message: 'my message' }]
      });
    });
  });
});
