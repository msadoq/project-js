// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// END-HISTORY
// ====================================================================

/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';
import _concat from 'lodash/concat';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _difference from 'lodash/difference';
import getLogger from '../../../common/logManager';
import { getStateColorObj } from '../../commonData/stateColors';
import { applyFilters } from '../../commonData/applyFilters';
import { SORTING_DOWN, SORTING_UP } from '../../../constants';

const logger = getLogger('data:rangeValues');


export function compareValue(valueRef, valueToCompare, direction) {
  // Case of unknown column for sorting
  if (!valueRef) {
    return true;
  }
  if (direction === SORTING_DOWN) {
    return valueToCompare >= valueRef;
  }
  return valueToCompare <= valueRef;
}

/* ************************************
 * Add payloads in plot view data state
 * @param: data state of current view
 * @param: data to add in state
 * @return: updated state
/* *********************************** */
export function viewRangeAdd(state = {}, viewId, payloads, viewConfig) {
  if (!payloads || !payloads.length) {
    return state;
  }
  // Get sorting column
  const colToSort = _get(viewConfig, ['sorting', 'colName'], 'referenceTimestamp');
  const direction = _get(viewConfig, ['sorting', 'direction'], SORTING_UP);
  // hidden columns
  const hiddenCols = _get(viewConfig, 'hiddenCols', []);

  // Loop on payloads to update state
  let newState;
  if (_isEmpty(state)) {
    newState = { cols: [], lines: [] };
  } else {
    newState = _cloneDeep(state);
  }

  let lastIndex = -1;
  if (newState.lines.length) {
    lastIndex = 0;
  }
  let lastValue;
  for (let iData = 0; iData < payloads.length; iData += 1) {
    const currentValue = payloads[iData];
    // Check field names to update column names
    const currentCols = Object.keys(currentValue);
    const shownCols = _difference(currentCols, hiddenCols);
    const result = _difference(shownCols, newState.cols);
    if (result.length) {
      newState.cols = _concat(newState.cols, result);
    }

    const valToCompare = _get(currentValue, [colToSort, 'value']);
    if (!valToCompare ||
       (lastIndex === -1 && compareValue(lastValue, valToCompare, direction))) {
      // Add at the end
      newState.lines.push(currentValue);
    } else {
      const index = _findIndex(newState.lines,
        (t) => {
          const refValue = _get(t, [colToSort, 'value']);
          return compareValue(refValue, valToCompare, direction);
        }, lastIndex);
      lastIndex = index;
      if (index === -1) {
        // add at end if no data without colToSort
        newState.lines.push(currentValue);
      } else {
        // insert value in table
        newState.lines = _concat(newState.lines.slice(0, index),
          currentValue,
          newState.lines.slice(index));
      }
    }
    lastValue = valToCompare;
  }
  return newState;
}
/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: updated state
/* *********************************** */
export function selectDataPerView(currentViewMap, intervalMap, payload, sorting) {
  let epSubState = [];
  if (currentViewMap) {
    // Get sorting column
    // const sorting = getSorting(getStore().getState(), { viewId }); // colName

    Object.keys(currentViewMap.entryPoints).forEach((epName) => {
      const ep = currentViewMap.entryPoints[epName];
      // No payload for this tbd  Id
      if (!payload[ep.tbdId]) {
        return;
      }
      epSubState = selectEpData(epSubState, payload[ep.tbdId], ep, epName, intervalMap, sorting);
    });
  }
  return epSubState;
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
export function selectEpData(subState, tbdIdPayload, ep, epName, intervalMap, sorting) {
  // get expected interval
  const expectedInterval = _get(intervalMap, [ep.tbdId, ep.localId, 'expectedInterval']);
  // case of error when visuWindow duration is too long
  if (!expectedInterval) {
    return subState;
  }
  const lower = expectedInterval[0];
  const upper = expectedInterval[1];
  let newState = subState || [];
  let colToSort = 'referenceTimestamp';
  let direction = 'SORTING_UP';
  if (sorting && sorting.colName) {
    colToSort = sorting.colName;
    direction = sorting.direction;
  }

  const timestamps = Object.keys(tbdIdPayload);
  let lastIndex = -1;
  let lastValue;
  if (newState.length) {
    lastValue = _get(newState[newState.length - 1], [colToSort, 'value']);
  }
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

    let sortingValue;
    if (colToSort !== 'masterTime') {
      sortingValue = _get(currentValue, [colToSort, 'value']);
    } else {
      sortingValue = masterTime;
    }
    // Unknown column
    if (!sortingValue ||
      (lastIndex === -1 && !compareValue(lastValue, sortingValue, direction))
    ) {
      newState.push(valueToInsert);
      lastValue = sortingValue;
    } else {
      const index = _findIndex(newState,
        x => compareValue(x[colToSort].value, sortingValue, direction));
      lastIndex = index;
      if (index !== -1) {
        newState = _concat(
          newState.slice(0, index),
          valueToInsert,
          newState.slice(index)
        );
      } else {
        newState.push(valueToInsert);
      }
    }
  }
  return newState;
}
