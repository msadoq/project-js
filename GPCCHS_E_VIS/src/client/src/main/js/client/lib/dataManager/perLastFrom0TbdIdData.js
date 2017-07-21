import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';
import { DATASTRUCTURETYPE_LASTFROM0 } from '../constants';
import { getStructureTypeTmp } from '../viewManager'; // TODO change to getStructureType

export function addEpInLastFrom0TbdIdMap(lastFrom0TbdIdMap, ep, viewId) {
  const { tbdId } = ep;
  // error on entry point => no remoteId
  if (!tbdId) {
    return lastFrom0TbdIdMap;
  }
  const newMap = lastFrom0TbdIdMap || {};
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

export default function perLastFrom0TbdIdMap(perViewMap) {
  let lastFrom0TbdIdMap = {};
  _each(perViewMap, (view, viewId) => {
    // Get structure type of view to treat only range structure
    if (getStructureTypeTmp(view.type) === DATASTRUCTURETYPE_LASTFROM0) {
      _each(view.entryPoints, (entryPoint) => {
        lastFrom0TbdIdMap = addEpInLastFrom0TbdIdMap(lastFrom0TbdIdMap, entryPoint, viewId);
      });
    }
  });
  return lastFrom0TbdIdMap;
}
