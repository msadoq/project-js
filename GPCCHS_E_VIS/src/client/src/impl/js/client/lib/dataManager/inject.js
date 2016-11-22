import _each from 'lodash/each';
import _set from 'lodash/set';
import globalConstants from 'common/constants';
import executionMonitor from 'common/execution';

import vivl from '../../VIVL/main';

import debug from '../common/debug/mainDebug';
import { importPayload } from '../store/actions/viewData';
import lastValue from './structures/last/lastValue'; // TODO use structures facade instead of require
import rangeValues from './structures/range/rangeValues'; // TODO use structures facade instead of require

const logger = debug('data:inject');
const execution = executionMonitor('data:inject');

export function selectData(state, viewDefinitions, payload, count) {
  const bag = {};
  // remoteId
  _each(viewDefinitions, (view, viewId) => {
    // Check view type
    const structureType = vivl(view.type, 'structureType')();
    switch (structureType) {
      case globalConstants.DATASTRUCTURETYPE_LAST: {
        const viewBag = lastValue(state, payload, viewId, view.entryPoints, count);
        if (viewBag) {
          _set(bag, [viewId], viewBag);
        }
        break;
      }
      case globalConstants.DATASTRUCTURETYPE_RANGE: {
        const viewBag = rangeValues(payload, view.entryPoints, count);
        if (viewBag) {
          _set(bag, [viewId], viewBag);
        }
        break;
      }
      default:
        logger.warn(`unknown view type ${view.type}`);
    }
  });
  return bag;
}

export default function inject(state, dispatch, viewMap, payload) {
  execution.start('global');

  const count = { last: 0, range: 0 };
  const data = selectData(state, viewMap, payload, count);
  dispatch(importPayload(data));

  execution.stop('global', `dataInjection (${count.last} last and ${count.range} range values)`);
}
