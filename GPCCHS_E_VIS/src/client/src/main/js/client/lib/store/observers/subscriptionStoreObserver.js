// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Clean console log . . .
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Update subscription store observer . .
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Rollback on subscription store observer
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update server process and data injection for alarms
// VERSION : 2.0.0 : DM : #5806 : 10/10/2017 : Fix issue with comObject naming for GroundAlarms
// VERSION : 2.0.0 : DM : #5806 : 10/10/2017 : Fix in GroundAlarmView reducers .
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : UPDATE PUBSUB alarm controler to read properly
//  payload + bug fixes
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 17/10/2017 : Fix subscription store observer .
// VERSION : 2.0.0 : DM : #5806 : 18/10/2017 : Merge branch jmaupeti_alarmstub into dev
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// VERSION : 2.0.0 : FA : ISIS-FT-2448 : 15/11/2017 : Minor fix on decomPacket unsubscription
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #9497 : 13/12/2017 : Merge branch 'dev' of
//  isis.cnes-isis.toulouse.atos.net:gpcc/LPISIS/GPCCHS into dev
// VERSION : 2.0.0 : FA : #9497 : 13/12/2017 : Add method in subscription store observer
// VERSION : 2.0.0 : FA : ISIS-FT-2800 : 27/02/2018 : Remove all delete subscription requests
// VERSION : 2.0.0 : FA : ISIS-FT-2800 : 27/02/2018 : Rewrite component subscriptionStoreObserver
//  that sends data subscription requests
// END-HISTORY
// ====================================================================


import _ from 'lodash/fp';

import { getWindowsOpened, getIsWorkspaceOpening } from 'store/reducers/hsc';
import { dc } from 'serverProcess/ipc';
import { getPerLastTbdIdMap, getPerRangeTbdIdMap } from 'dataManager/map';

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
      requestSubscriptionAdd(tbdId, dataId);
      savedSubscriptions[tbdId] = dataId;
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
