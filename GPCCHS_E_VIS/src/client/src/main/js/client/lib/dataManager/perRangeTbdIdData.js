import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';
import { DATASTRUCTURETYPE_RANGE } from '../constants';
import { getStructureType } from '../viewManager';

export function addEpInRangeTbdIdMap(rangeTbdIdMap, ep, viewId) {
  const { tbdId } = ep;
  // error on entry point => no remoteId
  if (!tbdId) {
    return rangeTbdIdMap;
  }
  const newMap = rangeTbdIdMap || {};
  if (!newMap[tbdId]) {
    const { dataId, filters } = ep;
    newMap[tbdId] = {
      dataId,
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
  const { localId, field, fieldX, fieldY, offset, timebarUuid, type } = ep;
  // ignore existing localIds (will represent the same data)
  if (!_has(newMap, [tbdId, 'localIds', localId])) {
    // insert (perRangeTbdId)
    _set(newMap, [tbdId, 'localIds', localId], {
      timebarUuid,
      offset,
      viewType: type,
    });
    // keep test on field for parametric plot
    if (field) {
      newMap[tbdId].localIds[localId].field = field;
    } else if (fieldY) {
      newMap[tbdId].localIds[localId].fieldX = fieldX;
      newMap[tbdId].localIds[localId].fieldY = fieldY;
    }
  }
  return newMap;
}

export default function perRangeTbdIdMap(perViewMap) {
  let rangeTbdIdMap = {};
  _each(perViewMap, (view, viewId) => {
    // Get structure type of view to treat only range structure
    if (getStructureType(view.type) === DATASTRUCTURETYPE_RANGE) {
      _each(view.entryPoints, (entryPoint) => {
        rangeTbdIdMap = addEpInRangeTbdIdMap(rangeTbdIdMap, entryPoint, viewId);
      });
    }
  });
  return rangeTbdIdMap;
}
