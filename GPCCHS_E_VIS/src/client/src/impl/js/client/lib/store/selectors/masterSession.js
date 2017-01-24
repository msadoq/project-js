import _get from 'lodash/get';

// eslint-disable-next-line import/prefer-default-export
export const getMasterSessionId = state => _get(state, ['masterSession', 'sessionId']);
