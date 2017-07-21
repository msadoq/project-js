import _reduce from 'lodash/reduce';
import _set from 'lodash/set';
import { createSelector } from 'reselect';

import { getTimebars } from '../store/reducers/timebars';
import { createDeepEqualSelectorPerViewData } from '../store/selectors/views';
import forecastIntervalMap from './forecastIntervalMap';
import makeGetPerViewData from './perViewData';
import perRemoteIdMap from './perRemoteIdData';
import perRangeTbdIdMap from './perRangeTbdIdData';
import perLastTbdIdMap from './perLastTbdIdData';
import perLastFrom0TbdIdMap from './perLastFrom0TbdIdData';
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
export const getPerRangeTbdIdMap = createSelector(
  getPerViewMap,
  perRangeTbdIdMap
); // TODO should be done (createSelector around perRemoteIdMap) in perRemoteIdData.js
export const getPerLastTbdIdMap = createSelector(
  getPerViewMap,
  perLastTbdIdMap
); // TODO should be done (createSelector around perRemoteIdMap) in perRemoteIdData.js
export const getPerLastFrom0TbdIdMap = createSelector(
  getPerViewMap,
  perLastFrom0TbdIdMap
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
  getPerRangeTbdIdMap,
  getPerLastTbdIdMap,
  getPerLastFrom0TbdIdMap,
  getTimebars,
  (viewMap, remoteIdMap, rangeTbdIdMap, lastTbdIdMap, lastFrom0TbdIdMap, timebars) => {
    // compute expected intervals
    const expectedIntervals = expectedIntervalMap(timebars, remoteIdMap);

    // add forecast intervals
    const forecastTime = get('FORECAST'); // TODO dbrugne remove parameters.get() call
    const forecastIntervals = forecastIntervalMap(expectedIntervals, forecastTime);

    return {
      perView: viewMap,
      perRemoteId: remoteIdMap,
      perRangeTbdId: rangeTbdIdMap,
      perLastTbdId: lastTbdIdMap,
      perLastFrom0TbdId: lastFrom0TbdIdMap,
      expectedIntervals,
      forecastIntervals,
    };
  }
);
