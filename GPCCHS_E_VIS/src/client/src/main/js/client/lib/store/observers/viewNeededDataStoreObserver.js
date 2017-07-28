import dataMapGenerator from '../../dataManager/map';
import { getWindowsOpened, getIsWorkspaceOpening } from '../../store/reducers/hsc';
import execution from '../../common/logManager/execution';
import computeMissingRangeIntervals from './computeMissingRangeIntervals';
import computeMissingLastIntervals from './computeMissingLastIntervals';

import { viewsNeedRange, viewsNeedLast } from '../../store/actions/retrieveData';

/**
 * Store observer that reacts on store updates to dispatch needed data.
 * @param {object} store - The current store.
 * @return {function} The new state.
 */
export default function makeViewNeededDataStoreObserver(store) {
  let previous; // previous dataMap
  return function viewNeededDataStoreObserver() {
    const state = store.getState();

    // skip is workspace is loading or no windows was already loaded
    if (getIsWorkspaceOpening(state) === true && getWindowsOpened(state) === false) {
      return;
    }

    const profile = execution('dataMap:store:observer');

    // dataMap generation
    // Note: could change on many windows, pages or views update like layouts or panels, but since
    //       dataMap is very fast and this update occurs only on user manual actions the additionnal
    //       cost of this observer is far from null
    profile.start('dataMap generation');
    const dataMap = dataMapGenerator(state);
    profile.stop('dataMap generation');

    if (dataMap === previous) {
      profile.print();
      return;
    }
    // get needed range intervals
    profile.start('missingRangeIntervals');
    const neededRangeData = computeMissingRangeIntervals(dataMap, previous);
    profile.stop('missingRangeIntervals');

    // get needed last intervals
    profile.start('missingLastIntervals');
    const neededLastData = computeMissingLastIntervals(dataMap, previous);
    profile.stop('missingLastIntervals');

    // store dataMap for next observer execution
    previous = dataMap;

    // Dispatch neededData
    const { dispatch } = store;
    dispatch(viewsNeedRange(neededRangeData));
    dispatch(viewsNeedLast(neededLastData));

    profile.print();
  };
}
