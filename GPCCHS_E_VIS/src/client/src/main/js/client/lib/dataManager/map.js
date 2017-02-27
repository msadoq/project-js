import _reduce from 'lodash/reduce';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _isEqual from 'lodash/isEqual';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
// import getLogger from 'common/log';

import { getTimebars } from '../store/selectors/timebars';
import { getWindowsVisibleViews } from '../store/selectors/windows';
import { getPageIdByViewId, getPage } from '../store/selectors/pages';
import makeGetPerViewData from './perViewData';
import perRemoteIdMap from './perRemoteIdData';
import { expectedIntervalMap } from './expectedIntervalMap';

// const logger = getLogger('data:map');

/* ********************************************************
* Comparison function to omit timebars in comparison
* Useful to compute perView and perRemoteId which are independent of visuWinow
// ********************************************************/
function withoutTimebarsEqualityCheck(current, previous) {
  return _isEqual(_omit(current, 'timebars'), _omit(previous, 'timebars'));
}
const createDeepEqualSelectorWithoutTimebars = createSelectorCreator(
  defaultMemoize,
  withoutTimebarsEqualityCheck
);
// ********************************************************

const perViewDataSelectors = {};
export const getPerViewMap = createDeepEqualSelectorWithoutTimebars(
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

export const getPerViewData = createDeepEqualSelectorWithoutTimebars(
  state => state,
  (state, { viewId }) => viewId,
  (state, viewId) => {
    if (!perViewDataSelectors[viewId]) {
      perViewDataSelectors[viewId] = makeGetPerViewData();
    }
    const pageId = getPageIdByViewId(state, { viewId });
    const page = getPage(state, { pageId });
    const { timebarUuid } = page;
    return perViewDataSelectors[viewId](state, { viewId, timebarUuid });
  });

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
