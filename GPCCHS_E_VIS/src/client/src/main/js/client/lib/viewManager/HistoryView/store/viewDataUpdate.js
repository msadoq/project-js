// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Update cols to show in history view
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #7111 : 22/09/2017 : fix view data state update
// VERSION : 2.0.0 : DM : #7111 : 25/09/2017 : Add current in history view data
// VERSION : 2.0.0 : DM : #7111 : 27/09/2017 : Fix current search in history view data
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Remove monitoring state colors mecanism + add
//  defult values for state colors + update unit tests + fix issue when removing a state color +
//  fix css code style
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

/* eslint-disable no-unused-vars */

import _ from 'lodash/fp';

import _get from 'lodash/get';
import { convertData } from 'viewManager/commonData/convertData';
import getLogger from 'common/logManager';
import { getStateColorObj } from 'viewManager/commonData/stateColors';
import { applyFilters } from 'viewManager/commonData/applyFilters';
import { SORTING_DESC, SORTING_ASC } from 'constants';
import _findLastIndex from 'lodash/findLastIndex';

const logger = getLogger('data:rangeValues');

/**
 * Returns an object mapping entry point data for the specified entry point `epKey`
 * to indexes in the form `epKey timestamp`
 *
 * The function takes as argument an object in the following format:
 *
 * {
 *   [epKey]: {
 *     [timestamp]: { ...epData }
 *   }
 * }
 *
 * and returns the indexed representation of it, using the couple (epKey, timestamp)
 * to index entry point data:
 *
 * {
 *   [`[epKey] [timestamp]`]: { ...epData }
 * }
 *
 * @param epKey string
 * @param epData object
 * @returns object
 * @private
 */
const _indexEntryPointData =
  (epKey, epData) =>
    Object.keys(epData).reduce((acc, timestamp) => ({
      ...acc,
      [`${epKey} ${timestamp}`]: epData[timestamp],
    }), {});

/**
 *
 * Returns an indexed version of entry points data, in the form:
 *
 * {
 *   [`[epKey] [timestamp]`]: { ...epData }
 * }
 *
 * @param data
 * @returns {{}}
 * @private
 */
const _indexData =
  data =>
    Object.keys(data).reduce((acc, epKey) => ({
      ...acc,
      ..._indexEntryPointData(epKey, data[epKey]),
    }), {});


const _insertSortedBy = (by, el, dest, offset = 0) => {
  const index = _.sortedIndexBy(by, el, dest.slice(offset)) + offset;
  dest.splice(index, 0, el);
  return index;
};

/**
 *
 * Inserts the elements in source array into a sorted destination array
 *
 * @param by
 * @param source
 * @param dest
 * @private
 */
const _mergeSortedArrayBy = (by, source, dest) => {
  let i = 0;
  let offset = 0;

  while (i < source.length) {
    offset = _insertSortedBy(by, source[i], dest, offset);
    i += 1;
  }
};

/* ************************************
 * Add payloads in plot view data state
 * @param: data state of current view
 * @param: current view ID
 * @param: data to add in state per EP name
 * @param: current view configuration
 * @return: updated state
/* *********************************** */
export function viewRangeAdd(state = {}, viewId, payloads, viewConfig, visuWindow) {
  const epKeys = Object.keys(payloads || {});
  if (!epKeys.length) {
    return state;
  }

  const sorting = _.get(['tables', 'history', 'sorting'], viewConfig);
  const sortingColKey = _.get(['colKey'], sorting);

  let updatedState = _.clone(state);

  // injects payloads "as is" in data
  updatedState = _.set(
    ['data'],
    {
      ..._.get(['data'], updatedState),
      ...payloads,
    },
    updatedState
  );

  // indexes payloads and insert them in sorted indexes
  const indexedPayloads = _indexData(payloads);
  const payloadIndexes = Object.keys(indexedPayloads);

  const sortedPayloadIndexes =
    _.sortBy(
      payloadIndex => indexedPayloads[payloadIndex][sortingColKey],
      payloadIndexes
    );

  _mergeSortedArrayBy(
    index => _.get([...index.split(''), sortingColKey], updatedState.data),
    sortedPayloadIndexes,
    updatedState.indexes
  );

  // updatedState = updateCurrent(updatedState, epKeys, visuWindow);

  return updatedState;
}

/*
function updateCurrent(state, epNames, visuWindow) {
  if (!visuWindow) {
    return state;
  }
  const newState = state;
  // Update current position
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];
    const current = _findLastIndex(newState.indexes[epName], t => t < visuWindow.current);
    if (current !== -1) {
      if (!newState.current) {
        newState.current = {};
      }
      newState.current[epName] = [epName, newState.indexes[epName][current]];
    }
  }
  return newState;
}
*/

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
      epSubState = {
        ...epSubState,
        ...newSubState,
      };
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
    let valueToInsert = {
      masterTime,
      epName,
      ...getStateColorObj(currentValue, ep.stateColors),
    };
    const fields = Object.keys(currentValue);
    for (let iField = 0; iField < fields.length; iField += 1) {
      valueToInsert = {
        ...valueToInsert,
        [fields[iField]]: convertData(currentValue[fields[iField]]),
      };
    }

    if (!newState[epName]) {
      newState[epName] = {};
    }
    newState[epName][masterTime] = valueToInsert;
  }
  return newState;
}
