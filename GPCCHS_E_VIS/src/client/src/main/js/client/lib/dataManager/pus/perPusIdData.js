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
  const pusId = getPusFlattenId(apids, dataId);

  const newMap = pusIdMap || {};

  let pusService;
  switch (type) {
    case 'PUS5View':
      pusService = constants.PUS_SERVICE_05;
      break;
    case 'PUS11View':
      pusService = constants.PUS_SERVICE_11;
      break;
    case 'PUS12View':
      pusService = constants.PUS_SERVICE_12;
      break;
    case 'PUS13View':
      pusService = constants.PUS_SERVICE_13;
      break;
    case 'PUS14View':
      pusService = constants.PUS_SERVICE_14;
      break;
    case 'PUS15View':
      pusService = constants.PUS_SERVICE_15;
      break;
    case 'PUS18View':
      pusService = constants.PUS_SERVICE_18;
      break;
    case 'PUS19View':
      pusService = constants.PUS_SERVICE_19;
      break;
    case 'PUS140View':
      pusService = constants.PUS_SERVICE_140;
      break;
    case 'PUS142View':
      pusService = constants.PUS_SERVICE_142;
      break;
    case 'PUS1444View':
      pusService = constants.PUS_SERVICE_144;
      break;
    case 'PUSMMEView':
      pusService = constants.PUS_SERVICE_MME;
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
