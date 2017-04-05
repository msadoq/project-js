/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _get from 'lodash/get';
import getLogger from 'common/log';
import { getStateColorObj } from '../../commonData/stateColors';
import { convertData } from '../../commonData/longData';

const logger = getLogger('data:lastValue');

/** ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: updated state
/* ************************************/
export function selectDataPerView(currentViewMap, intervalMap, payload, viewSubState) {
  let epSubState = {};
  if (!currentViewMap) {
    return epSubState;
  }
  const epNames = Object.keys(currentViewMap.entryPoints);
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];
    const ep = currentViewMap.entryPoints[epName];
    // Entry points on this remoteId
    const { remoteId, localId } = ep;
    const remoteIdPayload = payload[remoteId];
    if (!remoteIdPayload) {
      continue;
    }
    const expectedInterval = _get(intervalMap, [remoteId, localId, 'expectedInterval']);
    const lower = expectedInterval[0];
    const current = expectedInterval[1];

    // previous time recorded
    let previousTime = 0;
    if (viewSubState && viewSubState.index[epName]) {
      if (viewSubState.index[epName] < current) {
        previousTime = viewSubState.index[epName];
      }
    }
    let newValue;
    // search over payloads
    const timestamps = Object.keys(remoteIdPayload);
    for (let j = 0; j < timestamps.length; j += 1) {
      const p = remoteIdPayload[timestamps[j]];
      const timestamp = _get(p, ['referenceTimestamp', 'value']);
      if (typeof timestamp === 'undefined') {
        logger.warn('get a payload without .referenceTimestamp key');
        continue;
      }
      if (timestamp < lower || timestamp > current) {
        continue;
      }
      // invalid or missing field
      if (!p[ep.field]) {
        continue;
      }
      if (timestamp >= previousTime) {
        // Long conversion
        newValue = {
          timestamp,
          value: {
            value: convertData(p[ep.field]),
            ...getStateColorObj(p, ep.stateColors, _get(p, ['monitoringState', 'value'])),
          },
        };
        previousTime = timestamp;
      }
    }
    if (newValue) {
      epSubState = {
        index: { ...epSubState.index, [epName]: newValue.timestamp },
        values: { ...epSubState.values, [epName]: newValue.value },
      };
    }
  }
  return epSubState;
}

export function viewDataUpdate(viewDataState, payload) {
  if (!payload || !payload.values || !Object.keys(payload.values).length) {
    return viewDataState;
  }
  return {
    index: { ...viewDataState.index, ...payload.index },
    values: { ...viewDataState.values, ...payload.values },
  };
}
