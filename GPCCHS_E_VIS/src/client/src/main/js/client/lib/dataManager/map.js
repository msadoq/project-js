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
