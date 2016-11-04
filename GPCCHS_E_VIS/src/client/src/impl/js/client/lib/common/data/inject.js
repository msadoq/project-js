import { each, set } from 'lodash';
import { constants as globalConstants } from 'common';
import profiling from '../debug/profiling';
import debug from '../debug/mainDebug';
import vivl from '../../../VIVL/main';
import getViewDefinitions from './map/visibleViews';
import { importPayload } from '../../store/actions/viewData';
import lastValue from './structures/last/lastValue';
import rangeValues from './structures/range/rangeValues';

const logger = debug('data:inject');

export function selectData(state, viewDefinitions, payload, count) {
  const bag = {};
  // remoteId
  each(viewDefinitions, (view, viewId) => {
    // Check view type
    const structureType = vivl(view.type, 'structureType')();
    switch (structureType) {
      case globalConstants.DATASTRUCTURETYPE_LAST: {
        const viewBag = lastValue(state, payload, viewId, view.entryPoints, count);
        if (viewBag) {
          set(bag, [viewId], viewBag);
        }
        break;
      }
      case globalConstants.DATASTRUCTURETYPE_RANGE: {
        const viewBag = rangeValues(payload, view.entryPoints, count);
        if (viewBag) {
          set(bag, [viewId], viewBag);
        }
        break;
      }
      default:
        logger.warn(`unknown view type ${view.type}`);
    }
  });
  return bag;
}

export default function inject(state, dispatch, payload) {
  logger.verbose('begin');

  const count = { last: 0, range: 0 };
  const start = profiling.start();
  const viewDefinitions = getViewDefinitions(state);
  const data = selectData(state, viewDefinitions, payload, count);
  dispatch(importPayload(data));

  return (count.last || count.range)
    ? profiling.stop(
        start,
        `dataInjection (${count.last} last and ${count.range} range values)`
      )
    : profiling.stop(start, false);
}
