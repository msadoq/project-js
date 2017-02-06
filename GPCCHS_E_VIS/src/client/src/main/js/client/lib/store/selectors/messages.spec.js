/* eslint no-unused-expressions: 0 */
import { getStore } from '../../common/test';
import { getGlobalMessages, getMessages } from './messages';

describe('store:messages:selectors', () => {
  const state = {
    messages: {
      global: [
        { type: 'danger', message: 'my message' },
        { type: 'danger', message: 'my other message' },
        { type: 'danger', message: 'another message' },
      ],
      myOtherId: [{ type: 'danger', message: 'my message' }],
    },
  };
  describe('getGlobalMessages', () => {
    it('should returns global messages', () => {
      const { getState } = getStore(state);
      getGlobalMessages(getState()).should.equal(state.messages.global);
    });
  });
  describe('getMessages', () => {
    it('should returns corresponding messages', () => {
      const { getState } = getStore(state);
      getMessages(getState(), 'myOtherId').should.equal(state.messages.myOtherId);
    });
  });
});
