import _each from 'lodash/each';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _has from 'lodash/has';

import globalConstants from 'common/constants';
import getLogger from 'common/log';

const logger = getLogger('data:rangeValues');

export function select(remoteIdPayload, ep, epName, viewState) {
  const lower = ep.expectedInterval[0];
  const upper = ep.expectedInterval[1];
  const newState = {};

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
      if (viewState && viewState[masterTime]) {
        newState[masterTime] = viewState[masterTime];
        newState[masterTime][epName] = {
          x: valX,
          value: valY,
          monit: _get(value, ['monitoringState', 'value']),
          // Case of enum : add symbol to show it in tooltip
          symbol: _get(value, [ep.fieldY, 'symbol']),
        };
      } else {
        _set(newState, [masterTime, epName], {
          x: valX,
          value: valY,
          monit: _get(value, ['monitoringState', 'value']),
          // Case of enum : add symbol to show it in tooltip
          symbol: _get(value, [ep.fieldY, 'symbol']),
        });
      }
    }
  });
  return newState;
}

export default function extractValues(
  state,
  payload,
  viewId,
  entryPoints,
  viewType
) {
  let isFirstEp = true;
  // Get current state for update
  const epSubState = {};
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
      viewData.remove = {
        lower: ep.expectedInterval[0] + ep.offset,
        upper: ep.expectedInterval[1] + ep.offset,
      };

      viewData.type = viewType;
      viewData.structureType = globalConstants.DATASTRUCTURETYPE_RANGE;
      isFirstEp = false;
    }
    Object.assign(epSubState, select(payload[ep.remoteId], ep, epName, epSubState));
  });
  if (Object.keys(epSubState).length !== 0) {
    _set(viewData, ['add'], epSubState);
  }
  return viewData;
}
