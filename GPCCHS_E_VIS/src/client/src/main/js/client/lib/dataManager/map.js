import _reduce from 'lodash/reduce';
import _set from 'lodash/set';
import { createSelector } from 'reselect';

import { getTimebars } from '../store/reducers/timebars';
import { createDeepEqualSelectorPerViewData } from '../store/selectors/views';
import forecastIntervalMap from './forecastIntervalMap';
import makeGetPerViewData from './perViewData';
import perRemoteIdMap from './perRemoteIdData';
import { expectedIntervalMap } from './expectedIntervalMap';
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
    _reduce(views, (map, { viewId, timebarUuid }) => {
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
    }, {})
  );

export const getPerRemoteIdMap = createSelector(
  getPerViewMap,
  perRemoteIdMap
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
  getPerRemoteIdMap,
  getTimebars,
  (viewMap, remoteIdMap, timebars) => {
    // compute expected intervals
    const expectedIntervals = expectedIntervalMap(timebars, remoteIdMap);

    // add forecast intervals
    const forecastTime = get('FORECAST'); // TODO dbrugne remove parameters.get() call
    const forecastIntervals = forecastIntervalMap(expectedIntervals, forecastTime); // TODO could be done in same loop with expectedIntervalMap

    return {
      perView: viewMap,
      perRemoteId: remoteIdMap,
      expectedIntervals,
      forecastIntervals,
    };
  }
);
