import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';
import { DATASTRUCTURETYPE_LAST } from '../constants';
import { getStructureTypeTmp } from '../viewManager'; // TODO aleal change to getStructureType

export function addEpInLastTbdIdMap(lastTbdIdMap, ep, viewId) {
  const { tbdId } = ep;
  // error on entry point => no remoteId
  if (!tbdId) {
    return lastTbdIdMap;
  }
  const newMap = lastTbdIdMap || {};
  if (!newMap[tbdId]) {
    const { dataId, filters } = ep;
    newMap[tbdId] = {
      dataId,
      localIds: {},
      views: [viewId],
      filters,
    };
  } else {
    // Add the connected view
    newMap[tbdId].views.push(viewId);
  }
  const { localId, field, offset, timebarUuid, type } = ep;
  // ignore existing localIds (will represent the same data)
  if (!_has(newMap, [tbdId, 'localIds', localId])) {
    // insert (perRangeTbdId)
    _set(newMap, [tbdId, 'localIds', localId], {
      timebarUuid,
      offset,
      viewType: type,
    });
    // keep test on field for parametric plot
    newMap[tbdId].localIds[localId].field = field;
  }
  return newMap;
}

export default function perLastTbdIdMap(perViewMap) {
  let lastTbdIdMap = {};
  _each(perViewMap, (view, viewId) => {
    // Get structure type of view to treat only range structure
    if (getStructureTypeTmp(view.type) === DATASTRUCTURETYPE_LAST) {
      _each(view.entryPoints, (entryPoint) => {
        lastTbdIdMap = addEpInLastTbdIdMap(lastTbdIdMap, entryPoint, viewId);
      });
    }
  });
  return lastTbdIdMap;
}
