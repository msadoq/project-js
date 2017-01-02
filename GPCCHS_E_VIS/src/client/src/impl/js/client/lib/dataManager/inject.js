import _set from 'lodash/set';
import _reduce from 'lodash/reduce';
import executionMonitor from 'common/execution';

import vivl from '../../VIVL/main';
import structures from './structures';
import { updateViewData } from '../store/actions/viewData';

const execution = executionMonitor('data:inject');

export const selectData = (state, viewDefinitions, payload, count) =>
  _reduce(viewDefinitions, (bag, view, viewId) => {
    const structureType = vivl(view.type, 'structureType')();
    const viewBag = structures(structureType, 'extractValues')(
      state,
      payload,
      viewId,
      view.entryPoints,
      count
    );

    return viewBag
      ? _set(bag, [viewId], viewBag)
      : bag;
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
export default function inject(state, dispatch, viewMap, payload) {
  execution.start('global');

  const count = { last: 0, range: 0 };
  const data = selectData(state, viewMap, payload, count);
  if (data && Object.keys(data).length > 0) {
    const newViewData = _reduce(
      data,
      (newState, view, viewId) => structures(view.structureType, 'viewDataUpdate')(
        newState, viewId, view
      ),
      state
    );
    dispatch(updateViewData(newViewData.viewData));
  }
  execution.stop('global', `dataInjection (${count.last} last and ${count.range} range values)`);
}
