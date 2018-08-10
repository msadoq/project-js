import { getStructureType } from 'viewManager/index';
import _findIndex from 'lodash/findIndex';
import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';
import { getPusFlattenId } from 'common/flattenDataId';
import { getViewServiceFromType } from 'viewManager/common/pus/utils';

import * as constants from '../../constants';

export function addApidInPusIdMap(pusIdMap, ep, viewId) {
  const { apids, dataId, type, localId, offset, timebarUuid } = ep;
  const pusId = getPusFlattenId(apids, dataId);
  const newMap = pusIdMap || {};
  const pusService = getViewServiceFromType(type);
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
