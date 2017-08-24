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

// TODO FIX THIS pgaucher

// import _differenceWith from 'lodash/differenceWith';
// import { getWindowsOpened, getIsWorkspaceOpening } from '../../store/reducers/hsc';
// import { getTbdIdsAndDataIdList } from '../reducers/knownRanges';
// import { dc } from '../../serverProcess/ipc';
// import { getCurrentDisplayedLastTbdId } from '../../dataManager/mapSelector';

// const { requestSubscriptionAdd, requestSubscriptionDelete } = dc;

// /**
//  * Store observer that reacts on store updates to dispatch needed data.
//  * @param {object} store - The current store.
//  * @return {function} The new state.
//  */
// export default function makeSubscriptionStoreObserver(store) {
//   let previousDisplayedTbdId;
//   let previousKnownRanges;
//   const compareTbdId = (obj1, obj2) => obj1.tbdId === obj2.tbdId;

//   return function subscriptionStoreObserver() {
//     const state = store.getState();

//     // skip is workspace is loading or no windows was already loaded
//     if (getIsWorkspaceOpening(state) === true && getWindowsOpened(state) === false) {
//       return;
//     }
//     const displayedLastTbdId = getCurrentDisplayedLastTbdId(state);
//     const allKnownRanges = getTbdIdsAndDataIdList(state);

//     const toSubscribeLast = _differenceWith(displayedLastTbdId, previousDisplayedTbdId, compareTbdId);
//     const toUnsubscribeLast = _differenceWith(previousDisplayedTbdId, displayedLastTbdId, compareTbdId);

//     const toSubscribeRange = _differenceWith(allKnownRanges, previousKnownRanges, compareTbdId);
//     const toUnsubscribeRange = _differenceWith(previousKnownRanges, allKnownRanges, compareTbdId);

//     previousDisplayedTbdId = displayedLastTbdId;

//     for (let i = 0; i < toSubscribeLast.length; i += 1){
//       const { tbdId, dataId } = toSubscribeLast[i];
//       requestSubscriptionAdd(tbdId, dataId);
//     }

//     for (let j = 0; j < toUnsubscribeLast.length; j += 1) {
//       const { tbdId, dataId } = toUnsubscribeLast[j];
//       requestSubscriptionDelete(tbdId, dataId);
//     }

//     for (let i = 0; i < toSubscribeRange.length; i += 1){
//       const { tbdId, dataId } = toSubscribeRange[i];
//       requestSubscriptionAdd(tbdId, dataId);
//     }

//     for (let j = 0; j < toUnsubscribeRange.length; j += 1) {
//       const { tbdId, dataId } = toUnsubscribeRange[j];
//       requestSubscriptionDelete(tbdId, dataId);
//     }
//   };
// }
