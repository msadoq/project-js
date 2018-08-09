// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add redux and patch workflow improvment + remove
//  store observer
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Clean code . . .
// VERSION : 1.1.2 : DM : #6700 : 28/08/2017 : Add some exectuion map + minor lint fix
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _cloneDeep from 'lodash/cloneDeep';
import _merge from 'lodash/merge';
import dataMapGenerator from 'dataManager/map';
import { getWindowsOpened, getIsWorkspaceOpening } from 'store/reducers/hsc';
import execution from 'common/logManager/execution';
import computeMissingRangeIntervals from 'store/observers/computeMissingRangeIntervals';
import computeMissingLastIntervals from 'store/observers/computeMissingLastIntervals';
import computeMissingPusIntervals from 'store/observers/computeMissingPusIntervals';
import { viewsNeedRange, viewsNeedLast, viewsNeedObsoleteEvent, viewsNeedPus } from 'store/actions/retrieveData';
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
    const neededRangeData = computeMissingRangeIntervals(dataMap, previousDataMap, state);
    profile.stop('missingRangeIntervals');

    // get needed last intervals
    profile.start('missingLastIntervals');
    const neededLastData = computeMissingLastIntervals(dataMap, previousDataMap);
    profile.stop('missingLastIntervals');

    // get needed last intervals
    profile.start('missingLastIntervals');
    const neededPusData = computeMissingPusIntervals(state, dataMap);
    profile.stop('missingLastIntervals');

    const previous = _cloneDeep(previousDataMap);
    // store dataMap for next observer execution
    previousDataMap = dataMap;
    // Clean viewData
    if (previous) {
      dispatch(cleanViewData(dataMap, previous, {
        HistoryViewConfiguration: state.HistoryViewConfiguration,
        PlotViewConfiguration: state.PlotViewConfiguration,
      }));
    }

    // Dispatch neededData
    if (Object.keys(neededRangeData).length) {
      dispatch(viewsNeedRange(neededRangeData));
    }
    if (Object.keys(neededLastData).length) {
      dispatch(viewsNeedLast(neededLastData));
    }
    if (Object.keys(neededPusData).length) {
      dispatch(viewsNeedPus(neededPusData));
    }
    const mergeNeededForEvent = _merge(neededRangeData, neededLastData);
    if (Object.keys(mergeNeededForEvent).length) {
      dispatch(viewsNeedObsoleteEvent(mergeNeededForEvent));
    }

    profile.print();

    return nextAction;
  };
};

export default makeViewNeededData;
