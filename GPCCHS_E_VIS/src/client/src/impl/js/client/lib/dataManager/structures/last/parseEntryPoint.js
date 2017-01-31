import globalConstants from 'common/constants';
import parseConnectedData from '../common/parseConnectedData';

export default function parseEntryPoint(
  entryPoint,
  timebarUuid,
  timelines,
  masterSessionId,
  visuWindow,
  domains
) {
  const cd = parseConnectedData(
    entryPoint.connectedData,
    globalConstants.DATASTRUCTURETYPE_LAST,
    timebarUuid,
    masterSessionId,
    visuWindow,
    timelines,
    domains
  );
  if (cd.error) {
    return cd;
  }

  const { remoteId, field, offset, expectedInterval } = cd;

  // localId
  cd.localId = `${field}.${timebarUuid}:${offset}`;

  // inViewMap
  cd.inViewMap = { remoteId, field, expectedInterval };

  return cd;
}
