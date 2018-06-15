// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Separate expectedIntervalsMap by structure type in
//  dataMap
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : remove lastFrom0 from datamap add a test to keep the
//  good interval in datamap
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : remove lower bound type from viewManager
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 2.0.0 : DM : #5806 : 13/11/2017 : Pass mode into archive query (GMA/OBA)
// VERSION : 2.0.0.2 : FA : #11854 : 18/04/2018 : Fix provider flow field in data map
// END-HISTORY
// ====================================================================

import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';
import { DATASTRUCTURETYPE_LAST, PROVIDER_FLOW_ALL } from '../constants';
import { getStructureType } from '../viewManager';

export function addEpInLastTbdIdMap(lastTbdIdMap, ep, viewId) {
  const { tbdId } = ep;
  // error on entry point => no remoteId
  if (!tbdId) {
    return lastTbdIdMap;
  }
  const newMap = lastTbdIdMap || {};
  if (!newMap[tbdId]) {
    const { dataId, filters, mode } = ep;
    const provider = dataId.provider === PROVIDER_FLOW_ALL ? '' : dataId.provider;

    newMap[tbdId] = {
      mode,
      dataId: {
        ...dataId,
        provider,
      },
      localIds: {},
      views: [viewId],
      filters,
    };
  } else {
    // Add the connected view only once
    const index = _findIndex(newMap[tbdId].views, id => id === viewId);
    if (index < 0) {
      newMap[tbdId].views.push(viewId);
    }
  }
  const { localId, field, offset, timebarUuid, type } = ep;
  // If localId doesn't exist, adds an entry in map
  if (!_has(newMap, [tbdId, 'localIds', localId])) {
    // insert (perRangeTbdId)
    _set(newMap, [tbdId, 'localIds', localId], {
      timebarUuid,
      offset,
      viewType: type,
      field,
    });
  }
  return newMap;
}

export default function perLastTbdIdMap(perViewMap) {
  let lastTbdIdMap = {};
  _each(perViewMap, (view, viewId) => {
    // Get structure type of view to treat only range structure
    if (getStructureType(view.type) === DATASTRUCTURETYPE_LAST) {
      _each(view.entryPoints, (entryPoint) => {
        lastTbdIdMap = addEpInLastTbdIdMap(lastTbdIdMap, entryPoint, viewId);
      });
    }
  });
  return lastTbdIdMap;
}
