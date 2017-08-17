import _differenceWith from 'lodash/differenceWith';
import { getWindowsOpened, getIsWorkspaceOpening } from '../../store/reducers/hsc';
import { getTbdIdsAndDataIdList } from '../reducers/knownRanges';
import { dc } from '../../serverProcess/ipc';

const { requestSubscriptionAdd, requestSubscriptionDelete } = dc;

/**
 * Store observer that reacts on store updates to dispatch needed data.
 * @param {object} store - The current store.
 * @return {function} The new state.
 */
export default function makeSubscriptionStoreObserver(store) {
  let previousKnownRanges;

  const compareTbdId = (obj1, obj2) => obj1.tbdId === obj2.tbdId;

  return function subscriptionStoreObserver() {
    const state = store.getState();

    // skip is workspace is loading or no windows was already loaded
    if (getIsWorkspaceOpening(state) === true && getWindowsOpened(state) === false) {
      return;
    }
    const allKnownRanges = getTbdIdsAndDataIdList(state);
    const toSubscribe = _differenceWith(allKnownRanges, previousKnownRanges, compareTbdId);
    const toUnsubscribe = _differenceWith(previousKnownRanges, allKnownRanges, compareTbdId);
    if (toSubscribe.length !== 0) console.log('toSubscribe : ', toSubscribe);
    if (toUnsubscribe.length !== 0) console.log('toUnsub : ', toUnsubscribe);
    previousKnownRanges = allKnownRanges;

    for (let i = 0; i < toSubscribe.length; i += 1){
      const { tbdId, dataId } = toSubscribe[i];
      requestSubscriptionAdd(tbdId, dataId);
    }

    for (let j = 0; j < toUnsubscribe.length; j += 1){
      const { tbdId, dataId } = toUnsubscribe[j];
      requestSubscriptionDelete(tbdId, dataId);
    }
  };
}
