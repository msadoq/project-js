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

export const walkViews = method => (domains, timebars, timelines, views) =>
  _reduce(views, (list, { viewId, timebarId, viewData: view }) => {
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

    // TODO iterate on entryPoints
    // TODO for each call a getConnectedData

    return structures(structureType, method)(
      list, viewId, type, entryPoints, timebarId, viewTimelines, visuWindow, domains
    );
  },
{});

// TODO memoize domains search (redux domains, search)
// TODO memoize sessions search (redux timebarTimelines, redux timelines, search)

/**
 * Return dataMap organized per remoteId:
 *
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
 * @param state
 * @return {*}
 */
export const perRemoteId = createSelector(
  [
    getDomains,
    getTimebars,
    getTimelines,
    getWindowsVisibleViews,
  ],
  walkViews('extractRemoteIds')
);

/**
 * Return dataMap organized per view:
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
 *     },
 *   },
 *   'viewId': {
 *     type: 'PlotView',
 *     entryPoints: {
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
 * @param state
 * @return {*}
 */
export const perView = createSelector(
  [
    getDomains,
    getTimebars,
    getTimelines,
    getWindowsVisibleViews,
  ],
  walkViews('extractEntryPoints')
);
