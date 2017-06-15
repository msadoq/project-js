import { UNKNOWN_SESSION_ID } from '../../constants';
import simple from '../simpleActionCreator';
import * as types from '../types';

export const updateMasterSession = simple(types.HSS_UPDATE_MASTER_SESSION, 'masterSessionOid');

export const updateMasterSessionIfNeeded = masterSessionOid => (dispatch) => {
  if (masterSessionOid === UNKNOWN_SESSION_ID) {
    return;
  }

  // set master session id only if exists
  dispatch(updateMasterSession(masterSessionOid));
};
