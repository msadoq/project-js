import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/messages';
import messagesReducer, { getGlobalMessages, getMessages } from '.';

const reducer = freezeArgs(messagesReducer);

describe('store:message:reducer', () => {
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('unknown action', () => {
    const state = { myId: [{ message: 'my message' }] };
    expect(reducer(state, {})).toEqual(state);
  });
  describe('add', () => {
    it('should add message', () => {
      expect(reducer(undefined, actions.add('myId', 'danger', 'my message'))).toEqual({ myId: [{ type: 'danger', message: 'my message' }] });
    });
    it('should support empty args', () => {
      expect(reducer(undefined, actions.add('myId'))).toEqual({ myId: [{ type: 'danger', message: null }] });
    });
    it('should preserve existing message', () => {
      const state = {
        myId: [{ type: 'danger', message: 'my message' }],
      };
      const newState = reducer(state, actions.add('myOtherId', 'info', 'other message'));
      expect(newState).toEqual({
        myId: [{ type: 'danger', message: 'my message' }],
        myOtherId: [{ type: 'info', message: 'other message' }],
      });
      expect(reducer(newState, actions.add('myOtherId', 'success', 'another message'))).toEqual({
        myId: [{ type: 'danger', message: 'my message' }],
        myOtherId: [
          { type: 'info', message: 'other message' },
          { type: 'success', message: 'another message' },
        ],
      });
    });
  });
  describe('remove', () => {
    const state = {
      myId: [
        { type: 'danger', message: 'my message' },
        { type: 'danger', message: 'my other message' },
        { type: 'danger', message: 'another message' },
      ],
      myOtherId: [{ type: 'danger', message: 'my message' }],
    };
    it('should remove key and preserve others', () => {
      expect(reducer(state, actions.remove('myId', 1))).toEqual({
        myId: [
          { type: 'danger', message: 'my message' },
          { type: 'danger', message: 'another message' },
        ],
        myOtherId: [{ type: 'danger', message: 'my message' }],
      });
      expect(reducer(state, actions.remove('myOtherId', 0)).myOtherId).toEqual([]);
    });
  });
  describe('reset', () => {
    const state = {
      myId: [
        { type: 'danger', message: 'my message' },
        { type: 'danger', message: 'my other message' },
      ],
    };
    it('should support reset key', () => {
      expect(reducer(state, actions.reset('myId')).myId).toEqual([]);
    });
  });
});

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
      expect(getGlobalMessages(state)).toBe(state.messages.global);
    });
  });
  describe('getMessages', () => {
    it('should returns corresponding messages', () => {
      expect(getMessages(state, { containerId: 'myOtherId' })).toBe(state.messages.myOtherId);
    });
  });
});
