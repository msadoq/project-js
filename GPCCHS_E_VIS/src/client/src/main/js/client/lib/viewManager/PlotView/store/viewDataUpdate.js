// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure +
//  cleaning
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : PlotView : plots string value
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Remove viewManager utils folder .
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and
//  un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 21/04/2017 : Fix long data recovery for plot view
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Merge branch 'dev' into simplify_datamap
// VERSION : 1.1.2 : FA : ISIS-FT-1952 : 16/05/2017 : Apply filters considering data type
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters :
//  - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix -
//  Lint pass ( 1 test is still KO)
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to
//  limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 02/08/2017 : Update unit tests for Plot View store
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console
//  and spaced-comment.
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : fix plot view data order
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : FA : #7776 : 13/09/2017 : Fix plot drawing when timeline has offset
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json
//  patch
// VERSION : 2.0.0 : DM : #6835 : 29/09/2017 : Update of parametric view Data
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Remove monitoring state colors mecanism + add
//  defult values for state colors + update unit tests + fix issue when removing a state color +
//  fix css code style
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 31/01/2018 : Add unit convertion for plotview
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : fix display in every view
// END-HISTORY
// ====================================================================

/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _last from 'lodash/last';
import _head from 'lodash/head';
import _cloneDeep from 'lodash/cloneDeep';
import _concat from 'lodash/concat';
import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import _forEach from 'lodash/forEach';
import { applyFilters } from 'viewManager/commonData/applyFilters';
import _isEmpty from 'lodash/isEmpty';
import getLogger from 'common/logManager';
import parameters from 'common/configurationManager';
import { getStateColorObj } from 'viewManager/commonData/stateColors';
import _findIndex from 'lodash/findIndex';
import { STATE_COLOR_NOMINAL } from 'windowProcess/common/colors';
import { getFlattenDataIdForObsoleteEvent } from 'common/flattenDataId';
import { isRangeDataObsolete, rangesNeedUpdateForObsolete } from 'viewManager/common/store/viewDataUpdate';
import { getOrCreate } from 'serverProcess/utils/stringToIntegerMapSingleton';

const logger = getLogger('data:rangeValues:PlotView');

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
        return {
          ...state,
          min: { ...state.min, ...minOrMax },
          minTime: { ...state.minTime, ...minOrMaxTime },
        };
      }
      return {
        ...state,
        max: { ...state.max, ...minOrMax },
        maxTime: { ...state.maxTime, ...minOrMaxTime },
      };
    }
    // scan old data to evaluate min value
    let extremVal = minOrMax[epName];
    let extremValTime = minOrMaxTime[epName];
    const timestamps = Object.keys(state.lines[epName]);
    for (let i = 0; i < timestamps.length; i += 1) {
      const point = state.lines[epName][timestamps[i]];
      if (point.value
        && ((isMin && point.value < extremVal) || (!isMin && point.value > extremVal))) {
        extremVal = point.value;
        extremValTime = point.masterTime;
      }
    }
    // save values
    stateMinOrMax = extremVal;
    stateMinOrMaxTime = extremValTime;
  }
  if (isMin) {
    return {
      ...state,
      min: { ...state.min, [epName]: stateMinOrMax },
      minTime: { ...state.minTime, [epName]: stateMinOrMaxTime },
    };
  }
  return {
    ...state,
    max: { ...state.max, [epName]: stateMinOrMax },
    maxTime: { ...state.maxTime, [epName]: stateMinOrMaxTime },
  };
}

/* ************************************
 * Add payloads in plot view data state
 * @param: data state of current view
 * @param: data to add in state
 * @return: updated state
/* *********************************** */

// eslint-disable-next-line complexity, "DV6 TBC_CNES Un-avoidable complexity without perf. leak"
export function viewRangeAdd(state = {}, payloads) {
  const epNames = Object.keys(payloads || {}); // get tbdIds
  if (!epNames.length || epNames.length < 5) { // at least { min:{}, max:{}, minTime:{}, maxTime:{}}
    // no data
    return state;
  }

  let newState;
  if (_isEmpty(state)) {
    newState = {
      indexes: {},
      lines: {},
      min: {},
      max: {},
      minTime: {},
      maxTime: {},
      obsoleteEvents: {},
    };
  } else {
    newState = _cloneDeep(state);
  }

  const obsoleteEvents = newState.obsoleteEvents || {};

  // min and max
  if (payloads.min) {
    Object.keys(payloads.min || {})
      .forEach((epName) => {
        newState = getExtremValue(newState, epName, payloads.min, payloads.minTime, true);
        newState = getExtremValue(newState, epName, payloads.max, payloads.maxTime, false);
      });
  }
  // newState[epName][masterTime] = { x: value.payload[ep.fieldX], value: value.payload[ep.fieldY],
  // masterTime: time };
  // Loop on entry point names present in payloads
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];
    if (epName === 'min' || epName === 'max' || epName === 'minTime' || epName === 'maxTime') {
      continue;
    }
    let lastIndex = 0;
    let lastTime = 0;
    let lastObsoleteEventIndex = 0;
    const tbdIdPayloads = payloads[epName];
    // ascending sort for master times
    const masterTimes = Object.keys(tbdIdPayloads)
      .sort((a, b) => a - b);

    // ascending sort for obsolete events
    const obsoleteEventsIndexes =
      obsoleteEvents[epName] ?
        Object.keys(obsoleteEvents[epName]).sort((a, b) => a - b) : [];
    for (let j = 0; j < masterTimes.length; j += 1) {
      const masterTime = masterTimes[j];
      const nextMasterTime = masterTimes[j + 1] || -1;
      // Check validity of current payload
      let currentValue = tbdIdPayloads[masterTime];
      if (!_isNumber(currentValue.value)) {
        if (typeof currentValue.value === 'string') {
          currentValue = {
            ...tbdIdPayloads[masterTime],
            symbol: tbdIdPayloads[masterTime].value,
            value: parameters.get('STRING_PLOT_VALUE'),
          };
        }
      }
      if (!newState.lines[epName]) {
        newState.lines[epName] = {};
        newState.indexes[epName] = [];
      }

      const timestamp = parseInt(masterTime, 10); // TODO : avoid by passing .index[] in payload
      const nextTimestamp = parseInt(nextMasterTime, 10);
      // compute the obsolescence of the data
      const { isDataObsolete, lastComputedObsoleteEventIndex } = isRangeDataObsolete(
        timestamp,
        nextTimestamp,
        lastObsoleteEventIndex,
        obsoleteEventsIndexes
      );

      lastObsoleteEventIndex = lastComputedObsoleteEventIndex;

      newState.lines[epName][timestamp] = {
        masterTime: timestamp,
        isDataObsolete,
        ...currentValue,
      };

      // compute ascending indexes array
      // if new value should be pushed at end (most common case in play mode)
      if (lastIndex === -1 && timestamp > lastTime) {
        newState.indexes[epName].push(timestamp);
        lastTime = timestamp;
        continue;
      }
      lastTime = timestamp;
      const index = _findIndex(newState.indexes[epName], t => t >= timestamp, lastIndex);
      lastIndex = index;
      if (index === -1) {
        // add at end
        newState.indexes[epName].push(timestamp);
        continue;
      }
      // timebased data update
      if (newState.indexes[epName][index] === timestamp) {
        continue;
      }
      // add at index
      newState.indexes[epName] = _concat(
        newState.indexes[epName].slice(0, index),
        timestamp,
        newState.indexes[epName].slice(index)
      );
    }
  }
  return newState;
}

export function viewObsoleteEventAdd(state = {}, payloads, entryPoints) {
  const obsoleteEventsFlatIds = Object.keys(payloads || {});
  const epNames = Object.keys(entryPoints || {});
  if (!obsoleteEventsFlatIds.length || !epNames.length) {
    // no data
    return state;
  }

  let newState;
  if (_isEmpty(state)) {
    newState = {
      indexes: {},
      lines: {},
      min: {},
      max: {},
      minTime: {},
      maxTime: {},
      obsoleteEvents: {},
    };
  } else {
    newState = _cloneDeep(state);
    newState.obsoleteEvents = newState.obsoleteEvents || {};
  }
  _forEach(epNames, (epName) => {
    const { dataId } = entryPoints[epName];
    if (dataId) {
      const flattenDataId = getFlattenDataIdForObsoleteEvent(dataId);

      let lastRangeIndex = 0;

      const tbdIdPayload = payloads[flattenDataId];
      if (tbdIdPayload) {
        if (!newState.obsoleteEvents[epName]) {
          newState.obsoleteEvents[epName] = {};
        }
        // ascending sort for master times
        const masterTimes = Object.keys(tbdIdPayload)
          .sort((a, b) => a - b);
        _forEach(masterTimes, (masterTime) => {
          const timestamp = parseInt(masterTime, 10);
          // get index of obsolete ranges data
          const { isDataObsolete, lastComputedIndex } = rangesNeedUpdateForObsolete(
            timestamp,
            newState.indexes[epName],
            lastRangeIndex
          );
          lastRangeIndex = lastComputedIndex;
          if (isDataObsolete) {
            const rangeTimestamp = newState.indexes[epName][lastComputedIndex];
            newState.lines[epName][rangeTimestamp] = {
              ...newState.lines[epName][rangeTimestamp],
              isDataObsolete,
            };
          }
        });

        const obsoleteEvents = { ...newState.obsoleteEvents[epName], ...payloads[flattenDataId] };
        newState.obsoleteEvents[epName] = obsoleteEvents;
      }
    }
  });

  return newState;
}

/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: updated state
/* *********************************** */
export function selectDataPerView(
  currentViewMap,
  configuration,
  intervalMap,
  payload,
  viewState
) {
  let epSubState = {};
  if (currentViewMap) {
    configuration.entryPoints.forEach((entryPoint) => {
      if (entryPoint.parametric) {
        const epX = currentViewMap.entryPoints[`${entryPoint.name}-X`];
        const epY = currentViewMap.entryPoints[`${entryPoint.name}-Y`];
        const newSubState = selectEpDataParametric(payload[epX.tbdId], epX, `${entryPoint.name}-X`,
          payload[epY.tbdId], epY, `${entryPoint.name}-Y`,
          entryPoint.name, epSubState, intervalMap,
          viewState.lines[epX.dataId.parameterName],
          viewState.lines[epY.dataId.parameterName]);
        epSubState = { ...epSubState, ...newSubState };
      } else {
        const ep = currentViewMap.entryPoints[entryPoint.name];
        if (!ep || !payload[ep.tbdId]) {
          return;
        }
        const newSubState = selectEpData(
          payload[ep.tbdId],
          ep,
          entryPoint.name,
          epSubState,
          intervalMap
        );
        epSubState = { ...epSubState, ...newSubState };
      }
    });
  }
  return epSubState;
}

// eslint-disable-next-line complexity, "DV6 TBC_CNES Un-avoidable complexity without perf. leak"
export function selectEpDataParametric(
  _tbdIdPayloadX,
  epX,
  epNameX,
  _tbdIdPayloadY,
  epY,
  epNameY,
  epName,
  viewState,
  intervalMap,
  linesX,
  linesY
) {
  let minX;
  let minY;
  let maxX;
  let maxY;
  const newState = {};
  if (!newState[epName]) {
    newState[epName] = {};
  }
  const expectedIntervalX = _get(intervalMap, [epX.tbdId, epX.localId, 'expectedInterval']);
  const expectedIntervalY = _get(intervalMap, [epY.tbdId, epY.localId, 'expectedInterval']);
  let indexX = 0;
  let indexY = 0;
  // case of error when visuWindow duration is too long
  if (!expectedIntervalX || !expectedIntervalY) {
    return {};
  }
  // pgaucher-plot
  // Compute new tbdIdpayload for X and Y ( NOT OPTIMIZED)
  const tbdIdPayloadX = computeNewPayload(linesX, _tbdIdPayloadX, epX.dataId.field);
  const tbdIdPayloadY = computeNewPayload(linesY, _tbdIdPayloadY, epY.dataId.field);

  const timestampsX = Object.keys(tbdIdPayloadX);
  const timestampsY = Object.keys(tbdIdPayloadY);
  while (indexX < timestampsX.length && indexY < timestampsY.length) {
    const valueX = tbdIdPayloadX[timestampsX[indexX]];
    const valueY = tbdIdPayloadY[timestampsY[indexY]];

    const timestampX = valueX.refTime;
    const timestampY = valueY.refTime;
    const timestamp = Math.min(timestampX, timestampY);
    // TODO warning OFFSET !!
    // TODO Which offset to pick epX or epY ?
    const masterTime = timestamp; // + EP.OFFSET;

    let valX = valueX.value;
    let valY = valueY.value;

    if (timestampsX[indexX] === timestampsY[indexY]) {
      indexX += 1;
      indexY += 1;
    } else if (timestampsX[indexX] < timestampsY[indexY]) {
      // chexck if Y-1 exist
      if (indexY > 0) {
        valY = interpolatePoint(
          tbdIdPayloadX[timestampsX[indexX]].refTime,
          tbdIdPayloadY[timestampsY[indexY - 1]].refTime,
          tbdIdPayloadY[timestampsY[indexY - 1]].value,
          tbdIdPayloadY[timestampsY[indexY]].refTime,
          tbdIdPayloadY[timestampsY[indexY]].value);
        valX = tbdIdPayloadX[timestampsX[indexX]].value;
      }
      indexX += 1;
    } else if (timestampsX[indexX] > timestampsY[indexY]) {
      // chexck if X-1 exist
      if (indexX > 0) {
        valX = interpolatePoint(
          tbdIdPayloadY[timestampsY[indexY]].refTime,
          tbdIdPayloadX[timestampsX[indexX - 1]].refTime,
          tbdIdPayloadX[timestampsX[indexX - 1]].value,
          tbdIdPayloadX[timestampsX[indexX]].refTime,
          tbdIdPayloadX[timestampsX[indexX]].value);
        valY = tbdIdPayloadY[timestampsY[indexY]].value;
      }
      indexY += 1;
    }

    if (valX > maxX || !maxX) {
      maxX = valX;
    }
    if (valY > maxY || !maxY) {
      maxY = valY;
    }
    if (valX < minX || !minX) {
      minX = valX;
    }
    if (valY < minY || !minY) {
      minY = valY;
    }
    // TODO add symbol and getstatecolor object
    if (valX !== undefined && valY !== undefined) {
      newState[epName][masterTime] = {
        x: valX,
        valX,
        refTime: timestamp,
        value: valY,
        // ...getStateColorObj(value, ep.stateColors, _get(value, ['monitoringState', 'value'])),
        // Case of enum : add symbol to show it in tooltip
        // Case of long : add string representation in tooltip to keep precision
        // Case of double : add string representation in tooltip to keep precision
        // symbol: _get(value, [ep.fieldY, 'symbol']),
      };
    }
  }
  if (Object.keys(newState).length) {
    if (viewState) {
      newState.min = { ...viewState.min, [epName]: minY };
      newState.max = { ...viewState.max, [epName]: maxY };
      newState.minTime = { ...viewState.minTime, [epName]: minX };
      newState.maxTime = { ...viewState.maxTime, [epName]: maxX };
    } else {
      newState.min = { [epName]: minY };
      newState.max = { [epName]: maxY };
      newState.minTime = { [epName]: minX };
      newState.maxTime = { [epName]: maxX };
    }
  }
  return newState;
}

/* ************************************
 * Compute new payload list from old payload + injectedData
 * @param:_allPayload: old paylaod
 * @param: _newPayload: data to inject
 * @param: field: value to get ( extractedVAlue ...)
 * @return: updated payload
/* *********************************** */
export function computeNewPayload(_allPayload, _newPayload, field) {
  const allPayload = _allPayload ? Object.keys(_allPayload) : [];
  const newPayload = _newPayload ? Object.keys(_newPayload) : [];
  let indexA = 0;
  let indexB = 0;
  const mutatedPayload = {};
  while (indexA < allPayload.length && indexB < newPayload.length) {
    if (_allPayload[allPayload[indexA]].refTime <
      _newPayload[newPayload[indexB]].referenceTimestamp.value) {
      mutatedPayload[_allPayload[allPayload[indexA]].refTime] = {
        refTime: _allPayload[allPayload[indexA]].refTime,
        value: _allPayload[allPayload[indexA]].value,
      };
      indexA += 1;
    } else if (_allPayload[allPayload[indexA]].refTime >
      _newPayload[newPayload[indexB]].referenceTimestamp.value) {
      mutatedPayload[_newPayload[newPayload[indexB]].referenceTimestamp.value] = {
        refTime: _newPayload[newPayload[indexB]].referenceTimestamp.value,
        value: getFieldValue(_newPayload[newPayload[indexB]], field),
      };
      indexB += 1;
    } else {
      mutatedPayload[_newPayload[newPayload[indexB]].referenceTimestamp.value] = {
        refTime: _newPayload[newPayload[indexB]].referenceTimestamp.value,
        value: getFieldValue(_newPayload[newPayload[indexB]], field),
      };
      indexA += 1;
      indexB += 1;
    }
  }
  if (indexA < allPayload.length) {
    for (let i = indexA; i < allPayload.length; i += 1) {
      mutatedPayload[_allPayload[allPayload[i]].refTime] = {
        refTime: _allPayload[allPayload[i]].refTime,
        value: _allPayload[allPayload[i]].value,
      };
    }
  } else if (indexB < newPayload.length) {
    for (let i = indexB; i < newPayload.length; i += 1) {
      mutatedPayload[_newPayload[newPayload[i]].referenceTimestamp.value] = {
        refTime: _newPayload[newPayload[i]].referenceTimestamp.value,
        value: getFieldValue(_newPayload[newPayload[i]], field),
      };
    }
  }
  // console.log('length', Object.keys(mutatedPayload).length);
  return mutatedPayload;
}

/* ************************************
 * Calculate new point interpolated ( order 1)
/* *********************************** */

// pgaucher-plot
export function interpolatePoint(
  toInterpolateTs,
  lowerTs,
  lowerValue,
  upperTs,
  upperValue
) {
  // Y = AX + B
  const A = (lowerValue - upperValue) / (lowerTs - upperTs);
  const B = ((lowerTs * upperValue) - (lowerValue * upperTs)) / (lowerTs - upperTs);

  return (A * toInterpolateTs) + B;
}

/* ************************************
 * Select payload to add for current entry Point
 * @param: payload of current entry point
 * @param: entry point definition
 * @param: entry point name
 * @param: sub state of current view
 * @param: intervals for all entry Points
 * @return: updated state
/* *********************************** */
export function selectEpData(tbdIdPayload, ep, epName, viewState, intervalMap) {
  // get expected interval
  const expectedInterval = _get(intervalMap, [ep.tbdId, ep.localId, 'expectedInterval']);
  // case of error when visuWindow duration is too long
  if (!expectedInterval) {
    return {};
  }
  const lower = expectedInterval[0];
  const upper = expectedInterval[1];
  const newState = {};
  let min;
  let max;
  let minTime;
  let maxTime;

  const timestamps = Object.keys(tbdIdPayload);
  for (let i = 0; i < timestamps.length; i += 1) {
    const value = tbdIdPayload[timestamps[i]];
    const timestamp = _get(value, ['referenceTimestamp', 'value']);
    // Check timestamp validy and filters for this entry point
    if (!isTimeValid(timestamp, lower, upper, value, ep.filters, tbdIdPayload)) {
      continue;
    }
    const masterTime = timestamp + ep.offset;
    if (!newState[epName]) {
      newState[epName] = {};
    }
    let valForMax;
    let valX;
    if (ep.fieldX) {
      valX = _get(value, [ep.fieldX, 'value']);
    }
    const valY = getFieldValue(value, ep.fieldY, ep.convertTo);
    if (valY !== undefined) {
      valForMax = valY;
      newState[epName][masterTime] = {
        x: masterTime,
        valX,
        refTime: timestamp,
        value: valY,
        ...getStateColorObj( // will fetch default / fallback / custom color
          value,
          ep.stateColors,
          _get(value, 'monitoringState.value', STATE_COLOR_NOMINAL)
        ),
        // Case of enum : add symbol to show it in tooltip
        // Case of long : add string representation in tooltip to keep precision
        // Case of double : add string representation in tooltip to keep precision
        symbol: _get(value, [ep.fieldY, 'symbol']),
        // isNominal: _get(value, 'isNominal.value'), // not use anymore
        // isObsolete: _get(value, 'isObsolete.value'), // not use anymore
        validityState: _get(value, 'validityState.value'),
      };
    }
    if (valForMax) {
      const newMin = getMin(min, valForMax, minTime, masterTime);
      min = newMin.min;
      minTime = newMin.minTime;

      const newMax = getMax(max, valForMax, maxTime, masterTime);
      max = newMax.max;
      maxTime = newMax.maxTime;
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

function getFieldValue(value, field, convertTo) {
  const path = convertTo ? ['gpinuc', field, convertTo] : [field, 'value'];
  let val = _get(value, path);
  // in the case of val is a string we need to have an integer value for displaying in the plot
  if (typeof val === 'string') {
    val = getOrCreate(field, val);
  }
  // TODO CHECK IF GPINUC GOT NO VALUES
  if (!val) {
    const symbol = _get(value, [field, 'symbol']);
    // Case of long values
    if (symbol) {
      val = Number(symbol);
    }
  }
  return val;
}

function isTimeValid(timestamp, lower, upper, value, filters, tbdIdPayload) {
  if (typeof timestamp === 'undefined') {
    logger.warn('get a payload without .referenceTimestamp key ggg', tbdIdPayload);
    return false;
  }
  // check value is in interval
  if (timestamp < lower || timestamp > upper) {
    return false;
  }
  // check value verify filters
  if (!applyFilters(value, filters)) {
    return false;
  }
  return true;
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
