/* eslint-disable no-unused-expressions */
import { UNKNOWN_SESSION_ID } from 'common/constants';
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './masterSession';

describe('store:actions:masterSession', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('updateMasterSessionIfNeeded', () => {
    it('does nothing with unknown session id', () => {
      actions.updateMasterSessionIfNeeded(UNKNOWN_SESSION_ID)(dispatch);
      expect(dispatch).not.have.been.called;
    });
    it('updates master session', () => {
      actions.updateMasterSessionIfNeeded('masterSessionOid')(dispatch);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.HSS_UPDATE_MASTER_SESSION,
        payload: {
          masterSessionOid: 'masterSessionOid',
        },
      });
    });
  });
});
