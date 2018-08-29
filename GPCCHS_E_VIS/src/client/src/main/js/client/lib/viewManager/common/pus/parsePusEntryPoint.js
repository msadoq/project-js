import getLogger from 'common/logManager';
import flattenDataId from 'common/flattenDataId';
import flattenStateColors from 'viewManager/commonData/flattenStateColors';
import parseConnectedDataPus from 'viewManager/commonData/parseConnectedDataPus';
import _getOr from 'lodash/fp/getOr';
import { PUS_ALL_APIDS } from 'constants';

export default function parsePusEntryPoint({
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
  workspaceSessionName,
  allApids,
  pusType,
}) {
  const logger = getLogger(`data:${pusType}:parsePusEntryPoint`);
  const { connectedData, name, stateColors, id } = entryPoint;

  if (!timebarUuid) {
    logger.info('invalid entryPoint', name, 'No timebar associated with this entry point');
    return { [entryPoint.name]: { error: 'No timebar associated with this entry point' } };
  }

  const cd = parseConnectedDataPus(
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

  const { dataId, offset } = cd;

  // compute tbdId = flat DataId + filters
  const tbdId = flattenDataId(dataId, cd.filters, cd.mode);
  const ep = {
    [name]: {
      id,
      tbdId,
      dataId,
      localId: `.${timebarUuid}:${offset}${flattenStateColors(entryPoint.stateColors)}`,
      offset,
      timebarUuid,
      type: viewType,
      apids: allApids
        ? [{ apidName: 'ALLAPIDS', apidRawValue: PUS_ALL_APIDS }] // for pusMME & pus140
        : _getOr([], 'apids', connectedData)
      ,
    },
  };
  if (stateColors) {
    ep[name].stateColors = stateColors;
  }
  return ep;
}
