/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';
import _concat from 'lodash/concat';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _split from 'lodash/split';
import getLogger from '../../../common/logManager';
import { getStateColorObj } from '../../commonData/stateColors';
import { applyFilters } from '../../commonData/applyFilters';
import { SORTING_DESC, SORTING_ASC } from '../../../constants';

const logger = getLogger('data:rangeValues');


/* ************************************
 * Compare 2 values considering direction
 * @param: reference value
 * @param: value to compare
 * @param: direction (SORTING_ASC or SORTING_DESC)
 * @return: true if valueRef is >= to value when direction is SORTING_ASC or <= if SORTING_DESC
/* *********************************** */
export function compareValue(valueRef, valueToCompare, direction) {
  // Case of unknown column for sorting
  if (!valueRef) {
    return true;
  }
  if (direction === SORTING_DESC) {
    return valueToCompare >= valueRef;
  }
  return valueToCompare <= valueRef;
}

/* ************************************
 * Add payload in ep table
 * @param: data state of current view
 * @param: EP Name
 * @param: index to insert data
 * @param: current payload
 * @return: updated state and inserted index in 'lines' table
/* *********************************** */
export function addDataInEpTable(epState, index, payload) {
  let newState = epState;
  let indexInLines;
  if (index === -1) {
    // indexInLines = newState.length - 1;
    newState.push(payload);
  } else {
    // indexInLines = index;
    newState = _concat(
      newState.slice(0, index),
      payload,
      newState.slice(index)
    );
  }
  return { indexInLines, newState };
}
/* ************************************
 * Returns true if name corresponds to time
 * @param: column name
 * @return: Returns true if name corresponds to time
/* *********************************** */
// function isSortingByTime(colToSort) {
//   if (colToSort === 'referenceTimestamp' || colToSort === 'masterTime'
//     || colToSort === 'onboardDate' || colToSort === 'groundDate') {
//     return true;
//   }
//   return false;
// }
/* ************************************
 * Update 'lines' table with payload considering sorting parameters
 * @param: data state of current view
 * @param: EP Name
 * @param: current timestamp
 * @param: column name for sorting
 * @param: direction for sorting
 * @return: updated state
/* *********************************** */
export function updateLines(state, epName, timestamp, colToSort, direction) {
  const valueToCompare = _get(state, ['data', epName, timestamp, colToSort, 'value']);
  if (!valueToCompare) {
    return state;
  }
  // loop on 'lines' table to find index for insertion
  let i = 0;
  let indexToInsert = -1;
  while (i < state.lines.length) {
    const args = _split(state.lines[i], ' ');
    if (args.length !== 2) {
      logger.warn('Error updating Plot view data:', state.lines[i]);
      i += 1;
      continue;
    }
    const ep = args[0];
    const time = args[1];
    const valRef = _get(state, ['data', ep, time, colToSort, 'value']);
    if (compareValue(valRef, valueToCompare, direction)) {
      indexToInsert = i;
      i = state.lines.length;
    }
    i += 1;
  }

  const valueToInsert = epName.concat(' ').concat(timestamp);
  if (indexToInsert === -1) {
    const newState = state;
    newState.lines.push(valueToInsert);
    return newState;
  }

  return {
    ...state,
    lines: _concat(state.lines.slice(0, indexToInsert), valueToInsert,
                   state.lines.slice(indexToInsert)),
  };
}

/* ************************************
 * Add payloads in plot view data state
 * @param: data state of current view
 * @param: current view ID
 * @param: data to add in state per EP name
 * @param: current view configuration
 * @return: updated state
/* *********************************** */
export function viewRangeAdd(state = {}, viewId, payloads, viewConfig) {
  // get EP names
  const epNames = Object.keys(payloads || {});
  if (!epNames.length) {
    // no data
    return state;
  }
  // Get sorting column
  const colToSort = _get(viewConfig, ['sorting', 'colName'], 'masterTime');
  const direction = _get(viewConfig, ['sorting', 'direction'], SORTING_ASC);
  // hidden columns
  // const hiddenCols = _get(viewConfig, 'hiddenCols', []);

  // Loop on payloads to update state
  // data: contains all fields filtered by EP and by time [epName]: { [timestamp]: { values }}
  // indexes: contains timestamps per EP and ordered [epName]: [t1, t2, ...]
  // lines: ordered table grouping all EP [ ep1 t1, ep2 t1, ep1 t2, ...]
  // cols: list of column names
  let newState = { cols: [], lines: [], indexes: {}, data: {} };
  if (state && !_isEmpty(state.cols)) {
    newState = _cloneDeep(state);
  }

  // loop on EP name to add payload sorted by masterTime in EP table
  for (let iEp = 0; iEp < epNames.length; iEp += 1) {
    const epName = epNames[iEp];
    if (!newState.data[epName]) {
      newState.data[epName] = {};
      newState.indexes[epName] = [];
    }
    // Update of EP data
    newState.data[epName] = Object.assign({}, newState.data[epName], payloads[epName]);
    const timestamps = Object.keys(payloads[epName]);
    let lastIndex = -1;
    let lastTime;
    // loop on payload timestamps
    for (let iTime = 0; iTime < timestamps.length; iTime += 1) {
      // let indexInLines = -1;
      const time = timestamps[iTime];
      // Add payload in EP Table sorted by ascending time
      if (lastIndex === -1 && lastTime && lastTime < time) {
        newState.indexes[epName].push(time);
      } else {
        let index = -1;
        if (newState.indexes[epName].length) {
          index = _findIndex(newState.indexes[epName], val => val > time);
        }
        lastIndex = index;
        if (index === -1) {
          newState.indexes[epName].push(time);
        } else {
          newState.indexes[epName] = _concat(newState.slice(0, index), time, newState.slice(index));
        // const result = addDataInEpTable(newState[epName], index, payloads[epName][time]);
        // newState[epName] = result.newState;
        // indexInLines = result.indexInLines;
        }
      }
      lastTime = time;

      // Sort payload by sorting column
      // If sorting column is on time, use the previous index
      // if (isSortingByTime(colToSort)) {
      //   const iBegin =
      //     _findIndex(newState.lines, val => (val.epName === epName && val.index === indexInLines));
      //   // Get index for insertion in table lines
      //   const iInsert = getIndex(newState, epName, payloads[epName][time], colToSort, direction,
      //     iBegin);
      //
      //   // insert payload references in 'lines' table
      //   // Add at end
      //   if (iInsert === -1) {
      //     newState.lines.push({ epName, index: indexInEpTable });
      //   } else {
      //     // insert payload
      //     newState.lines = _concat(
      //       newState.lines.slice(0, iInsert),
      //       { epName, index: indexInEpTable },
      //       newState.lines.slice(iInsert));
      //     // update reference indexes in 'lines' table for epName
      //     let end = iInsert;
      //     let begin = 0;
      //     if (direction === SORTING_ASC) {
      //       begin = iInsert + 1;
      //       end = newState.lines.length;
      //     }
      //
      //     for (let j = begin; j < end; j += 1) {
      //       if (newState.lines[j].epName === epName) {
      //         newState.lines[j].index += 1; // data is sorted wih ascending timestamp in ep table
      //       }
      //     }
      //   }
      // } else {
      // Sorting considering specified column
      newState = updateLines(newState, epName, time, colToSort, direction);
      // }
    }
  }
  return newState;
}

// function getIndex(state, epName, payload, colToSort, direction, iBegin) {
//   return _findIndex(state.lines, val => compareValue(
//     state[val.epName][val.index][colToSort], payload[colToSort], direction), iBegin);
// }
/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: payloads to use per EP
/* *********************************** */
export function selectDataPerView(currentViewMap, intervalMap, payload) {
  let epSubState = {};
  if (currentViewMap) {
    Object.keys(currentViewMap.entryPoints).forEach((epName) => {
      const ep = currentViewMap.entryPoints[epName];
      // No payload for this tbd  Id
      if (!payload[ep.tbdId]) {
        return;
      }
      const newSubState = selectEpData(payload[ep.tbdId], ep, epName, intervalMap);
      epSubState = { ...epSubState, ...newSubState };
    });
  }
  return epSubState;
}
/* ************************************
 * Select payload to add for current entry Point
 * @param: payload of current entry point
 * @param: entry point definition
 * @param: entry point name
 * @param: intervals for all entry Points
 * @return: ep payload to be used
/* *********************************** */
export function selectEpData(tbdIdPayload, ep, epName, intervalMap) {
  // get expected interval
  const expectedInterval = _get(intervalMap, [ep.tbdId, ep.localId, 'expectedInterval']);
  // case of error when visuWindow duration is too long
  if (!expectedInterval) {
    return {};
  }
  const lower = expectedInterval[0];
  const upper = expectedInterval[1];

  const timestamps = Object.keys(tbdIdPayload);
  const newState = {};

  // Loop on payload timestamps
  for (let i = 0; i < timestamps.length; i += 1) {
    const currentValue = tbdIdPayload[timestamps[i]];
    const timestamp = _get(currentValue, ['referenceTimestamp', 'value']);
    if (typeof timestamp === 'undefined') {
      logger.warn('get a payload without .referenceTimestamp key ggg', tbdIdPayload);
      continue;
    }
    // check value is in interval
    if (timestamp < lower || timestamp > upper) {
      continue;
    }
    // check value verify filters
    if (!applyFilters(currentValue, ep.filters)) {
      continue;
    }
    const masterTime = timestamp + ep.offset;
    const valueToInsert = {
      masterTime: { type: 'time', value: masterTime },
      ...currentValue,
      epName: { type: 'string', value: epName },
      ...getStateColorObj(currentValue, ep.stateColors,
        _get(currentValue, ['monitoringState', 'value'])),
    };

    if (!newState[epName]) {
      newState[epName] = {};
    }
    newState[epName][masterTime] = valueToInsert;
  }
  return newState;
}
