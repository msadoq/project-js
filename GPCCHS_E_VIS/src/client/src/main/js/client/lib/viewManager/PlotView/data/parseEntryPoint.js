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

  const { connectedData, name, id, stateColors } = entryPoint;
  if (!connectedData.fieldX) {
    logger.info('invalid entryPoint', name, 'No field X');
    return { [name]: { error: 'No field X' } };
  }

  const cd = parseConnectedData(domains, sessions, timelines, connectedData, masterSessionId);
  if (cd.error) {
    logger.info('invalid entryPoint', name, cd.error);
    return { [name]: { error: cd.error } };
  }
  // ignore parametric entryPoints
  if (cd.dataId.field === connectedData.fieldX) {
    logger.info('invalid entryPoint', name, 'parametric entryPoint detected for this view');
    return { [name]: { error: 'parametric entryPoint detected for this view' } };
  }

  const remoteIdY =
    remoteIdGenerator(globalConstants.DATASTRUCTURETYPE_RANGE, cd.dataId, cd.filter);

  const ep = {
    [name]: {
      remoteId: remoteIdY,
      dataId: cd.dataId,
      localId: `${connectedData.fieldX}/${cd.field}.${timebarUuid}:${cd.offset}`,
      fieldX: connectedData.fieldX,
      fieldY: cd.field,
      offset: cd.offset,
      timebarUuid,
      filter: cd.filter,
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
