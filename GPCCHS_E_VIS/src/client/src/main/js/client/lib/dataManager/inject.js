import _set from 'lodash/set';
import _reduce from 'lodash/reduce';

import { getStructureModule } from '../viewManager';

export const selectData = (viewDataState, viewDefinitions, intervalMap, payload) =>
  _reduce(viewDefinitions, (bag, view, viewId) => {
    const viewBag = getStructureModule(view.type).extractValues(
      viewDataState,
      intervalMap,
      payload,
      viewId,
      view.entryPoints,
      view.type
    );
    return viewBag ? _set(bag, [viewId], viewBag) : bag;
  }, {});

/**
 * viewMap description:
 *
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
 *
 *  payload description:
 *  {
 *    'remoteId': {
 *      'timestamp': {ReportingParameter},
 *    }
 *  }
 */
export default function inject(viewDataState, viewMap, intervalMap, payload) {
  const data = selectData(viewDataState, viewMap, intervalMap, payload);
  if (data && Object.keys(data).length > 0) {
    return _reduce(
      data,
      (newState, view, viewId) =>
        getStructureModule(view.type).viewDataUpdate(newState, viewId, view),
      viewDataState
    );
  }
  return viewDataState;
}
