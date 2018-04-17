// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : DataMap simplification : removing structureType and
//  filters in server
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix imports . . .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Update unit tests and stubs for provider
//  field and fix parseEntryPoint calls in all views
// END-HISTORY
// ====================================================================

import getLogger from 'common/logManager';
import _get from 'lodash/get';

import flattenDataId from 'common/flattenDataId';
import parseConnectedData from 'viewManager/commonData/parseConnectedData';
import flattenStateColors from 'viewManager/commonData/flattenStateColors';

import { PROVIDER_FLOW_ALL } from '../../../constants';

const logger = getLogger('data:DynamicView:parseEntryPoint');

function parseEntryPoint(
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
  const { dataId, field, offset } = cd;
  // compute tbdId = flat DataId + filters
  const tbdId = flattenDataId(dataId);

  const ep = {
    [name]: {
      tbdId,
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
