import { getStructureType } from 'viewManager/index';
import _findIndex from 'lodash/findIndex';
import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';
import { getPusFlattenId } from 'common/flattenDataId';
import * as constants from '../../constants';

// TODO @jmira finish this function
/* eslint-disable complexity */
export function addApidInPusIdMap(pusIdMap, ep, viewId) {
  const { apidName, apids, dataId, type, localId, offset, timebarUuid } = ep;
  // error on entry point => no remoteId
  if (!apidName) {
    return pusIdMap;
  }
  const pusId = getPusFlattenId(apidName, dataId);

  const newMap = pusIdMap || {};

  let pusService;
  switch (type) {
    case 'PUS5View':
      pusService = 5;
      break;
    case 'PUS11View':
      pusService = 11;
      break;
    case 'PUS12View':
      pusService = 12;
      break;
    case 'PUS13View':
      pusService = 13;
      break;
    case 'PUS14View':
      pusService = 14;
      break;
    case 'PUS15View':
      pusService = 15;
      break;
    case 'PUS18View':
      pusService = 14;
      break;
    case 'PUS19View':
      pusService = 14;
      break;
    case 'PUS140View':
      pusService = 14;
      break;
    case 'PUS142View':
      pusService = 14;
      break;
    case 'PUS1444View':
      pusService = 14;
      break;
    case 'PUSMMEView':
      pusService = 0;
      break;
    default:
      pusService = null;
      break;
  }

  if (!newMap[pusId]) {
    newMap[pusId] = {
      dataId: {
        ...dataId,
        apids,
        pusService,
      },
      localIds: {},
      views: [viewId],
    };
  } else {
    // Add the connected view only once
    const index = _findIndex(newMap[pusId].views, id => id === viewId);
    if (index < 0) {
      newMap[pusId].views.push(viewId);
    }
  }

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
    if (getStructureType(view.type) === constants.DATASTRUCTURETYPE_PUS) {
      _each(view.entryPoints, (entryPoint) => {
        pusIdMap = addApidInPusIdMap(pusIdMap, entryPoint, viewId);
      });
    }
  });
  return pusIdMap;
}
