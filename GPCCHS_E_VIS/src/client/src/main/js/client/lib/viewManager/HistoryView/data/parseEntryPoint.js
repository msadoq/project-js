import _isEqual from 'lodash/isEqual';
import globalConstants from '../../../constants';
import getLogger from '../../../common/logManager';
const flattenDataId = require('../../../common/flattenDataId');
import parseConnectedData from '../../commonData/parseConnectedData';
import flattenStateColors from '../../commonData/flattenStateColors';

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

  // field = undefined
  const { dataId, field, offset } = cd;
  // compute tbdId = flat DataId + filters
  const tbdId = flattenDataId(dataId, cd.filters);

  const ep = {
    [name]: {
      tbdId,
      dataId,
      localId: `${field}.${timebarUuid}:${offset}${flattenStateColors(entryPoint.stateColors)}`,
      offset,
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
