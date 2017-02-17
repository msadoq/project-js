import _get from 'lodash/get';
import _find from 'lodash/find';
import 'reselect';

export const getSessions = state => state.sessions;

export const getSession = (state, sessionId) =>
  _find(_get(state, ['sessions'], []), s => s.id === sessionId);
