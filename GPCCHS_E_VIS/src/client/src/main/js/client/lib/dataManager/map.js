import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _has from 'lodash/has';
import _isUndefined from 'lodash/isUndefined';
import any from 'lodash/fp/any';
import { createSelector } from 'reselect';
import getLogger from 'common/log';

import vivl from '../../VIVL/main';
import structures from './structures';
import { getMasterSessionId } from '../store/selectors/masterSession';
import { getDomains } from '../store/selectors/domains';
import { getTimebars, getTimebarTimelines } from '../store/selectors/timebars';
import { getTimelines } from '../store/selectors/timelines';
import { getWindowsVisibleViews } from '../store/selectors/windows';

const logger = getLogger('data:map');

const anyUndefined = any(_isUndefined);

export const getViewData = ({
  domains,
  view,
  timebars,
  timebarUuid,
  timelines,
  masterSessionId,
}) => {
  if (anyUndefined([domains, view, timebars, timebarUuid, timelines])) {
    return {};
  }

  const { type, configuration } = view;
  // Ignore collapsed view
  if (configuration.collapsed) {
    return {};
  }
  const { entryPoints } = configuration;
  const structureType = vivl(type, 'structureType')();
  const extract = structures(structureType, 'parseEntryPoint');
  const viewTimelines = getTimebarTimelines(timebars, timelines, timebarUuid);
  const visuWindow = _get(timebars, [timebarUuid, 'visuWindow']);

  return {
    type,
    entryPoints,
    visuWindow,
    viewTimelines,
    masterSessionId,
    structureType,
    epsData: entryPoints.map(ep =>
      extract(
        ep,
        timebarUuid,
        viewTimelines,
        masterSessionId,
        visuWindow,
        domains
      )
    ),
  };
};

export const walk = (masterSessionId, domains, timebars, timelines, views) =>
  _reduce(views, (map, { viewId, timebarUuid, viewData: view }) => {
    const props = getViewData({
      domains,
      timebars,
      timelines,
      view,
      timebarUuid,
      masterSessionId,
    });
    // Case of invalid view or collapsed view
    if (!Object.keys(props).length) {
      return map;
    }
    const {
      entryPoints,
      visuWindow,
      type,
      structureType,
      epsData,
    } = props;

    if (!entryPoints || !entryPoints.length) {
      return map;
    }

    // current visuWindow
    if (!visuWindow) {
      logger.debug('no valid visuWindow for this view', viewId);
    }

    return _reduce(entryPoints, (subMap, entryPoint, i) => {
      const { name } = entryPoint;
      // create remoteId node (perView)
      if (!_has(map, ['perView', viewId])) {
        _set(map, ['perView', viewId], {
          type,
          structureType,
          entryPoints: {},
        });
      }

      const ep = epsData[i];

      if (ep.error) {
        _set(map, ['perView', viewId, 'entryPoints', name], ep);
        logger.info('invalid entryPoint', name, ep.error);
        return subMap;
      }

      const { remoteId, localId, field, offset, expectedInterval, inViewMap } = ep;

      // insert (perView)
      _set(map, ['perView', viewId, 'entryPoints', name],
        Object.assign({}, inViewMap, { id: entryPoint.id, offset }));

      // create remoteId node (perRemoteId)
      if (!_has(map, ['perRemoteId', remoteId])) {
        const { dataId, filter } = ep;
        _set(map, ['perRemoteId', remoteId], {
          structureType,
          dataId,
          filter,
          localIds: {},
          views: [viewId],
        });
      } else {
        // Add the connected view
        map.perRemoteId[remoteId].views.push(viewId);
      }

      // ignore existing localIds (will represent the same data)
      if (!_has(map, ['perRemoteId', remoteId, 'localIds', localId])) {
        // insert (perRemoteId)
        _set(map, ['perRemoteId', remoteId, 'localIds', localId], {
          field,
          timebarUuid,
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
 *           timebarUuid: string,
 *           offset: number,
 *           expectedInterval: [number, number],
 *         },
 *       },
 *     },
 *   },
 *   perView: {
 *     'viewId': {
 *       type: 'TextView',
 *       structureType: 'last',
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
 *       structureType: 'range',
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
  [
    getMasterSessionId,
    getDomains,
    getTimebars,
    getTimelines,
    getWindowsVisibleViews,
  ],
  walk
);

// TODO memoize sessions search (redux timebarTimelines, redux timelines, search)
