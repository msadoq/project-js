import _reduce from 'lodash/reduce';
import _set from 'lodash/set';
import { createSelector } from 'reselect';
// import getLogger from 'common/log';

import { getTimebars } from '../store/reducers/timebars';
import { createDeepEqualSelectorPerViewData } from '../store/selectors/views';
import makeGetPerViewData from './perViewData';
import perRemoteIdMap from './perRemoteIdData';
import { expectedIntervalMap } from './expectedIntervalMap';
import { getWindowsVisibleViews } from '../store/selectors/windows';
import { getEntryPointsByViewId } from '../viewManager';

// const logger = getLogger('data:map');

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
      const props = perViewDataSelectors[viewId](state, { viewId, timebarUuid });

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
  (perViewMap) => {
    const rIdMap = perRemoteIdMap(perViewMap);
    return rIdMap;
  }
);


/**
 * Return dataMap organized per view:
 *
 * {
 *   perRemoteId: {
 *     'remoteId': {
 *       dataId: { ... },
 *       filter: [{field: string, operator: string, operand: string}],
 *       localIds: {
 *         'localId': {
 *           field: string,
 *           timebarUuid: string,
 *           offset: number,
 *         },
 *       },
 *     },
 *   },
 *   perView: {
 *     'viewId': {
 *       type: 'TextView',
 *       masterSessionId: number,
 *       entryPoints: {
 *         'name': {
 *           remoteId: string,
 *           dataId: { ... },
 *           localId: string,
 *           field: string,
 *           offset: number,
 *           filter: [],
 *           timebarUuid: string,
 *           id: string,
 ----        error: string, // if exists => no other parameter
 *         },
 *       },
 *     },
 *     'viewId': {
 *       type: 'PlotView',
 *       masterSessionId: number,
 *       entryPoints: {
 *         'name': {
 *           remoteId: string,
 *           dataId: { ... },
 *           localId: string,
 *           fieldX: string,
 *           fieldY: string,
 *           offset: number,
 *           filter: [],
 *           timebarUuid: string,
 *           id: string,
 ----        error: string, // if exists => no other parameter
 *         },
 *        },
 *     },
 *     'viewId': {
 *       type: 'DynamicView',
 *       entryPoints: {
 *         dynamicEP: {
 *            remoteId: string,
 *            expectedInterval: [number, number],
 *          },
 *        },
 *     },

 *   },
 * }
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
    const intervalMap = expectedIntervalMap(timebars, remoteIdMap);
    return {
      perView: viewMap,
      perRemoteId: remoteIdMap,
      expectedIntervals: intervalMap,
    };
  }
);
