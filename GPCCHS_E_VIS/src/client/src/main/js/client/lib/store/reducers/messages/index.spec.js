import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/messages';
import messagesReducer, { getGlobalMessages, getMessages } from '.';

const reducer = freezeArgs(messagesReducer);

describe('store:message:reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('unknown action', () => {
    const state = { myId: [{ message: 'my message' }] };
    expect(reducer(state, {})).toEqual(state);
  });
  describe('add', () => {
    test('should add message', () => {
      expect(reducer(undefined, actions.add('myId', 'danger', 'my message'))).toEqual(
        { myId: [{ type: 'danger', message: 'my message', removing: false }] }
      );
    });
    test('should support empty args', () => {
      expect(reducer(undefined, actions.add('myId'))).toEqual(
        { myId: [{ type: 'danger', message: null, removing: false }] }
      );
    });
    test('should preserve existing message', () => {
      const state = {
        myId: [{ type: 'danger', message: 'my message', removing: false }],
      };
      const newState = reducer(state, actions.add('myOtherId', 'info', 'other message'));
      expect(newState).toEqual({
        myId: [{ type: 'danger', message: 'my message', removing: false }],
        myOtherId: [{ type: 'info', message: 'other message', removing: false }],
      });
      expect(reducer(newState, actions.add('myOtherId', 'success', 'another message'))).toEqual({
        myId: [{ type: 'danger', message: 'my message', removing: false }],
        myOtherId: [
          { type: 'info', message: 'other message', removing: false },
          { type: 'success', message: 'another message', removing: false },
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
    test('should remove key and preserve others', () => {
      const remove = (containerId, index) => ({
        type: 'WS_MESSAGE_REMOVE',
        payload: { containerId, index },
      });
      expect(reducer(state, remove('myId', 1))).toEqual({
        myId: [
          { type: 'danger', message: 'my message' },
          { type: 'danger', message: 'another message' },
        ],
        myOtherId: [{ type: 'danger', message: 'my message' }],
      });
      expect(reducer(state, remove('myOtherId', 0)).myOtherId).toEqual([]);
    });
  });
  describe('reset', () => {
    const state = {
      myId: [
        { type: 'danger', message: 'my message' },
        { type: 'danger', message: 'my other message' },
      ],
    };
    test('should support reset key', () => {
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
    test('should returns global messages', () => {
      expect(getGlobalMessages(state)).toBe(state.messages.global);
    });
  });
  describe('getMessages', () => {
    test('should returns corresponding messages', () => {
      expect(getMessages(state, { containerId: 'myOtherId' })).toBe(state.messages.myOtherId);
    });
  });
});
