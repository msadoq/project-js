import _set from 'lodash/set';
import _get from 'lodash/get';
import _first from 'lodash/first';
import _reduce from 'lodash/reduce';

import debug from '../../../lib/common/debug/mainDebug';
import applyDomainsAndTimebar from '../../../lib/common/data/map/applyDomainsAndTimebar';

const logger = debug('data:map:plot:extractRemoteIds');

export default function extractRemoteIds(
  list, entryPoints, timebarId, timelines, visuWindow, domains
) {
  return _reduce(entryPoints, (sublist, ep) => {
    const cdsX = applyDomainsAndTimebar(
      ep.connectedDataX, 'PlotView', timebarId, visuWindow, timelines, domains, false
    );
    if (!Object.keys(cdsX).length) {
      logger.debug('invalid X connectedData for this entryPoint', name);
      return sublist;
    }

    const cdsY = applyDomainsAndTimebar(
      ep.connectedDataY, 'PlotView', timebarId, visuWindow, timelines, domains, false
    );
    if (!Object.keys(cdsY).length) {
      logger.debug('invalid Y connectedData for this entryPoint', name);
      return sublist;
    }

    const remoteIdX = _first(Object.keys(cdsX));
    const remoteIdY = _first(Object.keys(cdsY));
    if (remoteIdX !== remoteIdY) {
      logger.debug('parametric entryPoint detected for this view (remote)', name);
      return sublist;
    }

    const localIdX = _first(Object.keys(cdsX[remoteIdX].localIds));
    const localIdXData = _get(cdsX, [remoteIdX, 'localIds', localIdX]);
    const localIdY = _first(Object.keys(cdsY[remoteIdY].localIds));
    const localIdYData = _get(cdsY, [remoteIdY, 'localIds', localIdY]);
    if (localIdXData.offset !== localIdYData.offset) {
      logger.debug('parametric entryPoint detected for this view (local)', name);
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
