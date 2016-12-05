import globalConstants from 'common/constants';
import parseConnectedData from '../parseConnectedData';

export default function parseEntryPoint(
  entryPoint,
  timebarId,
  timelines,
  viewMasterTimeline,
  visuWindow,
  domains
) {
  const cdX = parseConnectedData(
    entryPoint.connectedDataX,
    globalConstants.DATASTRUCTURETYPE_RANGE,
    timebarId,
    viewMasterTimeline,
    visuWindow,
    timelines,
    domains
  );
  if (cdX.error) {
    return cdX;
  }

  const cdY = parseConnectedData(
    entryPoint.connectedDataY,
    globalConstants.DATASTRUCTURETYPE_RANGE,
    timebarId,
    viewMasterTimeline,
    visuWindow,
    timelines,
    domains
  );
  if (cdY.error) {
    return cdY;
  }

  // ignore parametric entryPoints
  if (cdX.remoteId !== cdY.remoteId || cdX.offset !== cdY.offset) {
    return { error: 'parametric entryPoint detected for this view' };
  }

  // TODO: for the moment, the modification might be on the Y field. should be updated to take
  // care of all modification (localId defined by view structure type)
  const { remoteId, field, expectedInterval, offset } = cdY;
  cdY.inViewMap = {
    remoteId,
    fieldX: cdX.field,
    fieldY: field,
    expectedInterval,
    offset,
  };

  return cdY;
}
