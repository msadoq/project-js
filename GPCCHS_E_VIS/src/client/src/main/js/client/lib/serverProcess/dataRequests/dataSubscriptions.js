import _ from 'lodash/fp';
import { dc } from '../ipc';

const { requestSubscriptionAdd, requestSubscriptionDelete } = dc;

/**
 * Returns a sorted list of flatDataId for a given dataMap
 */
const getDataMapSubscriptions = _.flow([
  _.getOr({}, 'perRemoteId'),
  _.keys,
  _.sortBy(_.identity),
]);

export default function makeDataSubscriptions() {
  return function dataSubscriptions(dataMap, previous) {
    const needed = getDataMapSubscriptions(dataMap);
    const existing = getDataMapSubscriptions(previous);
    const toAdd = _.difference(needed, existing);
    const toDelete = _.difference(existing, needed);

    // send subscription messages to DC
    toAdd.forEach(
      flatDataId => requestSubscriptionAdd(flatDataId, _.get(['perRemoteId', flatDataId, 'dataId'], dataMap))
    );
    toDelete.forEach(
      flatDataId => requestSubscriptionDelete(flatDataId, _.get(['perRemoteId', flatDataId, 'dataId'], previous))
    );
  };
}
