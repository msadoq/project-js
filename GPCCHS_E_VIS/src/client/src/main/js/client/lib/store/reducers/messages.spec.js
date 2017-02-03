/* eslint no-unused-vars: 0 */
import { should, getStore, freezeMe } from '../../common/test';
import * as actions from '../actions/messages';
import reducer from './messages';

describe('store:message:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.eql({});
  });
  it('unknown action', () => {
    const state = { myId: [{ message: 'my message' }] };
    reducer(freezeMe(state), {})
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
      const newState = reducer(freezeMe(state), actions.add('myOtherId', 'info', 'other message'));
      newState.should.eql({
        myId: [{ type: 'danger', message: 'my message' }],
        myOtherId: [{ type: 'info', message: 'other message' }],
      });
      reducer(freezeMe(newState), actions.add('myOtherId', 'success', 'another message'))
        .should.eql({
          myId: [{ type: 'danger', message: 'my message' }],
          myOtherId: [
            { type: 'info', message: 'other message' },
            { type: 'success', message: 'another message' },
          ],
        });
    });
  });
  describe('addOnce', () => {
    it('should add new message', () => {
      const { dispatch, getState } = getStore({
        messages: {
          myId: [
            { type: 'danger', message: 'my message' },
          ],
        },
      });
      dispatch(actions.addOnce('myId', 'danger', 'my new message'));
      dispatch(actions.addOnce('myOtherId', 'danger', 'my new message'));
      getState().messages.should.eql({
        myId: [
          { type: 'danger', message: 'my message' },
          { type: 'danger', message: 'my new message' },
        ],
        myOtherId: [{ type: 'danger', message: 'my new message' }],
      });
    });
    it('should ignore existing message', () => {
      const { dispatch, getState } = getStore({
        messages: {
          myId: [{ type: 'danger', message: 'my message' }],
          myOtherId: [{ type: 'danger', message: 'my message' }],
        },
      });
      dispatch(actions.addOnce('myId', 'danger', 'my message'));
      dispatch(actions.addOnce('myOtherId', 'danger', 'my message'));
      getState().messages.should.eql({
        myId: [
          { type: 'danger', message: 'my message' },
        ],
        myOtherId: [{ type: 'danger', message: 'my message' }],
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
    it('should support not existing keys', () => {
      reducer(freezeMe(state), actions.remove('unknownId', 0)).should.eql(state);
      reducer(freezeMe(state), actions.remove('myId', 10)).should.eql(state);
    });
    it('should remove key and preserve others', () => {
      reducer(freezeMe(state), actions.remove('myId', 1)).should.eql({
        myId: [
          { type: 'danger', message: 'my message' },
          { type: 'danger', message: 'another message' },
        ],
        myOtherId: [{ type: 'danger', message: 'my message' }],
      });
      reducer(freezeMe(state), actions.remove('myOtherId', 0)).myOtherId.should.eql([]);
    });
  });
  describe('reset', () => {
    const state = {
      myId: [
        { type: 'danger', message: 'my message' },
        { type: 'danger', message: 'my other message' },
      ],
    };
    it('should support not existing keys', () => {
      reducer(freezeMe(state), actions.reset('unknownId')).should.eql(state);
    });
    it('should support reset key', () => {
      reducer(freezeMe(state), actions.reset('myId')).myId.should.eql([]);
    });
  });
});
