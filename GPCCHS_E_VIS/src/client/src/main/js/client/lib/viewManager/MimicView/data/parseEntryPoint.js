import getLogger from 'common/logManager';
import flattenDataId from 'common/flattenDataId';
import parseConnectedData from 'viewManager/commonData/parseConnectedData';
import flattenStateColors from 'viewManager/commonData/flattenStateColors';

const logger = getLogger('data:MimicView:parseEntryPoint');

function parseEntryPoint(
  domains,
  sessions,
  timelines,
  entryPoint,
  masterSessionId,
  timebarUuid,
  viewType) {
  if (!timebarUuid) {
    logger.info('invalid entryPoint', name, 'No timebar associated with this entry point');
    return { [entryPoint.name]: { error: 'No timebar associated with this entry point' } };
  }
  const { connectedData, name, id, stateColors } = entryPoint;

  const cd = parseConnectedData(domains, sessions, timelines, connectedData, masterSessionId);
  if (cd.error) {
    logger.info('invalid entryPoint', name, cd.error);
    return { [name]: { error: cd.error } };
  }
  const { dataId, field, offset, filters } = cd;
  // compute tbdId = flat DataId + filters
  const tbdId = flattenDataId(dataId, filters);

  const ep = {
    [name]: {
      tbdId,
      dataId,
      localId: `${field}.${timebarUuid}:${offset}${flattenStateColors(entryPoint.stateColors)}`,
      field,
      offset,
      filters,
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
