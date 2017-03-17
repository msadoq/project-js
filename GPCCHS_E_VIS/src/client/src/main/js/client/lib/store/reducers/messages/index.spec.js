import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/messages';
import messagesReducer from '.';

const reducer = freezeArgs(messagesReducer);

describe('store:message:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.eql({});
  });
  it('unknown action', () => {
    const state = { myId: [{ message: 'my message' }] };
    reducer(state, {})
      .should.eql(state);
  });
  describe('add', () => {
    it('should add message', () => {
      reducer(undefined, actions.add('myId', 'danger', 'my message'))
        .should.eql({ myId: [{ type: 'danger', message: 'my message' }] });
    });
    it('should support empty args', () => {
      reducer(undefined, actions.add('myId'))
        .should.eql({ myId: [{ type: 'danger', message: null }] });
    });
    it('should preserve existing message', () => {
      const state = {
        myId: [{ type: 'danger', message: 'my message' }],
      };
      const newState = reducer(state, actions.add('myOtherId', 'info', 'other message'));
      newState.should.eql({
        myId: [{ type: 'danger', message: 'my message' }],
        myOtherId: [{ type: 'info', message: 'other message' }],
      });
      reducer(newState, actions.add('myOtherId', 'success', 'another message'))
        .should.eql({
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
      reducer(state, actions.remove('myId', 1)).should.eql({
        myId: [
          { type: 'danger', message: 'my message' },
          { type: 'danger', message: 'another message' },
        ],
        myOtherId: [{ type: 'danger', message: 'my message' }],
      });
      reducer(state, actions.remove('myOtherId', 0)).myOtherId.should.eql([]);
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
      reducer(state, actions.reset('myId')).myId.should.eql([]);
    });
  });
});
