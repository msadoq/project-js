import _get from 'lodash/get';
import _find from 'lodash/find';
import { createSelector } from 'reselect';
import { getSessions } from './sessions';

// simple
export const getMasterSessionId = state => _get(state, ['masterSession', 'sessionId']);

// composed specific to MasterSessionContainer
export const getMasterSession = createSelector(
  getMasterSessionId,
  getSessions,
  (masterSessionId, sessions) =>
  _find(sessions, s => s.id === masterSessionId)
);
