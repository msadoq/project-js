import _each from 'lodash/each';
import _set from 'lodash/set';
import _has from 'lodash/has';

import globalConstants from 'common/constants';
import debug from '../../../common/debug/mainDebug';

const logger = debug('data:rangeValues');

export function select(remoteIdPayload, ep, epName, viewState, count) {
  const lower = ep.expectedInterval[0];
  const upper = ep.expectedInterval[1];
  const newState = {};

  _each(remoteIdPayload, (value) => {
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
        { x: value[ep.fieldX], value: value[ep.fieldY] }; // TODO #12
    } else {
      _set(newState, [masterTime, epName],
        { x: value[ep.fieldX], value: value[ep.fieldY] }); // TODO #12
    }

    count.range += 1; // eslint-disable-line no-param-reassign
  });
  return newState;
}

export default function rangeValues(payload, entryPoints, count) {
  let isFirstEp = true;
  // Get current state for update
  let epSubState = {};
  let viewData;

  _each(entryPoints, (ep, epName) => {
    // No payload for this remote Id
    if (!_has(payload, ep.remoteId)) {
      return;
    }
    if (isFirstEp) {
      if (!viewData) {
        viewData = {};
      }
      // master's timestamp (arbitrary determined from the first entryPoint)
      _set(viewData, ['remove'], {
        lower: ep.expectedInterval[0] + ep.offset,
        upper: ep.expectedInterval[1] + ep.offset });
      _set(viewData, ['structureType'], globalConstants.DATASTRUCTURETYPE_RANGE);
      isFirstEp = false;
    }

    epSubState = select(payload[ep.remoteId], ep, epName, epSubState, count);
  });
  if (Object.keys(epSubState).length !== 0) {
    _set(viewData, ['add'], epSubState);
  }
  return viewData;
}
