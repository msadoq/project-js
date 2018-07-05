import getLogger from 'common/logManager';
import flattenDataId from 'common/flattenDataId';
import flattenStateColors from 'viewManager/commonData/flattenStateColors';
import parseConnectedData from '../../commonData/parseConnectedData';

const logger = getLogger('data:PUS05View:parseEntryPoint');

export default function parseEntryPoint(
  domains,
  sessions,
  timelines,
  entryPoint,
  masterTimelineSession,
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

  const { connectedData, name, stateColors, id } = entryPoint;

  const cd = parseConnectedData(
    domains,
    sessions,
    timelines,
    connectedData,
    masterTimelineSession,
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
  const tbdId = flattenDataId(dataId, cd.filters, cd.mode);

  const ep = {
    [name]: {
      id,
      tbdId,
      dataId,
      localId: `${field}.${timebarUuid}:${offset}${flattenStateColors(entryPoint.stateColors)}`,
      offset,
      timebarUuid,
      filters: cd.filters,
      mode: cd.mode,
      type: viewType,
      apidName: connectedData.apidName || null,
      apidRawValue: connectedData.apidRawValue || null,
    },
  };
  if (stateColors) {
    ep[name].stateColors = stateColors;
  }
  return ep;
}
