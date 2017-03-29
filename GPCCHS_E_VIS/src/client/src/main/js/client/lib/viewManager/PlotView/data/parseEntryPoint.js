import _isEqual from 'lodash/isEqual';
import globalConstants from 'common/constants';
import getLogger from 'common/log';
import parseConnectedData from '../../commonData/parseConnectedData';

import remoteIdGenerator from '../../commonData/remoteId';

const logger = getLogger('data:PLotView:parseEntryPoint');


export default function parseEntryPoint(
  domains,
  sessions,
  timelines,
  entryPoint,
  masterSessionId,
  timebarUuid,
  viewType
) {
  if (!timebarUuid) {
    logger.info('invalid entryPoint', name, 'No timebar associated with this entry point');
    return { [entryPoint.name]: { error: 'No timebar associated with this entry point' } };
  }
  const { connectedDataX, connectedDataY, name, id, stateColors } = entryPoint;
  const cdX = parseConnectedData(domains, sessions, timelines, connectedDataX, masterSessionId);

  if (cdX.error) {
    logger.info('invalid entryPoint', name, cdX.error);
    return { [name]: { error: cdX.error } };
  }

  const cdY = parseConnectedData(domains, sessions, timelines, connectedDataY, masterSessionId);

  if (cdY.error) {
    logger.info('invalid entryPoint', name, cdY.error);
    return { [name]: { error: cdY.error } };
  }
  // ignore parametric entryPoints
  if (!_isEqual(cdX.dataId, cdY.dataId)) {
    logger.info('invalid entryPoint', name, 'parametric entryPoint detected for this view');
    return { [name]: { error: 'parametric entryPoint detected for this view' } };
  }

  const remoteIdY =
    remoteIdGenerator(globalConstants.DATASTRUCTURETYPE_RANGE, cdY.dataId, cdY.filter);

  const ep = {
    [name]: {
      remoteId: remoteIdY,
      dataId: cdY.dataId,
      localId: `${cdX.field}/${cdY.field}.${timebarUuid}:${cdX.offset}/${cdY.offset}`,
      fieldX: cdX.field,
      fieldY: cdY.field,
      offset: cdY.offset,
      timebarUuid,
      filter: cdY.filter,
      structureType: globalConstants.DATASTRUCTURETYPE_RANGE,
      id,
      type: viewType,
    },
  };
  if (stateColors) {
    ep[name].stateColors = stateColors;
  }
  return ep;
}
