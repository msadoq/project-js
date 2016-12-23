import _get from 'lodash/get';

// eslint-disable-next-line import/prefer-default-export
export const getSession = (state, sessionId) =>
  _get(state, ['sessions', sessionId]);
