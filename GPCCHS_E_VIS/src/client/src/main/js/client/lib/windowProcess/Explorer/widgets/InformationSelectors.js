import { createSelector } from 'reselect';
import _find from 'lodash/find';
import { getMasterSessionId } from 'store/reducers/masterSession';
import { getSessions } from 'store/reducers/sessions';

export default {
  getMasterSession: createSelector(
    [getMasterSessionId, getSessions],
    (masterSessionId, sessions) => _find(sessions, ({ id }) => id === masterSessionId)),
};
