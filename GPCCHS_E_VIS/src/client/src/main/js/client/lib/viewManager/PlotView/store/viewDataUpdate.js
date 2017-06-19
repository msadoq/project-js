/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _last from 'lodash/last';
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';
import _concat from 'lodash/concat';
import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEmpty from 'lodash/isEmpty';
import getLogger from '../../../common/logManager';
import parameters from '../../../common/configurationManager';
import { getStateColorObj } from '../../commonData/stateColors';
import { applyFilters } from '../../commonData/applyFilters';

const logger = getLogger('data:rangeValues');

export function getExtremValue(state, epName, minOrMax, minOrMaxTime, isMin) {
  let stateMinOrMax;
  let stateMinOrMaxTime;
  // get interval to evaluate the min and max validity
  const lower = _head(state.indexes[epName]);
  const upper = _last(state.indexes[epName]);
  if (isMin) {
    // check the recorded timestamp before using it
    const stateMinTime = _get(state, ['minTime', epName]);
    if (stateMinTime && stateMinTime >= lower && stateMinTime <= upper) {
      stateMinOrMax = state.min[epName];
      stateMinOrMaxTime = stateMinTime;
    }
  } else {
    // check the recorded timestamp
    const stateMaxTime = _get(state, ['maxTime', epName]);
    if (stateMaxTime && stateMaxTime >= lower && stateMaxTime <= upper) {
      stateMinOrMax = state.max[epName];
      stateMinOrMaxTime = stateMaxTime;
    }
  }
  if (stateMinOrMax) {
    // Value needs update
    if ((isMin && stateMinOrMax >= minOrMax[epName])
    || (!isMin && stateMinOrMax <= minOrMax[epName])) {
      stateMinOrMax = minOrMax[epName];
      stateMinOrMaxTime = minOrMaxTime[epName];
    } else {
      // Else : keep old value
      return state;
    }
  } else {
    if (!state.lines[epName]) {
      if (isMin) {
        return { ...state,
          min: { ...state.min, ...minOrMax },
          minTime: { ...state.minTime, ...minOrMaxTime },
        };
      }
      return { ...state,
        max: { ...state.max, ...minOrMax },
        maxTime: { ...state.maxTime, ...minOrMaxTime },
      };
    }
    // scan old data to evaluate min value
    let extremVal = minOrMax[epName];
    let extremValTime = minOrMaxTime[epName];
    state.lines[epName].forEach((point) => {
      if (!point.value) {
        return;
      }
      if ((isMin && point.value < extremVal) || (!isMin && point.value > extremVal)) {
        extremVal = point.value;
        extremValTime = point.masterTime;
      }
    });
    // save values
    stateMinOrMax = extremVal;
    stateMinOrMaxTime = extremValTime;
  }
  if (isMin) {
    return { ...state,
      min: { ...state.min, [epName]: stateMinOrMax },
      minTime: { ...state.minTime, [epName]: stateMinOrMaxTime },
    };
  }
  return { ...state,
    max: { ...state.max, [epName]: stateMinOrMax },
    maxTime: { ...state.maxTime, [epName]: stateMinOrMaxTime },
  };
}
/** ************************************
 * Add payloads in plot view data state
 * @param: data state of current view
 * @param: data to add in state
 * @return: updated state
/* ************************************/
// eslint-disable-next-line complexity, "DV6 TBC_CNES Un-avoidable complexity without perf. leak"
export function viewRangeAdd(state = {}, payloads) {
  const epNames = Object.keys(payloads || {}); // get remoteIds
  if (!epNames.length || epNames.length < 5) {
    // no data
    return state;
  }

  let newState;
  if (_isEmpty(state)) {
    newState = { indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} };
  } else {
    newState = _cloneDeep(state);
  }
  // min and max
  if (payloads.min) {
    Object.keys(payloads.min || {}).forEach((epName) => {
      newState = getExtremValue(newState, epName, payloads.min, payloads.minTime, true);
      newState = getExtremValue(newState, epName, payloads.max, payloads.maxTime, false);
    });
  }

  let lastIndex = 0;
  let lastTime = 0;
  // newState[epName] = [{ x: value.payload[ep.fieldX], value: value.payload[ep.fieldY],
  // masterTime: time }];
  // Loop on entry point names present in payloads
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];
    if (epName === 'min' || epName === 'max' || epName === 'minTime' || epName === 'maxTime') {
      continue;
    }
    const remoteIdPayloads = payloads[epName];
    const masterTimes = Object.keys(remoteIdPayloads);
    // _each(masterTimes, (masterTime) => {
    for (let j = 0; j < masterTimes.length; j += 1) {
      const masterTime = masterTimes[j];
      // Check validity of current payload
      let currentValue = remoteIdPayloads[masterTime];
      if (!_isNumber(currentValue.value)) {
        // continue;
        if (typeof currentValue.value === 'string') {
          currentValue = {
            ...remoteIdPayloads[masterTime],
            symbol: remoteIdPayloads[masterTime].value,
            value: parameters.get('STRING_PLOT_VALUE'),
          };
        }
      }
      if (!newState.lines[epName]) {
        newState.lines[epName] = [];
        newState.indexes[epName] = [];
      }

      const timestamp = parseInt(masterTime, 10); // TODO : avoid by passing .index[] in payload
      // if new value should be pushed at end (most common case in play mode)
      if (lastIndex === -1 && timestamp > lastTime) {
        newState.lines[epName].push({ masterTime: timestamp, ...currentValue });
        newState.indexes[epName].push(timestamp);
        lastTime = timestamp;
        continue;
      }

      if (timestamp < lastTime) {
        lastIndex = 0; // fix the Object.keys() not always sorted behavior
      }
      lastTime = timestamp;

      const index = _findIndex(newState.indexes[epName], t => t >= timestamp, lastIndex);
      lastIndex = index;
      if (index === -1) {
        // add at end
        newState.lines[epName].push({ masterTime: timestamp, ...currentValue });
        newState.indexes[epName].push(timestamp);
        continue;
      }
      // timebased data update
      if (newState.indexes[epName][index] === timestamp) {
        Object.assign(newState.lines[epName][index], currentValue);
        continue;
      }
      // add at index
      newState.indexes[epName] = _concat(
        newState.indexes[epName].slice(0, index),
        timestamp,
        newState.indexes[epName].slice(index)
      );
      newState.lines[epName] = _concat(
        newState.lines[epName].slice(0, index),
        { ...currentValue, masterTime: timestamp },
        newState.lines[epName].slice(index)
      );
    }
  }
  return newState;
}
/** ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: updated state
/* ************************************/
export function selectDataPerView(currentViewMap, intervalMap, payload) {
  let epSubState = {};
  if (currentViewMap) {
    Object.keys(currentViewMap.entryPoints).forEach((epName) => {
      const ep = currentViewMap.entryPoints[epName];
      // No payload for this remote Id
      if (!payload[ep.remoteId]) {
        return;
      }
      const newSubState = selectEpData(payload[ep.remoteId], ep, epName, epSubState, intervalMap);
      epSubState = { ...epSubState, ...newSubState };
    });
  }
  return epSubState;
}
/** ************************************
 * Select payload to add for current entry Point
 * @param: payload of current entry point
 * @param: entry point definition
 * @param: entry point name
 * @param: sub state of current view
 * @param: intervals for all entry Points
 * @return: updated state
/* ************************************/
export function selectEpData(remoteIdPayload, ep, epName, viewState, intervalMap) {
  // get expected interval
  const expectedInterval = _get(intervalMap, [ep.remoteId, ep.localId, 'expectedInterval']);
  const lower = expectedInterval[0];
  const upper = expectedInterval[1];
  const newState = {};
  let min;
  let max;
  let minTime;
  let maxTime;

  const timestamps = Object.keys(remoteIdPayload);
  for (let i = 0; i < timestamps.length; i += 1) {
    const value = remoteIdPayload[timestamps[i]];
    const timestamp = _get(value, ['referenceTimestamp', 'value']);
    if (typeof timestamp === 'undefined') {
      logger.warn('get a payload without .referenceTimestamp key');
      continue;
    }
    // check value is in interval
    if (timestamp < lower || timestamp > upper) {
      continue;
    }
    // check value verify filters
    if (!applyFilters(value, ep.filters)) {
      continue;
    }

    const masterTime = timestamp + ep.offset;

    const valX = _get(value, [ep.fieldX, 'value']);
    let valY = _get(value, [ep.fieldY, 'value']);
    if (!valY) {
      const symbol = _get(value, [ep.fieldY, 'symbol']);
      // Case of long values
      if (symbol) {
        valY = Number(symbol);
      }
    }
    if (valX !== undefined && valY !== undefined) {
      const newMin = getMin(min, valY, minTime, masterTime);
      min = newMin.min;
      minTime = newMin.minTime;

      const newMax = getMax(max, valY, maxTime, masterTime);
      max = newMax.max;
      maxTime = newMax.maxTime;

      if (!newState[epName]) {
        newState[epName] = {};
      }
      newState[epName][masterTime] = {
        x: valX,
        value: valY,
        ...getStateColorObj(value, ep.stateColors, _get(value, ['monitoringState', 'value'])),
        // Case of enum : add symbol to show it in tooltip
        // Case of long : add string representation in tooltip to keep precision
        // Case of double : add string representation in tooltip to keep precision
        symbol: _get(value, [ep.fieldY, 'symbol']),
      };
    }
  }
  if (Object.keys(newState).length) {
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
  }
  return newState;
}

function getMin(lastMin, valY, lastTime, masterTime) {
  if (!lastMin || valY <= lastMin) {
    return { min: valY, minTime: masterTime };
  }
  return { min: lastMin, minTime: lastTime };
}
function getMax(lastMax, valY, lastTime, masterTime) {
  if (!lastMax || valY >= lastMax) {
    return { max: valY, maxTime: masterTime };
  }
  return { max: lastMax, maxTime: lastTime };
}
