// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/messages . . .
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Automatically remove messages after a while
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Add animation to messages removing
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Remove Timebar/Controls/ControlsSelectors + tests .
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// END-HISTORY
// ====================================================================

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
    const state2 = {
      messages: {
        'timeSetter-tbuuid': true,
      },
    };
    test('should returns timeSetter messages', () => {
      expect(getTimeSetterMessages(state2, { timebarUuid: 'tbuuid' })).toBe(true);
    });
    test('should returns null', () => {
      expect(getTimeSetterMessages(state2, { timebarUuid: 'unknown' })).toBeFalsy();
    });
  });
});
