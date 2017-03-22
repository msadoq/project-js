import _find from 'lodash/find';
import { createSelector } from 'reselect';

import { getSessions } from '../../store/reducers/sessions';
import { getMasterSessionId } from '../../store/reducers/masterSession';

// specific to MasterSessionContainer
export const getMasterSession = createSelector(
  getMasterSessionId,
  getSessions,
  (masterSessionId, sessions) =>
  _find(sessions, s => s.id === masterSessionId)
);

export default (state, ownProps) => ({
  masterSession: getMasterSession(state, ownProps),
});
