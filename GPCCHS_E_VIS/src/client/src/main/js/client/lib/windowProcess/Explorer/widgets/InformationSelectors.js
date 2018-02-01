// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';
import _find from 'lodash/find';
import { getMasterSessionId } from 'store/reducers/masterSession';
import { getSessions } from 'store/reducers/sessions';

export default {
  getMasterSession: createSelector(
    [getMasterSessionId, getSessions],
    (masterSessionId, sessions) => _find(sessions, ({ id }) => id === masterSessionId)),
};
