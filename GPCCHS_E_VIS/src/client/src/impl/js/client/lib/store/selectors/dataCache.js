import _get from 'lodash/get';

export function getLocalIdData(state, remoteId, localId) {
  return _get(state, ['dataCache', remoteId, localId]);
}
