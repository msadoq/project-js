import globalConstants from 'common/constants';
import parseConnectedData from '../common/parseConnectedData';

export default function parseEntryPoint(
  entryPoint,
  timebarId,
  timelines,
  viewMasterTimeline,
  visuWindow,
  domains
) {
  const cd = parseConnectedData(
    entryPoint.connectedData,
    globalConstants.DATASTRUCTURETYPE_LAST,
    timebarId,
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
  cd.localId = `${field}.${timebarId}:${offset}`;

  // inViewMap
  cd.inViewMap = { remoteId, field, expectedInterval };

  return cd;
}
