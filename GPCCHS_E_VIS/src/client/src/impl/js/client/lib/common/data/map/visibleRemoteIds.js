import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import { createSelector } from 'reselect';

import vivl from '../../../../VIVL/main';
import structures from '../structures';
import profiling from '../../debug/profiling';
import debug from '../../debug/mainDebug';
import { getWindowsVisibleViews } from '../../../store/selectors/windows';
import { getTimebarTimelines } from '../../../store/selectors/timebars';

const logger = debug('data:map:visibleRemoteIds');

const getDomains = state => state.domains;
const getTimebars = state => state.timebars;
const getTimelines = state => state.timelines;

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
  const start = profiling.start();
  const map = _reduce(views, (list, { viewId, timebarId, viewData: view }) => {
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

    // return vivl(type, 'extractRemoteIds')(
    const dataLayout = vivl(type, 'dataLayout')();
    return structures(dataLayout, 'extractRemoteIds')(
      list, entryPoints, timebarId, viewTimelines, visuWindow, domains
    );
  }, {});

  profiling.stop(start, 'visibleRemoteIds');
  return map;
}

// TODO memoize domains search (redux domains, search)
// TODO memoize sessions search (redux timebarTimelines, redux timelines, search)
export default createSelector(
  [getDomains, getTimebars, getTimelines, getWindowsVisibleViews],
  visibleRemoteIds
);
