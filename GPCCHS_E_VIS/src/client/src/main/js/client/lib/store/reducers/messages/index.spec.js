import { freezeArgs } from '../../../common/jest';
import * as actions from '../../actions/messages';
import messagesReducer, { getGlobalMessages, getMessages, getTimeSetterMessages } from '.';

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
      expect(reducer(undefined, actions.add('myId', 'danger', 'my message'))).toMatchObject(
        { myId: [{ type: 'danger', message: 'my message', removing: false }] }
      );
    });
    test('should support empty args', () => {
      expect(reducer(undefined, actions.add('myId'))).toMatchObject(
        { myId: [{ type: 'danger', message: undefined, removing: false }] }
      );
    });
    test('should preserve existing message', () => {
      const state = {
        myId: [{ type: 'danger', message: 'my message', removing: false }],
      };
      const newState = reducer(state, actions.add('myOtherId', 'info', 'other message'));
      expect(newState).toMatchObject({
        myId: [{ type: 'danger', message: 'my message', removing: false }],
        myOtherId: [{ type: 'info', message: 'other message', removing: false }],
      });
      expect(reducer(newState, actions.add('myOtherId', 'success', 'another message'))).toMatchObject({
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
        { uuid: 'uuid1', type: 'danger', message: 'my other message' },
        { type: 'danger', message: 'another message' },
      ],
      myOtherId: [{ uuid: 'uuid2', type: 'danger', message: 'my message' }],
    };
    test('should remove key and preserve others', () => {
      const remove = (containerId, uuid) => ({
        type: 'WS_MESSAGE_REMOVE',
        payload: { containerId, uuid },
      });
      expect(reducer(state, remove('myId', 'uuid1'))).toEqual({
        myId: [
          { type: 'danger', message: 'my message' },
          { type: 'danger', message: 'another message' },
        ],
        myOtherId: [{ uuid: 'uuid2', type: 'danger', message: 'my message' }],
      });
      expect(reducer(state, remove('myOtherId', 'uuid2')).myOtherId).toEqual([]);
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
  describe('getTimeSetterMessages', () => {
    const state = {
      messages: {
        'timeSetter-tbuuid': true,
      },
    };
    test('should returns timeSetter messages', () => {
      expect(getTimeSetterMessages(state, { timebarUuid: 'tbuuid' })).toBe(true);
    });
    test('should returns null', () => {
      expect(getTimeSetterMessages(state, { timebarUuid: 'unknown' })).toBeFalsy();
    });
  });
});
