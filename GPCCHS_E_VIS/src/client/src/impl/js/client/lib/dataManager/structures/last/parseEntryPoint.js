import globalConstants from 'common/constants';
import parseConnectedData from '../common/parseConnectedData';

export default function parseEntryPoint(
  entryPoint,
  timebarUuid,
  timelines,
  viewMasterTimeline,
  visuWindow,
  domains
) {
  const cd = parseConnectedData(
    entryPoint.connectedData,
    globalConstants.DATASTRUCTURETYPE_LAST,
    timebarUuid,
    viewMasterTimeline,
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
