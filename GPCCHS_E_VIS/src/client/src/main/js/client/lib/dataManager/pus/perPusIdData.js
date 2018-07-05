import { getStructureType } from 'viewManager/index';
import _findIndex from 'lodash/findIndex';
import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';
import { getPusFlattenId } from 'common/flattenDataId';
import { PROVIDER_FLOW_ALL, DATASTRUCTURETYPE_PUS } from '../../constants';

// TODO @jmira finish this function
export function addApidInPusIdMap(pusIdMap, ep, viewId){
  const { apidName, apidRawValue, dataId } = ep;
  // error on entry point => no remoteId
  if (!apidName) {
    return pusIdMap;
  }

  const pusId = getPusFlattenId(apidName, dataId);
  const newMap = pusIdMap || {};

  if (!newMap[pusId]) {
    const provider = dataId.provider === PROVIDER_FLOW_ALL ? '' : dataId.provider;
    newMap[pusId] = {
      dataId: {
        ...dataId,
        provider,
      },
      localIds: {},
      views: [viewId],
      apidName,
      apidRawValue,
    };
  } else {
    // Add the connected view only once
    const index = _findIndex(newMap[pusId].views, id => id === viewId);
    if (index < 0) {
      newMap[pusId].views.push(viewId);
    }
  }

  const { localId, offset, timebarUuid, type } = ep;
  // ignore existing localIds (will represent the same data)
  if (!_has(newMap, [pusId, 'localIds', localId])) {
    _set(newMap, [pusId, 'localIds', localId], {
      timebarUuid,
      offset,
      viewType: type,
    });
  }
  return newMap;
}

export default function perPusIdMap(perViewMap) {
  let pusIdMap = {};
  _each(perViewMap, (view, viewId) => {
    if (getStructureType(view.type) === DATASTRUCTURETYPE_PUS) {
      _each(view.entryPoints, (entryPoint) => {
        pusIdMap = addApidInPusIdMap(pusIdMap, entryPoint, viewId);
      });
    }
  });
  return pusIdMap;
}
