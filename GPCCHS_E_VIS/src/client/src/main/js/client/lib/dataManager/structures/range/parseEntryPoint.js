import globalConstants from 'common/constants';
import parseConnectedData from '../common/parseConnectedData';
import getExpectedInterval from './getExpectedInterval';

export default function parseEntryPoint(
  entryPoint,
  timebarUuid,
  timelines,
  masterSessionId,
  visuWindow,
  domains
) {
  const cdX = parseConnectedData(
    entryPoint.connectedDataX,
    globalConstants.DATASTRUCTURETYPE_RANGE,
    timebarUuid,
    masterSessionId,
    visuWindow,
    timelines,
    domains,
    getExpectedInterval
  );
  if (cdX.error) {
    return cdX;
  }

  const cdY = parseConnectedData(
    entryPoint.connectedDataY,
    globalConstants.DATASTRUCTURETYPE_RANGE,
    timebarUuid,
    masterSessionId,
    visuWindow,
    timelines,
    domains,
    getExpectedInterval
  );
  if (cdY.error) {
    return cdY;
  }

  // ignore parametric entryPoints
  // split remoteId to omit filter definitions
  const splitY = cdY.remoteId.split(':', 3);
  const splitX = cdX.remoteId.split(':', 3);

  if (splitX[0] !== splitY[0] || splitX[1] !== splitY[1] || splitX[2] !== splitY[2]
    || cdX.offset !== cdY.offset) {
    return { error: 'parametric entryPoint detected for this view' };
  }
  const { remoteId, field, expectedInterval, offset } = cdY;

  // localId
  cdY.localId = `${cdX.field}/${field}.${timebarUuid}:${cdX.offset}/${offset}`;

  // inViewMap
  cdY.inViewMap = {
    remoteId,
    fieldX: cdX.field,
    fieldY: field,
    expectedInterval,
    offset,
  };

  return cdY;
}
