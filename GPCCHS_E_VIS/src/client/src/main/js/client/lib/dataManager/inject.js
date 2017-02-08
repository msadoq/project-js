import _set from 'lodash/set';
import _reduce from 'lodash/reduce';

import vivl from '../../VIVL/main';
import structures from './structures';

export const selectData = (viewDataState, viewDefinitions, payload) =>
  _reduce(viewDefinitions, (bag, view, viewId) => {
    const structureType = vivl(view.type, 'structureType')();
    const viewBag = structures(structureType, 'extractValues')(
      viewDataState,
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
export default function inject(viewDataState, viewMap, payload) {
  const data = selectData(viewDataState, viewMap, payload);
  if (data && Object.keys(data).length > 0) {
    return _reduce(
      data,
      (newState, view, viewId) => structures(view.structureType, 'viewDataUpdate')(
        newState, viewId, view
      ),
      viewDataState
    );
  }
  return viewDataState;
}
