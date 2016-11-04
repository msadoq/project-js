import { each, set } from 'lodash';
import { constants as globalConstants } from 'common';
import profiling from '../debug/profiling';
import debug from '../debug/mainDebug';
import vivl from '../../../VIVL/main';
import getViewDefinitions from './map/visibleViews';
import { importPayload } from '../../store/actions/viewData';
import selectLastValue from './structures/last/lastValue';
import selectRangeValues from './structures/range/rangeValues';

const logger = debug('data:inject');

export function selectData(state, viewDefinitions, payload) {
  const bag = {};
  // remoteId
  each(viewDefinitions, (view, viewId) => {
    // Check view type
    const structureType = vivl(view.type, 'structureType')();
    switch (structureType) {
      case globalConstants.DATASTRUCTURETYPE_LAST: {
        const viewBag = selectLastValue(state, payload, viewId, view.entryPoints);
        if (viewBag) {
          set(bag, [viewId], viewBag);
        }
        break;
      }
      case globalConstants.DATASTRUCTURETYPE_RANGE: {
        const viewBag = selectRangeValues(payload, view.entryPoints);
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

  const start = profiling.start();
  const viewDefinitions = getViewDefinitions(state);
  const data = selectData(state, viewDefinitions, payload);
  dispatch(importPayload(data));

  profiling.stop(
    start,
    `dataInjection (${Object.keys(data).length ? Object.keys(data).length : 0} remoteId)`
  );
}
