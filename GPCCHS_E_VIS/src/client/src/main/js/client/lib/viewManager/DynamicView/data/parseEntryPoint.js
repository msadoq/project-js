import __ from 'lodash/fp';

import globalConstants from '../../../constants';
import getLogger from 'common/log';
const flattenDataId = require('../../../common/flattenDataId');
import parseConnectedData from '../../commonData/parseConnectedData';

const logger = getLogger('data:DynamicView:parseEntryPoint');
function flattenStateColors(stateColors = []) {
  if (!stateColors.length) {
    return '';
  }

  return __.compose(
    str => `:${str}`,
    __.join(','),
    __.sortBy(__.identity),
    __.map(({ color, condition: { field, operator, operand } }) => `${color}.${field}.${operator}.${operand}`)
  )(stateColors);
}

function parseEntryPoint(
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
  const { dataId, field, offset } = cd;
  // compute remoteId
  const remoteId = flattenDataId(dataId);

  const ep = {
    [name]: {
      remoteId,
      dataId,
      localId: `${field}.${timebarUuid}:${offset}${flattenStateColors(entryPoint.stateColors)}`,
      offset,
      timebarUuid,
      id,
      type: viewType,
    },
  };
  if (stateColors) {
    ep[name].stateColors = stateColors;
  }
  return ep;
}
module.exports = parseEntryPoint;
