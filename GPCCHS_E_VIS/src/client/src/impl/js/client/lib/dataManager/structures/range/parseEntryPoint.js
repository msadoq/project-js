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

  const { remoteId, field, expectedInterval, offset } = cdX;
  cdX.inViewMap = {
    remoteId,
    fieldX: field,
    fieldY: cdY.field,
    expectedInterval,
    offset,
  };

  return cdX;
}
