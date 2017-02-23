import __ from 'lodash/fp';

import globalConstants from 'common/constants';
import parseConnectedData from '../common/parseConnectedData';
import getExpectedInterval from './getExpectedInterval';

function flattenStateColors(stateColors = []) {
  if (!stateColors.length) {
    return '';
  }

  return __.compose(
    str => `:${str}`,
    __.join(','),
    __.sortBy(__.identity),
    __.map(({ color, condition: { field, operator, operand } }) => `${color}.${field}.${operator}.${operand}`)
  )(stateColors);
}

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
    domains,
    getExpectedInterval
  );
  if (cd.error) {
    return cd;
  }

  const { remoteId, field, offset, expectedInterval } = cd;

  // localId
  cd.localId = `${field}.${timebarUuid}:${offset}${flattenStateColors(entryPoint.stateColors)}`;

  // inViewMap
  cd.inViewMap = { remoteId, field, expectedInterval };

  return cd;
}
