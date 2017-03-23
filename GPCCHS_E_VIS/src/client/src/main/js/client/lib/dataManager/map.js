import _ from 'lodash/fp';
import _reduce from 'lodash/reduce';
import _set from 'lodash/set';
import _get from 'lodash/get';
import { createSelector } from 'reselect';
// import getLogger from 'common/log';

import { getTimebars } from '../store/reducers/timebars';
import { createDeepEqualSelector } from '../store/selectors/windows';
import { createDeepEqualSelectorPerViewData } from '../store/selectors/views';
import makeGetPerViewData from './perViewData';
import perRemoteIdMap from './perRemoteIdData';
import { expectedIntervalMap } from './expectedIntervalMap';

import { getViews } from '../store/reducers/views';
import { getPages } from '../store/reducers/pages';
import { getWindowsArray } from '../store/reducers/windows';

// const logger = getLogger('data:map');

/* -------------------------------------------------------------------------- */
const getWindowsFocusedPageIds = createSelector(
  getWindowsArray,
  windows =>
    windows
      .filter(w => w.isLoaded === true && w.focusedPage)
      .map(w => w.focusedPage)
);

const getWindowsFocusedPage = createSelector(
  createDeepEqualSelector(getWindowsFocusedPageIds, _.identity),
  getPages,
  (pageIds, pages) =>
    pageIds
      .filter(id => id in pages)
      .map(id => pages[id])
);

const getWindowsVisibleViewIds = createSelector(
  getWindowsFocusedPage,
  pages =>
    pages
      .filter(p => p.views && p.views.length && p.timebarUuid)
      .map(p => ({
        timebarUuid: p.timebarUuid,
        viewIds: p.views,
      }))
);

export const getWindowsVisibleViews = createSelector(
  getWindowsVisibleViewIds,
  getViews,
  (viewIds, views) =>
    viewIds
      .map(p => p.viewIds.map(vId => ({
        timebarUuid: p.timebarUuid,
        viewId: vId,
      })))
      .reduce((acc, ids) => acc.concat(ids), [])
      .filter(v => !!views[v.viewId])
      .map(v => ({
        ...v,
        viewData: views[v.viewId],
      }))
);
/* -------------------------------------------------------------------------- */

const perViewDataSelectors = {};
export const getPerViewMap = createDeepEqualSelectorPerViewData(
  state => state,
  getWindowsVisibleViews,
  (state, views) =>
    // Per view
    _reduce(views, (map, { viewId, timebarUuid, viewData: view }) => {
      const ep = _get(view, ['configuration', 'entryPoints']);
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
 *       structureType: 'last',
 *       entryPoints: {
 *         'name': {
 *           remoteId: string,
 *           dataId: { ... },
 *           localId: string,
 *           field: string,
 *           offset: number,
 *           filter: [],
 *           timebarUuid: string,
 *           structureType: last,
 *           id: string,
 ----        error: string, // if exists => no other parameter
 *         },
 *       },
 *     },
 *     'viewId': {
 *       type: 'PlotView',
 *       masterSessionId: number,
 *       structureType: 'range',
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
 *           structureType: range,
 *           id: string,
 ----        error: string, // if exists => no other parameter
 *         },
 *        },
 *     },
 *     'viewId': {
 *       type: 'DynamicView',
 *       structureType: 'last',
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
