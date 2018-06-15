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

/* eslint-disable no-unused-vars,no-continue,no-restricted-syntax */

import _ from 'lodash/fp';

import _get from 'lodash/get';
import { convertData } from 'viewManager/commonData/convertData';
import getLogger from 'common/logManager';
import { getStateColorObj } from 'viewManager/commonData/stateColors';
import { applyFilters } from 'viewManager/commonData/applyFilters';
import { SORTING_DESC, SORTING_ASC } from 'constants';
import { shouldKeepIndex } from '../../commonData/reducer';

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
      ..._indexEntryPointData(epKey, data[epKey] || {}),
    }), {});


const _insertSortedBy = (by, el, dest, offset = 0) => {
  const index = _.sortedIndexBy(by, el, dest.slice(offset)) + offset;

  return [
    index,
    [...dest.slice(0, index), el, ...dest.slice(index)],
  ];
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
  let ret = dest;

  while (i < source.length) {
    const [updatedOffset, updatedDest] = _insertSortedBy(by, source[i], ret, offset);
    i += 1;
    offset = updatedOffset;
    ret = updatedDest;
  }

  return ret;
};


const _syncIndexesByType = (state, indexedPayloads, sortingColKey) => {
  const _sortFunc = payloadIndex => _.get([payloadIndex, sortingColKey], indexedPayloads);

  // sort new payload indexes by sortingColKey
  const payloadIndexes = Object.keys(indexedPayloads);

  const sortedPayloadIndexes =
    _.sortBy(
      _sortFunc,
      payloadIndexes
    );

  let updatedIndexes = _.getOr([], ['indexes', sortingColKey], state);

  // merge payload indexes with current indexes
  updatedIndexes = _mergeSortedArrayBy(
    _sortFunc,
    sortedPayloadIndexes,
    updatedIndexes
  );

  updatedIndexes = _.set(['indexes', sortingColKey], updatedIndexes, state);

  return updatedIndexes;
};

const _syncFilterIndexes = (state, indexedPayloads, filters) => {
  const payloadIndexes = Object.keys(indexedPayloads);

  const referenceIndex = _.get(['indexes', 'referenceTimestamp'], state);

  const filteredPayloadIndexes =
    payloadIndexes.filter(index => shouldKeepIndex(index, state, filters));

  const previousFilterIndexes =
    (_.get(['indexes', 'keep'], state) || []).map(index => referenceIndex[index]);

  const newFilterIndexes =
    _mergeSortedArrayBy(_.identity, filteredPayloadIndexes, previousFilterIndexes);

  /**
   * @const newFilterIndexesMap specifies the array indexes that should be kept
   *
   *     When using referenceTimestamp index, we get the i-th displayed value by:
   *         referenceTimestampIndex[filterIndexesMap[i]]
   */
  const newFilterIndexesMap = newFilterIndexes.map((current, index) => index);

  return _.set(['indexes', 'keep'], newFilterIndexesMap, state);
};


/* ************************************
 * Add payloads in history view data state
 * @param: data state of current view
 * @param: current view ID
 * @param: data to add in state per EP name
 * @param: current view configuration
 * @return: updated state
/* *********************************** */
export function viewRangeAdd(state = {}, viewId, payloads, viewConfig) {
  const historyConfig = viewConfig.tables.history;
  const epKeys = Object.keys(payloads || {});
  if (!epKeys.length) {
    return state;
  }

  const sorting = _.get(['tables', 'history', 'sorting'], viewConfig);
  const sortingColKey = _.get(['colKey'], sorting);

  let updatedState = state;

  // injects payloads "as is" in data
  updatedState = _.set(
    ['data'],
    _.merge(_.get(['data'], updatedState), payloads),
    state
  );

  // maintains indexed payloads
  const indexedPayloads = _indexData(payloads);

  updatedState = _syncIndexesByType(updatedState, indexedPayloads, 'referenceTimestamp');

  if (
    sortingColKey &&
    sortingColKey !== 'referenceTimestamp'
  ) { // take into account additional sortingKey
    updatedState = _syncIndexesByType(updatedState, indexedPayloads, sortingColKey);
  }

  updatedState = _syncFilterIndexes(updatedState, indexedPayloads, historyConfig.filters);
  updatedState = _.set(['indexes'], _.get(['indexes'], updatedState), updatedState);

  return updatedState;
}

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
