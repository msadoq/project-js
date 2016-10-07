import _ from 'lodash';

export function getLocalIdData(state, remoteId, localId) {
  return _.get(state, ['dataCache', remoteId, localId], undefined);
}
