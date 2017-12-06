import _differenceWith from 'lodash/differenceWith';
import _difference from 'lodash/difference';
import _differenceBy from 'lodash/differenceBy';
import _intersection from 'lodash/intersection';
import _findIndex from 'lodash/findIndex';
import { getWindowsOpened, getIsWorkspaceOpening } from 'store/reducers/hsc';
import { dc } from 'serverProcess/ipc';
import { getPerLastTbdIdMap } from 'dataManager/map';
import getLogger from 'common/logManager';
import { getTbdIdsAndDataIdList } from '../reducers/knownRanges';

const log = getLogger('server:storeObserver:subscription');
const { requestSubscriptionAdd, requestSubscriptionDelete } = dc;

/**
 * Store observer that reacts on store updates to dispatch needed data.
 * @param {object} store - The current store.
 * @return {function} The new state.
 */
export default function makeSubscriptionStoreObserver(store) {
  let previousKnownRanges;
  let previousLastTbdId = {};
  const subscriptionRange = [];
  const subscriptionLast = [];
  const compareRangeWithLast = (range, last) => range.tbdId === last;
  const compareLastWithRange = (last, range) => last === range.tbdId;

  return function subscriptionStoreObserver() {
    const state = store.getState();
    // skip is workspace is loading or no windows was already loaded
    if (getIsWorkspaceOpening(state) === true && getWindowsOpened(state) === false) {
      return;
    }
    // List of knowns ranges
    const allKnownRanges = getTbdIdsAndDataIdList(state);
    // List of last in views ( extract from dataMap )
    const lastTbdId = getPerLastTbdIdMap(state);

    // Get list of tbdIds in last data in views
    const lastTbdIdKeys = Object.keys(lastTbdId);
    const previousLastTbdIdKeys = Object.keys(previousLastTbdId);

    // Find new tbdId in known ranges
    const newRanges = _differenceBy(allKnownRanges, previousKnownRanges, 'tbdId');
    // Find tbdId to remove in known Ranges
    const removedRanges = _differenceBy(previousKnownRanges, allKnownRanges, 'tbdId');
    // Find new last in dataMap
    const newLast = _difference(lastTbdIdKeys, previousLastTbdIdKeys);
    // Find last to remove in dataMap
    const removedLast = _difference(previousLastTbdIdKeys, lastTbdIdKeys);

    // Find the new data in knownRanges/last to subscribe :
    // - (sub) if is in new Ranges and is not present in subscription last ( not registered twice )
    // - (unsub) if is in new last and is not present in subscription range ( not registered twice )
    const toSubscribeRange = _differenceWith(newRanges, subscriptionLast, compareRangeWithLast);
    const toSubscribeLast = _differenceWith(newLast, subscriptionRange, compareLastWithRange);

    // - (sub) If tbdId is in new range and is present in sub last => move subscription from last to range
    const moveSubFromLastToRange = _intersection(newRanges, subscriptionLast);

    // Find the data to removes in knownRanges/last :
    // - (sub) If is in removedRange and is not present in sub last
    // - (unsub) If is in removesLast and is not present in sub range
    const toUnsubscribeRange = _differenceWith(
      removedRanges,
      subscriptionLast,
      compareRangeWithLast
    );
    const toUnsubscribeLast = _differenceWith(removedLast, subscriptionRange, compareLastWithRange);

    const moveSubFromRangeToLast = _intersection(removedRanges, subscriptionLast);

    // DO the subscription/ unsubscprition
    for (let i = 0; i < toSubscribeRange.length; i += 1) {
      const { tbdId, dataId } = toSubscribeRange[i];
      requestSubscriptionAdd(tbdId, dataId);
      log.info(`Subscribe range ${tbdId}`);
      subscriptionRange.push(tbdId);
    }

    for (let j = 0; j < toUnsubscribeRange.length; j += 1) {
      const { tbdId, dataId } = toUnsubscribeRange[j];
      requestSubscriptionDelete(tbdId, dataId);
      log.info(`Unsubscribe range ${tbdId}`);
      const index = _findIndex(subscriptionRange, tbdId);
      subscriptionRange.splice(index, 1);
    }

    for (let k = 0; k < toSubscribeLast.length; k += 1) {
      const tbdId = toSubscribeLast[k];
      const { dataId } = lastTbdId[tbdId];
      requestSubscriptionAdd(tbdId, dataId);
      log.info(`Subscribe last ${tbdId}`);
      subscriptionLast.push(tbdId);
    }

    for (let l = 0; l < toUnsubscribeLast.length; l += 1) {
      const tbdId = toUnsubscribeLast[l];
      const tbdIdObject = previousLastTbdId[tbdId];
      const { dataId } = tbdIdObject;
      requestSubscriptionDelete(tbdId, dataId);
      log.info(`Unsubscribe last ${tbdId}`);
      const index = _findIndex(subscriptionLast, tbdId);
      subscriptionLast.splice(index, 1);
    }

    // Update previousMap
    previousKnownRanges = allKnownRanges;
    previousLastTbdId = lastTbdId;

    // Move subscription from last to range
    for (let i = 0; i < moveSubFromLastToRange.length; i += 1) {
      const index = _findIndex(subscriptionLast, moveSubFromLastToRange[i]);
      const toBeMoved = subscriptionLast[index];
      subscriptionRange.push(toBeMoved);
      subscriptionLast.splice(index, 1);
    }

    // Move subscription from range to last
    for (let j = 0; j < moveSubFromRangeToLast.length; j += 1) {
      const index = _findIndex(subscriptionRange, moveSubFromRangeToLast[j]);
      const toBeMoved = subscriptionRange[index];
      subscriptionLast.push(toBeMoved);
      subscriptionRange.splice(index, 1);
    }
  };
}

