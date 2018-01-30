import getLogger from '../../../common/logManager';
import flattenDataId from '../../../common/flattenDataId';
import parseConnectedData from '../../commonData/parseConnectedData';
import flattenStateColors from '../../commonData/flattenStateColors';

const logger = getLogger('data:TextView:parseEntryPoint');

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

  // rq: parseConnectedData move filter to filters
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
  const { dataId, field, offset, filters, convert } = cd;
  // compute tbdId with filters to use them with getLast
  const tbdId = flattenDataId(dataId, filters);
  let localId = `${field}.${timebarUuid}:${offset}${flattenStateColors(entryPoint.stateColors)}`;
  if (convert && convert.from && convert.to) {
    localId = `${localId}#${convert.from}#${convert.to}`;
  }
  const ep = {
    [name]: {
      tbdId,
      dataId,
      localId,
      field,
      offset,
      filters,
      timebarUuid,
      id,
      type: viewType,
      convertFrom: convert.from,
      convertTo: convert.to,
    },
  };
  if (stateColors) {
    ep[name].stateColors = stateColors;
  }
  return ep;
}
module.exports = parseEntryPoint;
