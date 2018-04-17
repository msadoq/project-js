// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Separate expectedIntervalsMap by structure type in
//  dataMap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 31/01/2018 : Add mimic view compatibility with convertion
//  unit mechanism
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

const logger = getLogger('data:MimicView:parseEntryPoint');

function parseEntryPoint(
  domains,
  sessions,
  timelines,
  entryPoint,
  masterTimelineSession,
  timebarUuid,
  viewType) {
  if (!timebarUuid) {
    logger.info('invalid entryPoint', name, 'No timebar associated with this entry point');
    return { [entryPoint.name]: { error: 'No timebar associated with this entry point' } };
  }
  const { connectedData, name, id, stateColors } = entryPoint;
  const provider = _get(entryPoint, 'connectedData.provider', PROVIDER_FLOW_ALL);

  const cd =
    parseConnectedData(
      domains,
      sessions,
      timelines,
      connectedData,
      masterTimelineSession,
      null,
      null,
      null,
      null,
      null,
      null,
      provider
    );

  if (cd.error) {
    logger.info('invalid entryPoint', name, cd.error);
    return { [name]: { error: cd.error } };
  }
  const { dataId, field, offset, filters, convert } = cd;
  // compute tbdId = flat DataId + filters
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
