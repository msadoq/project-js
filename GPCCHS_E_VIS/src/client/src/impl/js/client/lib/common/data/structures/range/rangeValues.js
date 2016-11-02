import { each, set, has } from 'lodash';
import debug from '../../../debug/mainDebug';
import { constants as globalConstants } from 'common';

const logger = debug('data:rangeValues');

export function rangeValues(remoteIdPayload, ep, epName, viewState) {
  const lower = ep.expectedInterval[0];
  const upper = ep.expectedInterval[1];
  const newState = {};

  each(remoteIdPayload, (value) => {
    const timestamp = value.referenceTimestamp;
    if (typeof timestamp === 'undefined') {
      return logger.warn('get a payload without .referenceTimestamp key');
    }

    // check value is in interval
    if (timestamp < lower || timestamp > upper) {
      return;
    }
    const masterTime = timestamp + ep.offset;
    if (viewState && viewState[masterTime]) {
      newState[masterTime] = viewState[masterTime];
      newState[masterTime][epName] =
        { x: value[ep.fieldX], value: value[ep.fieldY] };
    } else {
      set(newState, [masterTime, epName],
        { x: value[ep.fieldX], value: value[ep.fieldY] });
    }
  });
  return newState;
}

export default function selectRangeValues(payload, entryPoints) {
  let isFirstEp = true;
  // Get current state for update
  let epSubState = {};
  let viewData;

  each(entryPoints, (ep, epName) => {
    // No payload for this remote Id
    if (!has(payload, ep.remoteId)) {
      return;
    }
    if (isFirstEp) {
      if (!viewData) {
        viewData = {};
      }
      // master's timestamp (arbitrary determined from the first entryPoint)
      set(viewData, ['remove'], {
        lower: ep.expectedInterval[0] + ep.offset,
        upper: ep.expectedInterval[1] + ep.offset });
      set(viewData, ['structureType'], globalConstants.DATASTRUCTURETYPE_RANGE);
      isFirstEp = false;
    }

    epSubState = rangeValues(payload[ep.remoteId], ep, epName, epSubState);
  });
  if (Object.keys(epSubState).length !== 0) {
    set(viewData, ['add'], epSubState);
  }
  return viewData;
}
