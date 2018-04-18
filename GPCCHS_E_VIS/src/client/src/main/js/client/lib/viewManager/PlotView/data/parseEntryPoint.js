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
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : fix datamap for collapsed view add filter on mimic
//  entry point fix computation of missing last interval Add filter on tbdId computation for plot
//  view
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 1.1.2 : DM : #6835 : 12/09/2017 : PlotView parses entryPoints differently depending on
//  entryPoints being parametric or not.
// VERSION : 2.0.0 : FA : ISIS-FT-1992 : 31/10/2017 : Fix issue with custom color reloading in plot
//  view + better monitoring state generation
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 31/01/2018 : Add unit convertion for plotview
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix parseEntryPoint to take into account
//  provider field and update dc stubs
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Update unit tests and stubs for provider
//  field and fix parseEntryPoint calls in all views
// END-HISTORY
// ====================================================================

import getLogger from 'common/logManager';
import flattenDataId from 'common/flattenDataId';
import parseConnectedData from 'viewManager/commonData/parseConnectedData';
import parseConnectedDataParametric from 'viewManager/commonData/parseConnectedDataParametric';
import flattenStateColors from 'viewManager/commonData/flattenStateColors';
import _get from 'lodash/get';
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
  const provider = _get(entryPoint, 'connectedData.provider', PROVIDER_FLOW_ALL);

  if (!timebarUuid) {
    logger.info('invalid entryPoint', name, 'No timebar associated with this entry point');
    return { [entryPoint.name]: { error: 'No timebar associated with this entry point' } };
  }

  if (entryPoint.parametric) {
    const { connectedData, connectedDataParametric, name, id, stateColors } = entryPoint;
    if (!connectedDataParametric.formulaX) {
      logger.info('invalid entryPoint', name, 'No formula X');
      return { [name]: { error: 'No formula X' } };
    }
    if (!connectedDataParametric.formulaY) {
      logger.info('invalid entryPoint', name, 'No formula Y');
      return { [name]: { error: 'No formula Y' } };
    }

    const cd = parseConnectedDataParametric(
      domains,
      sessions,
      timelines,
      connectedData,
      connectedDataParametric,
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

    const tbdIdX = flattenDataId(cd.dataId.x, cd.filters);
    const tbdIdY = flattenDataId(cd.dataId.y, cd.filters);

    const ep = {
      [`${name}-X`]: {
        parametric: true,
        tbdId: tbdIdX,
        dataId: cd.dataId.x,
        localId: `${cd.dataId.x.field}.${timebarUuid}:${cd.offset}`,
        offset: cd.offset,
        timebarUuid,
        filters: cd.filters,
        id,
        type: viewType,
        ...(stateColors ? { stateColors } : {}),
      },
      [`${name}-Y`]: {
        parametric: true,
        tbdId: tbdIdY,
        dataId: cd.dataId.y,
        localId: `${cd.dataId.y.field}.${timebarUuid}:${cd.offset}`,
        offset: cd.offset,
        timebarUuid,
        filters: cd.filters,
        id,
        type: viewType,
        ...(stateColors ? { stateColors } : {}),
      },
    };

    return ep;
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
    // ignore parametric entryPoints
  if (cd.dataId.field === connectedData.fieldX) {
    logger.info('invalid entryPoint', name, 'parametric entryPoint detected for this view');
    return { [name]: { error: 'parametric entryPoint detected for this view' } };
  }

  const tbdId = flattenDataId(cd.dataId, cd.filters);
  let localId = `${connectedData.fieldX}/${cd.field}.${timebarUuid}:${cd.offset}${flattenStateColors(entryPoint.stateColors)}`;
  if (cd.convert && cd.convert.from && cd.convert.to) {
    localId = `${localId}#${cd.convert.from}#${cd.convert.to}`;
  }
  const ep = {
    [name]: {
      tbdId,
      dataId: cd.dataId,
      localId,
      fieldX: connectedData.fieldX,
      fieldY: cd.field,
      offset: cd.offset,
      timebarUuid,
      filters: cd.filters,
      id,
      type: viewType,
      convertFrom: cd.convert.from,
      convertTo: cd.convert.to,
    },
  };

  if (stateColors) {
    ep[name].stateColors = stateColors;
  }

  return ep;
}
