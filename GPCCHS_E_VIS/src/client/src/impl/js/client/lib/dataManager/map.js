import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import { createSelector } from 'reselect';

import vivl from '../../VIVL/main';
import structures from './structures';
import debug from '../common/debug/mainDebug';
import { getDomains } from '../store/selectors/domains';
import { getTimebars, getTimebarTimelines } from '../store/selectors/timebars';
import { getTimelines } from '../store/selectors/timelines';
import { getWindowsVisibleViews } from '../store/selectors/windows';

const logger = debug('data:map');

/**
 * Return the visible remoteIds data map:
 *
 * Input connectedData:
 * {
   *   {
   *     // view
   *     type: string,
   *     timebarId: string,
   *     connectedData: [
   *       {
   *          formula: string,
   *          timeline: string,
   *          domain: string,
   *          filter: [{field: string, operator: string, operand: string}],
   *       },
   *     ],
   *   },
   * }
 *
 * Output:
 * {
   *   'remoteId': {
   *     dataId: {...},
   *     filter: [{field: string, operator: string, operand: string}],
   *     localIds: {
   *       'localId': {
   *         viewId: string,
   *         field: string,
   *         timebarId: string,
   *         offset: number,
   *         expectedInterval: [number, number],
   *       },
   *     },
   *   },
   * }
 *
 * @param domains
 * @param timebars
 * @param timelines
 * @param views
 * @return {*}
 */
export function visibleRemoteIds(domains, timebars, timelines, views) {
  return _reduce(views, (list, { viewId, timebarId, viewData: view }) => {
    const { type, configuration } = view;
    const { entryPoints } = configuration;
    if (!entryPoints || !entryPoints.length) {
      return list;
    }

    // current visuWindow
    const visuWindow = _get(timebars, [timebarId, 'visuWindow']);
    if (!visuWindow) {
      logger.debug('no valid visuWindow for this view', viewId);
    }

    // current timelines
    const viewTimelines = getTimebarTimelines(timebars, timelines, timebarId);

    const structureType = vivl(type, 'structureType')();
    return structures(structureType, 'extractRemoteIds')(
      list, entryPoints, timebarId, viewTimelines, visuWindow, domains
    );
  }, {});
}

/**
 * Return the visible views data map:
 *
 * {
 *   'viewId': {
 *     type: 'TextView',
 *     entryPoints: {
 *       'name': {
 *         remoteId: string,
 *         field: string,
 *         expectedInterval: [number, number],
 *       },
 *   },
 * },
 * 'viewId': {
 *   type: 'PlotView',
 *   entryPoints: {
 *       'name': {
 *          remoteId: string,
 *          fieldX: string,
 *          fieldY: string,
 *          color: string,
 *          expectedInterval: [number, number],
 *        },
 *      },
 *   },
 * }
 *
 * @param domains
 * @param timebars
 * @param timelines
 * @param views
 * @return {*}
 */
export function visibleViews(domains, timebars, timelines, views) {
  return _reduce(views, (list, { viewId, timebarId, viewData: view }) => {
    const { type, configuration } = view;
    const { entryPoints } = configuration;
    if (!entryPoints || !entryPoints.length) {
      return list;
    }

    // current visuWindow
    const visuWindow = _get(timebars, [timebarId, 'visuWindow']);
    if (!visuWindow) {
      logger.debug('no valid visuWindow for this view', viewId);
    }

    // current timelines
    const viewTimelines = getTimebarTimelines(timebars, timelines, timebarId);

    const structureType = vivl(type, 'structureType')();
    const viewMap = structures(structureType, 'extractEntryPoints')(
      entryPoints, timebarId, viewTimelines, visuWindow, domains
    );

    return viewMap
      ? Object.assign(list, {
      [viewId]: {
        type,
        structureType,
        entryPoints: viewMap,
      },
    })
      : list;
  }, {});
}

// TODO memoize domains search (redux domains, search)
// TODO memoize sessions search (redux timebarTimelines, redux timelines, search)
export const perRemoteId = createSelector(
  [
    getDomains,
    getTimebars,
    getTimelines,
    getWindowsVisibleViews,
  ],
  visibleRemoteIds
);


// TODO memoize domains search (redux domains, search)
// TODO memoize sessions search (redux timebarTimelines, redux timelines, search)
export const perView = createSelector(
  [
    getDomains,
    getTimebars,
    getTimelines,
    getWindowsVisibleViews
  ],
  visibleViews
);
