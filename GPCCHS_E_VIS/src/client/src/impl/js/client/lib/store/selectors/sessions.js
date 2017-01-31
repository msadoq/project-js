import _get from 'lodash/get';
import _find from 'lodash/find';

export const getSessions = state => state.sessions;

// eslint-disable-next-line import/prefer-default-export
export const getSession = (state, sessionId) =>
  _find(_get(state, ['sessions'], []), s => s.id === sessionId);
