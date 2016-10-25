import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import { createSelector } from 'reselect';

import vivl from '../../../../VIVL/main';
import debug from '../../debug/mainDebug';
import { getWindowsVisibleViews } from '../../../store/selectors/windows';
import { getTimebarTimelines } from '../../../store/selectors/timebars';

const logger = debug('data:map:visibleViews');

const getDomains = state => state.domains;
const getTimebars = state => state.timebars;
const getTimelines = state => state.timelines;

export default createSelector(
  [
    getDomains,
    getTimebars,
    getTimelines,
    getWindowsVisibleViews
  ],
  /**
   * Return the visible view data map:
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
  (domains, timebars, timelines, views) => {
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

      const viewMap = vivl(type, 'extractEntryPoints')(
        entryPoints, timebarId, viewTimelines, visuWindow, domains
      );

      return viewMap
        ? Object.assign(list, { [viewId]: viewMap })
        : list;
    }, {});

    return map;
  }
);
