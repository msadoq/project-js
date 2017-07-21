import _isEqual from 'lodash/isEqual';
import globalConstants from '../../../constants';
import getLogger from '../../../common/logManager';
const flattenDataId = require('../../../common/flattenDataId');
import parseConnectedData from '../../commonData/parseConnectedData';

const logger = getLogger('data:PLotView:parseEntryPoint');

export default function parseEntryPoint(
  domains,
  sessions,
  timelines,
  entryPoint,
  masterSessionId,
  timebarUuid,
  viewType,
  viewDomain,
  pageDomain,
  workspaceDomain,
  viewSessionName,
  pageSessionName,
  workspaceSessionName
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

  const cd = parseConnectedData(
    domains,
    sessions,
    timelines,
    connectedData,
    masterSessionId,
    viewDomain,
    pageDomain,
    workspaceDomain,
    viewSessionName,
    pageSessionName,
    workspaceSessionName
  );
  if (cd.error) {
    logger.info('invalid entryPoint', name, cd.error);
    return { [name]: { error: cd.error } };
  }
  // ignore parametric entryPoints
  if (cd.dataId.field === connectedData.fieldX) {
    logger.info('invalid entryPoint', name, 'parametric entryPoint detected for this view');
    return { [name]: { error: 'parametric entryPoint detected for this view' } };
  }

  const remoteId = flattenDataId(cd.dataId);

  const ep = {
    [name]: {
      remoteId,
      tbdId: remoteId,
      dataId: cd.dataId,
      localId: `${connectedData.fieldX}/${cd.field}.${timebarUuid}:${cd.offset}`,
      fieldX: connectedData.fieldX,
      fieldY: cd.field,
      offset: cd.offset,
      timebarUuid,
      filters: cd.filters,
      id,
      type: viewType,
    },
  };

  if (stateColors) {
    ep[name].stateColors = stateColors;
  }
  return ep;
}
