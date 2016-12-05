import _each from 'lodash/each';
import _set from 'lodash/set';
import _reduce from 'lodash/reduce';
import globalConstants from 'common/constants';
import executionMonitor from 'common/execution';

import vivl from '../../VIVL/main';
import structures from './structures';
import debug from '../common/debug/mainDebug';
import { updateViewData } from '../store/actions/viewData';
import lastValue from './structures/last/lastValue'; // TODO use structures facade instead of require
import rangeValues from './structures/range/rangeValues'; // TODO use structures facade instead of require
import viewDataUpdateRange from './structures/range/viewDataUpdate';
import viewDataUpdateLast from './structures/last/viewDataUpdate';

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
/**
 * {
 *   viewId: {
 *     // last structure type
 *     structureType: 'last'
 *     index: {
 *       CLK_BC_PMONENA: 1420106460000,
 *       GENE_AM_S23RTSWD: 1420106460000,
 *     },
 *     values: {
 *       CLK_BC_PMONENA: 0.286974618986513,
 *       GENE_AM_S23RTSWD: 0.286974618986513,
 *     },
 *   },
 *   viewId: {
 *     // range structure type
 *     structureType: 'range',
 *     remove: {
 *       lower: 1420106460000,
 *       upper: 1420106460000,
 *     },
 *     add: {
 *       '1420106464000': {
 *         CLK_BC_PMONENA: { x: 1420106464000, value: 0.286974618986513 },
 *         GENE_AM_S23RTSWD: { x: 1420106464000, value: 0.25454618986513 },
 *       },
 *     },
 *    }
 *  }
 */
export default function inject(state, dispatch, viewMap, payload) {
  execution.start('global');

  const count = { last: 0, range: 0 };
  const data = selectData(state, viewMap, payload, count);
  if (data && Object.keys(data).length > 0) {
    const newViewData = _reduce(data, (newState, view, viewId) => {
      if (view.structureType === 'range') {
        // eslint-disable-next-line no-param-reassign
        newState = viewDataUpdateRange(newState, viewId, view);
        return newState;
      }
      // eslint-disable-next-line no-param-reassign
      newState = viewDataUpdateLast(newState, viewId, view);
      return newState;
    }, state);
    // dispatch(importPayload(data));
    dispatch(updateViewData(newViewData.viewData));
  }
  execution.stop('global', `dataInjection (${count.last} last and ${count.range} range values)`);
}
