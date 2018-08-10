import _ from 'lodash/fp';
import { pus } from 'serverProcess/ipc';
import { getIsWorkspaceOpening, getWindowsOpened } from '../../reducers/hsc';
import { getPerPusIdMap } from '../../../dataManager/map';

const { subscribe, unsubscribe } = pus;

/**
 * Prevents argument capping in iteratee function
 * @see https://github.com/lodash/lodash/issues/1781
 */
const __ = _.convert({
  cap: false,
});

export default function makePusSubscriptionStoreObserver(store) {
  let savedSubscriptions = {};

  const subscriptionActions = {
    add: (flatId, dataId) => {
      const { apids } = dataId;
      const apidRawValues = apids.map(apid => ({ value: apid.apidRawValue }));
      const header = {
        sessionId: dataId.sessionId,
        domainId: dataId.domainId,
        pusService: dataId.pusService,
        pusServiceApid: apidRawValues,
      };
      subscribe(header, () => {});
      savedSubscriptions[flatId] = dataId;
    },
    delete: (flatId) => {
      const dataId = savedSubscriptions[flatId];
      const { apids } = dataId;
      const apidRawValues = apids.map(apid => ({ value: apid.apidRawValue }));
      const header = {
        sessionId: dataId.sessionId,
        domainId: dataId.domainId,
        pusService: dataId.pusService,
        pusServiceApid: apidRawValues,
      };
      unsubscribe(header, () => {});
      savedSubscriptions = _.omit(flatId, savedSubscriptions);
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
   * Sends subscription requests and update `savedSubscriptions` according to displayed flatId,
   * _i.e_ the flatId that are present in the DataMap
   *
   * @param displayedFlatId
   */
  function updateSubscriptions(displayedFlatId) {
    const subscriptionDiffs = {
      add: objDiff(displayedFlatId, savedSubscriptions),
      delete: objDiff(savedSubscriptions, displayedFlatId),
    };

    __.each((diff, actionKey) => {
      __.each((flatIdObj, flatId) => {
        subscriptionActions[actionKey](flatId, flatIdObj.dataId);
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
      ...getPerPusIdMap(state),
    });
  };
}
