// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Clean console log . . .
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Update subscription store observer . .
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Rollback on subscription store observer
// END-HISTORY
// ====================================================================


import _ from 'lodash/fp';

import { getWindowsOpened, getIsWorkspaceOpening } from 'store/reducers/hsc';
import { dc } from 'serverProcess/ipc';
import { getPerLastTbdIdMap, getPerRangeTbdIdMap } from 'dataManager/map';
import flattenDataId from 'common/flattenDataId';

const { requestSubscriptionAdd } = dc;

/**
 * Prevents argument capping in iteratee function
 * @see https://github.com/lodash/lodash/issues/1781
 */
const __ = _.convert({
  cap: false,
});

/**
 * Store observer that reacts on store updates to dispatch needed data.
 * @param {object} store - The current store.
 * @return {function} The new state.
 */
export default function makeSubscriptionStoreObserver(store) {
  const savedSubscriptions = {};

  const subscriptionActions = {
    add: (tbdId, dataId) => {
      // adding subscription to entrypoint
      requestSubscriptionAdd(tbdId, dataId);
      savedSubscriptions[tbdId] = dataId;
      const dataIdLogBookEvent = {
        catalog: 'LogbookEventDefinition',
        parameterName: 'OBSOLETE_PARAMETER',
        comObject: 'LogbookEvent',
        domainId: dataId.domainId,
        domain: dataId.domain,
        sessionName: dataId.sessionName,
        sessionId: dataId.sessionId,
        provider: '',
      };
      const flatIdLogBookEvent = flattenDataId(dataIdLogBookEvent);
      if (!savedSubscriptions[flatIdLogBookEvent]) {
        // adding subscription to entrypoint logbook events
        requestSubscriptionAdd(flatIdLogBookEvent, dataIdLogBookEvent);
        savedSubscriptions[flatIdLogBookEvent] = dataIdLogBookEvent;
      }
    },
  };

  /**
   * Returns a difference between a `source` object and an `exclude` object according to their keys
   *
   * @param {object} source
   * @param {object} exclude
   * @return {object} a copy of `source` without the keys of `exclude`
   */
  function objDiff(source, exclude) {
    return __.reduce(
      (acc, key) => ({
        ...acc,
        [key]: source[key],
      }), {}, __.difference(__.keys(source), __.keys(exclude)));
  }

  /**
   * Sends subscription requests and update `savedSubscriptions` according to displayed tbdIds,
   * _i.e_ the tbdIds that are present in the DataMap
   *
   * @param displayedTbdIds
   */
  function updateSubscriptions(displayedTbdIds) {
    const subscriptionDiffs = {
      add: objDiff(displayedTbdIds, savedSubscriptions),
    };

    __.each((diff, actionKey) => {
      __.each((tbdIdObj, tbdId) => {
        subscriptionActions[actionKey](tbdId, tbdIdObj.dataId);
      }, diff);
    }, subscriptionDiffs);
  }

  return function subscriptionStoreObserver() {
    const state = store.getState();

    // do nothing if workspace is loading or no windows has already been loaded
    if (getIsWorkspaceOpening(state) === true && getWindowsOpened(state) === false) {
      return;
    }

    updateSubscriptions({
      ...getPerLastTbdIdMap(state),
      ...getPerRangeTbdIdMap(state),
    });
  };
}
