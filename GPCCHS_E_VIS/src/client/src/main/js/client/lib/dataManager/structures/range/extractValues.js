import _each from 'lodash/each';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _has from 'lodash/has';

import globalConstants from 'common/constants';
import getLogger from 'common/log';

import { getStateColorObj } from '../common/stateColors';

const logger = getLogger('data:rangeValues');

export function select(remoteIdPayload, ep, epName, viewState, intervalMap) {
  // get expected interval
  const expectedInterval = _get(intervalMap, [ep.remoteId, ep.localId, 'expectedInterval']);

  const lower = expectedInterval[0];
  const upper = expectedInterval[1];
  const newState = {};
  let min;
  let max;
  let minTime;
  let maxTime;

  _each(remoteIdPayload, (value) => {
    const timestamp = _get(value, ['referenceTimestamp', 'value']);
    if (typeof timestamp === 'undefined') {
      logger.warn('get a payload without .referenceTimestamp key');
      return;
    }

    // check value is in interval
    if (timestamp < lower || timestamp > upper) {
      return;
    }
    const masterTime = timestamp + ep.offset;

    const valX = _get(value, [ep.fieldX, 'value']);
    const valY = _get(value, [ep.fieldY, 'value']);
    if (valX !== undefined && valY !== undefined) {
      if (!min || valY <= min) {
        min = valY;
        minTime = masterTime;
      }
      if (!max || valY >= max) {
        max = valY;
        maxTime = masterTime;
      }
      if (viewState && viewState[masterTime]) {
        newState[masterTime] = viewState[masterTime];
        newState[masterTime][epName] = {
          x: valX,
          value: valY,
          ...getStateColorObj(value, ep.stateColors, _get(value, ['monitoringState', 'value'])),
          // Case of enum : add symbol to show it in tooltip
          symbol: _get(value, [ep.fieldY, 'symbol']),
        };
      } else {
        _set(newState, [masterTime, epName], {
          x: valX,
          value: valY,
          ...getStateColorObj(value, ep.stateColors, _get(value, ['monitoringState', 'value'])),
          // Case of enum : add symbol to show it in tooltip
          symbol: _get(value, [ep.fieldY, 'symbol']),
        });
      }
    }
  });
  if (!Object.keys(newState).length) {
    return {};
  }
  if (viewState) {
    newState.min = { ...viewState.min, [epName]: min };
    newState.max = { ...viewState.max, [epName]: max };
    newState.minTime = { ...viewState.minTime, [epName]: minTime };
    newState.maxTime = { ...viewState.maxTime, [epName]: maxTime };
  } else {
    newState.min = { [epName]: min };
    newState.max = { [epName]: max };
    newState.minTime = { [epName]: minTime };
    newState.maxTime = { [epName]: maxTime };
  }
  return newState;
}

export default function extractValues(
  state,
  intervalMap,
  payload,
  viewId,
  entryPoints,
  viewType
) {
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
      // get expected interval
      const expectedInterval = _get(intervalMap, [ep.remoteId, ep.localId, 'expectedInterval']);
      // master's timestamp (arbitrary determined from the first entryPoint)
      viewData.remove = {
        lower: expectedInterval[0] + ep.offset,
        upper: expectedInterval[1] + ep.offset,
      };

      viewData.type = viewType;
      viewData.structureType = globalConstants.DATASTRUCTURETYPE_RANGE;
      isFirstEp = false;
    }
    const newSubState = select(payload[ep.remoteId], ep, epName, epSubState, intervalMap);
    epSubState = {
      ...epSubState,
      ...newSubState,
    };
  });
  if (Object.keys(epSubState).length !== 0) {
    _set(viewData, ['add'], epSubState);
  }
  return viewData;
}
