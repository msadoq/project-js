 // ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix imports . . .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Update unit tests and stubs for provider
//  field and fix parseEntryPoint calls in all views
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : fix master timeline sessionID passed to DC when
//  entrypoint's timeline is *
// END-HISTORY
// ====================================================================

import getLogger from 'common/logManager';
import _get from 'lodash/get';

import flattenDataId from 'common/flattenDataId';
import parseConnectedData from 'viewManager/commonData/parseConnectedData';
import flattenStateColors from 'viewManager/commonData/flattenStateColors';

import { PROVIDER_FLOW_ALL } from '../../../constants';

const logger = getLogger('data:PLotView:parseEntryPoint');

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

  const { connectedData, name, id, stateColors } = entryPoint;
  const provider = _get(entryPoint, 'connectedData.provider', PROVIDER_FLOW_ALL);

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
    workspaceSessionName,
    provider
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
