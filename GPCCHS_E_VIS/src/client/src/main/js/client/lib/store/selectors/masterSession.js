import _find from 'lodash/find';
import { createSelector } from 'reselect';

import { getSessions } from '../reducers/sessions';
import { getMasterSessionId } from '../reducers/masterSession';

// composed specific to MasterSessionContainer
const getMasterSession = createSelector(
  getMasterSessionId,
  getSessions,
  (masterSessionId, sessions) =>
  _find(sessions, s => s.id === masterSessionId)
);

export default {
  getMasterSession,
};
