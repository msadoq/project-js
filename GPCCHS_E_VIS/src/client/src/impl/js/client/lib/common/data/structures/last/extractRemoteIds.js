import _first from 'lodash/first';
import _set from 'lodash/set';
import _reduce from 'lodash/reduce';
import { constants as globalConstants } from 'common';

import applyDomainsAndTimebar from '../../map/applyDomainsAndTimebar';

export default function extractRemoteIds(
  list, entryPoints, timebarId, timelines, visuWindow, domains
) {
  return _reduce(entryPoints, (sublist, ep) => {
    const cds = applyDomainsAndTimebar(
      ep.connectedData, globalConstants.DATASTRUCTURETYPE_LAST, timebarId,
      visuWindow, timelines, domains, false
    );
    if (!Object.keys(cds).length) {
      return sublist;
    }

    // get first remoteId/localId
    const remoteId = _first(Object.keys(cds));
    const { structureType, dataId, filter, localIds } = cds[remoteId];
    const localId = _first(Object.keys(localIds));

    // de-duplication
    if (typeof sublist[remoteId] === 'undefined') {
      _set(sublist, [remoteId], {
        structureType,
        dataId,
        filter,
        localIds: {},
      });
    } else if (typeof sublist[remoteId][localId] !== 'undefined') {
      // localId contains timebar and offset, so if already _set, the same data was already
      // requested
      return sublist;
    }

    return _set(sublist, [remoteId, 'localIds', localId], localIds[localId]);
  }, list);
}
