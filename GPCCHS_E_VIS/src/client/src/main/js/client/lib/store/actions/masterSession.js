// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Lint updateMasterSessionIfNeeded in lib/store/actions/masterSession .
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Refacto masterSession action creators tests
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// END-HISTORY
// ====================================================================

import { UNKNOWN_SESSION_ID } from '../../constants';
import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export const updateMasterSession = simple(types.HSS_UPDATE_MASTER_SESSION, 'masterSessionOid');

export const updateMasterSessionIfNeeded = masterSessionOid => (dispatch) => {
  if (masterSessionOid === UNKNOWN_SESSION_ID) {
    return;
  }

  // set master session id only if exists
  dispatch(updateMasterSession(masterSessionOid));
};
