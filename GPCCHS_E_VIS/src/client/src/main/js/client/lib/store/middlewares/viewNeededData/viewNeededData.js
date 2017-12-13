import _cloneDeep from 'lodash/cloneDeep';
import dataMapGenerator from 'dataManager/map';
import { getWindowsOpened, getIsWorkspaceOpening } from 'store/reducers/hsc';
import execution from 'common/logManager/execution';
import computeMissingRangeIntervals from 'store/observers/computeMissingRangeIntervals';
import computeMissingLastIntervals from 'store/observers/computeMissingLastIntervals';

import { viewsNeedRange, viewsNeedLast } from 'store/actions/retrieveData';
import { cleanViewData } from 'store/actions/viewData';


const makeViewNeededData = () => {
  let previousDataMap;

  return ({ dispatch, getState }) => next => (action) => {
      // previous dataMap
    const nextAction = next(action);

    const state = getState();

    // skip is workspace is loading or no windows was already loaded
    if (getIsWorkspaceOpening(state) === true && getWindowsOpened(state) === false) {
      return nextAction;
    }

    const profile = execution('middleware:viewNeededData');

    // dataMap generation
    // Note: could change on many windows, pages or views update like layouts or panels, but since
    //       dataMap is very fast and this update occurs only on user manual actions the additionnal
    //       cost of this observer is far from null
    profile.start('dataMap generation');
    const dataMap = dataMapGenerator(getState());
    profile.stop('dataMap generation');

    if (dataMap === previousDataMap) {
      profile.print();
      return nextAction;
    }
    // get needed range intervals
    profile.start('missingRangeIntervals');
    const neededRangeData = computeMissingRangeIntervals(dataMap, previousDataMap);
    profile.stop('missingRangeIntervals');

    // get needed last intervals
    profile.start('missingLastIntervals');
    const neededLastData = computeMissingLastIntervals(dataMap, previousDataMap);
    profile.stop('missingLastIntervals');

    const previous = _cloneDeep(previousDataMap);
    // store dataMap for next observer execution
    previousDataMap = dataMap;
    // Clean viewData
    if (previous) {
      dispatch(cleanViewData(dataMap, previous, state.HistoryViewConfiguration));
    }

    // Dispatch neededData
    if (Object.keys(neededRangeData).length) {
      dispatch(viewsNeedRange(neededRangeData));
    }
    if (Object.keys(neededLastData).length) {
      dispatch(viewsNeedLast(neededLastData));
    }

    profile.print();

    return nextAction;
  };
};

export default makeViewNeededData;
