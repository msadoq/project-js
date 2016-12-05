/* eslint no-unused-vars: 0 */
import { should } from '../../common/test';
import * as actions from '../actions/messages';
import reducer from './messages';

describe('store:message:reducer', () => {
  describe('add', () => {
    it('add view message', () => {
      const state = reducer(
        undefined,
<<<<<<< HEAD
        actions.add('views', 'error', 'my message', 'myId')
=======
        actions.add('views', 'error', 'my error message', '123123-azeaze')
>>>>>>> [FT:#4640] No more pseudo-elements arrows, inverted the scale drag direction. Modal moved into windowProcess/common/ .
      );
      state.should.deep.eql({
        views: {
          myId: [
            {
              type: 'danger',
<<<<<<< HEAD
              message: 'my message',
=======
              message: 'my error message',
>>>>>>> [FT:#4640] No more pseudo-elements arrows, inverted the scale drag direction. Modal moved into windowProcess/common/ .
            }
          ]
        }
      });
    });
    it('add global message', () => {
<<<<<<< HEAD
      const state = reducer(undefined, actions.add('global', 'success', 'my message'));
      state.should.deep.eql({
        global: [{ type: 'success', message: 'my message' }]
=======
      const state = reducer(
        undefined,
        actions.add('global', 'success', 'my success message')
      );
      state.should.deep.eql({
        global: [
          {
            type: 'success',
            message: 'my success message',
          }
        ]
>>>>>>> [FT:#4640] No more pseudo-elements arrows, inverted the scale drag direction. Modal moved into windowProcess/common/ .
      });
    });
  });
});
