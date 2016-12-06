import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _has from 'lodash/has';
import { createSelector } from 'reselect';

import vivl from '../../VIVL/main';
import structures from './structures';
import debug from '../common/debug/mainDebug';
import { getDomains } from '../store/selectors/domains';
import { getTimebars, getTimebarTimelines, getMasterTimeline } from '../store/selectors/timebars';
import { getTimelines } from '../store/selectors/timelines';
import { getWindowsVisibleViews } from '../store/selectors/windows';

const logger = debug('data:map');

export const walk = (domains, timebars, timelines, views) =>
  _reduce(views, (map, { viewId, timebarId, viewData: view }) => {
    const { type, configuration } = view;
    const { entryPoints } = configuration;
    if (!entryPoints || !entryPoints.length) {
      return map;
    }

    // current visuWindow
    const visuWindow = _get(timebars, [timebarId, 'visuWindow']);
    if (!visuWindow) {
      logger.debug('no valid visuWindow for this view', viewId);
    }

    // current timelines
    const viewTimelines = getTimebarTimelines(timebars, timelines, timebarId);
    const viewMasterTimeline = getMasterTimeline(timebars, timelines, timebarId);

    const structureType = vivl(type, 'structureType')();
    const extract = structures(structureType, 'parseEntryPoint');

    return _reduce(entryPoints, (subMap, entryPoint) => {
      const { name } = entryPoint;

      // create remoteId node (perView)
      if (!_has(map, ['perView', viewId])) {
        _set(map, ['perView', viewId], {
          type,
          structureType,
          entryPoints: {},
        });
      }

      const ep = extract(
        entryPoint,
        timebarId,
        viewTimelines,
        viewMasterTimeline,
        visuWindow,
        domains
      );
      if (ep.error) {
        _set(map, ['perView', viewId, 'entryPoints', name], ep);
        logger.info('invalid entryPoint', name, ep.error);
        return subMap;
      }

      const { remoteId, localId, field, offset, expectedInterval, inViewMap } = ep;

      // insert (perView)
      _set(map, ['perView', viewId, 'entryPoints', name],
        Object.assign({}, inViewMap, { id: entryPoint.id }));

      // create remoteId node (perRemoteId)
      if (!_has(map, ['perRemoteId', remoteId])) {
        const { dataId, filter } = ep;
        _set(map, ['perRemoteId', remoteId], {
          structureType,
          dataId,
          filter,
          localIds: {},
        });
      }

      // ignore existing localIds (will represent the same data)
      if (!_has(map, ['perRemoteId', remoteId, 'localIds', localId])) {
        // insert (perRemoteId)
        _set(map, ['perRemoteId', remoteId, 'localIds', localId], {
          field,
          timebarId,
          offset,
          expectedInterval,
        });
      }

      return subMap;
    }, map);
  },
  { perRemoteId: {}, perView: {} }
);

/**
 * Return dataMap organized per view:
 *
 * {
 *   perRemoteId: {
 *     'remoteId': {
 *       dataId: {...},
 *       filter: [{field: string, operator: string, operand: string}],
 *       localIds: {
 *         'localId': {
 *           field: string,
 *           timebarId: string,
 *           offset: number,
 *           expectedInterval: [number, number],
 *         },
 *       },
 *     },
 *   },
 *   perView: {
 *     'viewId': {
 *       type: 'TextView',
 *       entryPoints: {
 *         'name': {
 *           remoteId: string,
 *           field: string,
 *           expectedInterval: [number, number],
 *         },
 *       },
 *     },
 *     'viewId': {
 *       type: 'PlotView',
 *       entryPoints: {
 *         'name': {
 *            remoteId: string,
 *            fieldX: string,
 *            fieldY: string,
 *            offset: number,
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
  [
    getDomains,
    getTimebars,
    getTimelines,
    getWindowsVisibleViews,
  ],
  walk
);

// TODO memoize domains search (redux domains, search)
// TODO memoize sessions search (redux timebarTimelines, redux timelines, search)
