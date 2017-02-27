import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';

export function addEpInRemoteIdMap(remoteIdMap, ep, viewId) {
  const { remoteId } = ep;
  // error on entry point => no remoteId
  if (!remoteId) {
    return remoteIdMap;
  }
  const newMap = remoteIdMap || {};
  if (!newMap[remoteId]) {
    const { dataId, filter, structureType } = ep;
    newMap[remoteId] = {
      structureType,
      dataId,
      filter,
      localIds: {},
      views: [viewId],
    };
  } else {
    // Add the connected view
    newMap[remoteId].views.push(viewId);
  }
  const { localId, field, fieldX, fieldY, offset, timebarUuid, type } = ep;
  // ignore existing localIds (will represent the same data)
  if (!_has(newMap, [remoteId, 'localIds', localId])) {
    // insert (perRemoteId)
    _set(newMap, [remoteId, 'localIds', localId], {
      timebarUuid,
      offset,
      viewType: type,
    });
    if (field) {
      newMap[remoteId].localIds[localId].field = field;
    } else if (fieldY) {
      newMap[remoteId].localIds[localId].fieldX = fieldX;
      newMap[remoteId].localIds[localId].fieldY = fieldY;
    }
  }
  return newMap;
}

export default function perRemoteIdMap(perViewMap) {
  let remoteIdMap = {};
  _each(perViewMap, (view, viewId) => {
    // const epValues = _reduce(view.entryPoints, (acc, entryPoint) => {
    //   acc.push(_values(entryPoint)[0]);
    //   return acc;
    // }, []);
    _each(view.entryPoints, (entryPoint) => {
      remoteIdMap = addEpInRemoteIdMap(remoteIdMap, entryPoint, viewId);
    });
  });
  return remoteIdMap;
}
