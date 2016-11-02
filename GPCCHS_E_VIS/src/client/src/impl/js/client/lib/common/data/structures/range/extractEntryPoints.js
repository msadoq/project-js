import _get from 'lodash/get';
import _first from 'lodash/first';
import _reduce from 'lodash/reduce';
import { constants as globalConstants } from 'common';

import debug from '../../../debug/mainDebug';
import applyDomainsAndTimebar from '../../map/applyDomainsAndTimebar';

const logger = debug('data:map:range:extractEntryPoints');

export default function extractEntryPoints(
  entryPoints, timebarId, timelines, visuWindow, domains
) {
  return _reduce(entryPoints, (sublist, ep) => {
    const { name } = ep;

    const cdsX = applyDomainsAndTimebar(
      ep.connectedDataX, globalConstants.DATASTRUCTURETYPE_RANGE, timebarId, visuWindow, timelines, domains, false
    );
    if (!Object.keys(cdsX).length) {
      logger.debug('invalid X connectedData for this entryPoint', name);
      return sublist;
    }

    const cdsY = applyDomainsAndTimebar(
      ep.connectedDataY, globalConstants.DATASTRUCTURETYPE_RANGE, timebarId, visuWindow, timelines, domains, false
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

    return Object.assign(sublist, {
      [name]: {
        remoteId: remoteIdX,
        fieldX: localIdXData.field,
        fieldY: localIdYData.field,
        offset: localIdYData.offset,
        expectedInterval: localIdYData.expectedInterval,
      },
    });
  }, {});
}
