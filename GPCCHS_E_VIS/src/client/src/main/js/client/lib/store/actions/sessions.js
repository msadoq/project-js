// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Remove all eslint-disable import/prefer-default-export .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// END-HISTORY
// ====================================================================

import * as types from '../types';
import simple from '../helpers/simpleActionCreator';

export default {
  updateSessions: simple(types.HSS_UPDATE_SESSIONS, 'sessions'),
};
