import _set from 'lodash/set';
import _get from 'lodash/get';
import _first from 'lodash/first';
import _reduce from 'lodash/reduce';

import globalConstants from 'common/constants';

import debug from '../../../debug/mainDebug';
import applyDomainsAndTimebar from '../../map/applyDomainsAndTimebar';

const logger = debug('data:map:range:extractRemoteIds');

export default function extractRemoteIds(
  list, entryPoints, timebarId, timelines, visuWindow, domains
) {
  return _reduce(entryPoints, (sublist, ep) => {
    const cdsX = applyDomainsAndTimebar(
      ep.connectedDataX, globalConstants.DATASTRUCTURETYPE_RANGE, timebarId,
      visuWindow, timelines, domains, false
    );
    if (!Object.keys(cdsX).length) {
      logger.debug('invalid X connectedData for this entryPoint', ep.name);
      return sublist;
    }

    const cdsY = applyDomainsAndTimebar(
      ep.connectedDataY, globalConstants.DATASTRUCTURETYPE_RANGE, timebarId,
      visuWindow, timelines, domains, false
    );
    if (!Object.keys(cdsY).length) {
      logger.debug('invalid Y connectedData for this entryPoint', ep.name);
      return sublist;
    }

    const remoteIdX = _first(Object.keys(cdsX));
    const remoteIdY = _first(Object.keys(cdsY));
    if (remoteIdX !== remoteIdY) {
      logger.debug('parametric entryPoint detected for this view (remote)', ep.name);
      return sublist;
    }

    const localIdX = _first(Object.keys(cdsX[remoteIdX].localIds));
    const localIdXData = _get(cdsX, [remoteIdX, 'localIds', localIdX]);
    const localIdY = _first(Object.keys(cdsY[remoteIdY].localIds));
    const localIdYData = _get(cdsY, [remoteIdY, 'localIds', localIdY]);
    if (localIdXData.offset !== localIdYData.offset) {
      logger.debug('parametric entryPoint detected for this view (local)', ep.name);
      return sublist;
    }

    // arbitrary take X data (will not work for parametric curve)
    const remoteId = remoteIdX;
    const localId = localIdX;

    // TODO: maybe localId no longer require field in key (data is stored per view/ep, data is
    // requested by remoteId (no field)

    // de-duplication
    if (typeof sublist[remoteId] === 'undefined') {
      _set(sublist, [remoteId], {
        structureType: cdsX[remoteId].structureType,
        dataId: cdsX[remoteId].dataId,
        filter: cdsX[remoteId].filter,
        localIds: {},
      });
    } else if (typeof sublist[remoteId][localId] !== 'undefined') {
      // localId contains timebar and offset, so if already _set, the same data was already
      // requested
      return sublist;
    }

    return _set(sublist, [remoteIdX, 'localIds', localId], localIdXData);
  }, list);
}
