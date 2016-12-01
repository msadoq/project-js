/* eslint no-unused-vars: 0 */
import { should } from '../../common/test';
import * as actions from '../actions/messages';
import reducer from './messages';

describe('store:message:reducer', () => {
  describe('add', () => {
    it('add view message', () => {
      const state = reducer(
        undefined,
        actions.add('views', 'error', 'gros bug', '123123-azeaze')
      );
      state.should.deep.eql({
        views: {
          '123123-azeaze': [
            {
              type: 'danger',
              message: 'gros bug',
            }
          ]
        }
      });
    });
    it('add global message', () => {
      const state = reducer(
        undefined,
        actions.add('global', 'success', 'gros bug')
      );
      state.should.deep.eql({
        global: [
          {
            type: 'success',
            message: 'gros bug',
          }
        ]
      });
    });
  });
});
