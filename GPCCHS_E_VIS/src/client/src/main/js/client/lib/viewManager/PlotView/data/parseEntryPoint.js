import getLogger from 'common/logManager';
import flattenDataId from 'common/flattenDataId';
import parseConnectedData from 'viewManager/commonData/parseConnectedData';
import parseConnectedDataParametric from 'viewManager/commonData/parseConnectedDataParametric';
import flattenStateColors from 'viewManager/commonData/flattenStateColors';

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
    // ignore parametric entryPoints
  if (cd.dataId.field === connectedData.fieldX) {
    logger.info('invalid entryPoint', name, 'parametric entryPoint detected for this view');
    return { [name]: { error: 'parametric entryPoint detected for this view' } };
  }

  const tbdId = flattenDataId(cd.dataId, cd.filters);

  const ep = {
    [name]: {
      tbdId,
      dataId: cd.dataId,
      localId: `${connectedData.fieldX}/${cd.field}.${timebarUuid}:${cd.offset}${flattenStateColors(entryPoint.stateColors)}`,
      fieldX: connectedData.fieldX,
      fieldY: cd.field,
      offset: cd.offset,
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
