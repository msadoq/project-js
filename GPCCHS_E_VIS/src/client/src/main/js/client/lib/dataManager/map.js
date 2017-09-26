// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 08/02/2017 : Fix viewData reducer to be the same ref when no data has changed
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Remove eslint-disable-line space-in-parens in dataManager/map
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of inline view/structure type specific code
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : State color is now computed in viewMap
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsVisibleViews in dataManager/map.js .
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add number of points per view in explorer panel
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Use new configuration selector in dataManager
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Fix memoization issues with getConfigurationByViewId selector
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #6700 : 12/07/2017 : Some modification on workding and comments
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : remove lastFrom0 from datamap add a test to keep the good interval in datamap
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Separate expectedIntervalsMap by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action viewData_clean
// VERSION : 1.1.2 : DM : #6816 : 06/09/2017 : test perfs on hss process
// VERSION : 1.1.2 : DM : #6816 : 07/09/2017 : add plotviews with differents EP
// VERSION : 1.1.2 : DM : #6835 : 12/09/2017 : PlotView parses entryPoints differently depending on entryPoints being parametric or not.
// END-HISTORY
// ====================================================================

import _reduce from 'lodash/reduce';
import _set from 'lodash/set';
import { createSelector } from 'reselect';

import { getTimebars } from '../store/reducers/timebars';
import { createDeepEqualSelectorPerViewData } from '../store/selectors/views';
import makeGetPerViewData from './perViewData';
import perRangeTbdIdMap from './perRangeTbdIdData';
import perLastTbdIdMap from './perLastTbdIdData';
import expectedRangeIntervalMap from './expectedRangeIntervalMap';
import expectedLastIntervalMap from './expectedLastIntervalMap';
import { getPageIdByViewId } from '../store/reducers/pages';
import { getWindowsVisibleViews } from '../store/selectors/windows';
import { getEntryPointsByViewId } from '../viewManager';
import { get } from '../common/configurationManager';

const perViewDataSelectors = {};
export const getPerViewMap = createDeepEqualSelectorPerViewData(
  state => state,
  getWindowsVisibleViews,
  (state, views) =>
    // Per view
    _reduce(
      views,
      (map, { viewId, timebarUuid }) => {
        const ep = getEntryPointsByViewId(state, { viewId });
        if (!ep || !ep.length) {
          return map;
        }
        if (!perViewDataSelectors[viewId]) {
          perViewDataSelectors[viewId] = makeGetPerViewData();
        }
        const pageId = getPageIdByViewId(state, { viewId });
        const props = perViewDataSelectors[viewId](state, { viewId, timebarUuid, pageId });

        // Case of invalid view or collapsed view
        if (!Object.keys(props).length) {
          return map;
        }

        _set(map, [viewId], props);
        return map;
      },
      {}
    )
);

export const getPerRangeTbdIdMap = createSelector(
  getPerViewMap,
  perRangeTbdIdMap
); // TODO should be done (createSelector around perRemoteIdMap) in perRemoteIdData.js
export const getPerLastTbdIdMap = createSelector(
  getPerViewMap,
  perLastTbdIdMap
); // TODO should be done (createSelector around perRemoteIdMap) in perRemoteIdData.js


/**
 * Return dataMap organized per view:
 *
 * // TODO : update dataMap description structure
 *
 * @param state
 * @return {*}
 */
export default createSelector(
  getPerViewMap,
  getPerRangeTbdIdMap,
  getPerLastTbdIdMap,
  getTimebars,
  (viewMap, rangeTbdIdMap, lastTbdIdMap, timebars) => {
    // console.log('viewMap: ', viewMap);
    // console.log('rangeTbdIdMap: ', rangeTbdIdMap);
    // console.log('lastTbdIdMap: ', lastTbdIdMap);
    // console.log('timebars: ', timebars);
    // compute expected intervals
    let forecastIntervalsMap = {};
    const forecastTime = get('FORECAST'); // TODO dbrugne remove parameters.get() call
    const rangeIntervals = expectedRangeIntervalMap(
        timebars,
        rangeTbdIdMap,
        forecastIntervalsMap,
        forecastTime);
    forecastIntervalsMap = rangeIntervals.forecastIntervals;
    const lastIntervals = expectedLastIntervalMap(
        timebars,
        lastTbdIdMap,
        forecastIntervalsMap,
        forecastTime);
    forecastIntervalsMap = lastIntervals.forecastIntervals;
    return {
      perView: viewMap,
      perRangeTbdId: rangeTbdIdMap,
      perLastTbdId: lastTbdIdMap,
      forecastIntervals: forecastIntervalsMap,
      expectedRangeIntervals: rangeIntervals.expectedRangeIntervals,
      expectedLastIntervals: lastIntervals.expectedLastIntervals,
    };
  }
);
