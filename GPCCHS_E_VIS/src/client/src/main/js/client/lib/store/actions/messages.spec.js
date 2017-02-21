/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './messages';
import { freezeMe } from '../../common/test';

describe('store:actions:messages', () => {
  const state = freezeMe({
    messages: {
      global: [{ type: 'info', message: 'yolo' }],
    },
  });

  let dispatch;
  const getState = () => state;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('add', () => {
    it('adds message', () => {
      const action = actions.add('global', 'success', 'hello world');
      action.should.have.properties({
        type: types.WS_MESSAGE_ADD,
        payload: {
          containerId: 'global',
          type: 'success',
          message: 'hello world',
        },
      });
    });
    it('adds error message', () => {
      const action = actions.add('global', 'danger', new Error('error message'));
      action.should.have.properties({
        type: types.WS_MESSAGE_ADD,
        payload: {
          containerId: 'global',
          type: 'danger',
          message: 'error message',
        },
      });
    });
  });

  describe('addOnce', () => {
    it('adds message', () => {
      actions.addOnce('unknownContainerId', 'info', 'yolo')(dispatch, getState);

      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_MESSAGE_ADD,
        payload: {
          containerId: 'unknownContainerId',
          type: 'info',
          message: 'yolo',
        },
      });
    });
    it('does not add duplicate message', () => {
      actions.addOnce('global', 'info', 'yolo')(dispatch, getState);
      dispatch.should.not.have.been.called;
    });
  });
});
