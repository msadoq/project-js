/* eslint-disable no-continue,no-restricted-syntax,no-loop-func */
import _ from 'lodash/fp';

import {
  WS_VIEW_ADD_BLANK,
  WS_VIEW_CHANGE_COL_FILTERS,
  WS_VIEW_TABLE_UPDATE_SORT,
} from 'store/types';

import createScopedDataReducer from './createScopedDataReducer';

export const DATA_STATE_KEY = 'state';

/**
 * Insert source in the sorted array dest and return the indexes of the inserted elements
 *
 * @param by {function} determines on which field we sort the data
 * @param el {object} data to insert
 * @param destination {array} array in which the data will be inserted
 * @param offset {number} begin inserting element from offset
 * @returns {array} an array describing the sorted array
 *          and the index of the newly inserted item
 * @private
 */
const _insertSortedBy = (by, el, destination, offset = 0) => {
  const index = offset + _.sortedIndexBy(by, el, destination.slice(offset));

  return [
    [
      ...destination.slice(0, index),
      el,
      ...destination.slice(index),
    ],
    index,
  ];
};

/**
 * Sorts data against the specified `colName`
 *
 * @param data
 * @param colName
 * @returns {*}
 * @private
 */
const _sortData = (data, colName) => _.sortBy((el => el[colName]), data);

/**
 * Determines if an element should be filtered or not depending on its data
 *
 * @param el
 * @param filters
 * @returns {boolean}
 */
export const shouldKeepElement = (el, filters = {}) => {
  let ret = true;

  // eslint-disable-next-line no-restricted-syntax
  for (const filterKey of Object.keys(filters)) {
    let valueToMatch = el && el[filterKey];

    if (typeof valueToMatch === 'object') {
      // TODO: verify if template expression is enough and remove this condition
      valueToMatch = JSON.stringify(valueToMatch);
    }

    if (['string', 'number'].indexOf(typeof valueToMatch) > -1) {
      valueToMatch = `${el[filterKey]}`;
    }

    const filterValue =
      filters[filterKey] && `${filters[filterKey]}`;

    if (
      filterValue &&
      filterValue.length > 0 &&
      valueToMatch.indexOf(filterValue) === -1
    ) {
      ret = false;
      break;
    }
  }

  return ret;
};

/**
 * Update filter index, which consists of an array containing the indexes of the elements
 * whose values match the specified filters
 *
 * @param data
 * @param filters
 */
const _getKeptIndexes =
  (data = [], filters = {}) =>
    data.reduce((acc, cur, index) => {
      if (shouldKeepElement(cur, filters)) {
        return [...acc, index];
      }

      return acc;
    }, []);

const _updateKeptIndexes = (tableState) => {
  const filters = _.get([DATA_STATE_KEY, 'filters'], tableState);
  return _.set(
    'keep',
    _getKeptIndexes(_.getOr([], 'data', tableState), filters),
    tableState
  );
};

const _getTableState =
  (state, tableId) =>
    _.getOr(
      { data: [], keep: [] },
      ['tables', tableId],
      state
    );


const _defaultHashFunc = obj =>
  Object.values(obj)
    .join('#');

const _withRowId = (el, hashFunc = _defaultHashFunc) => ({ ...el, rowId: hashFunc(el) });

/**
 * Injects a range of objects, `source` in data table
 * and updates the filter keep accordingly
 * and calls the specified callback function `cb` for each element
 *
 * The provided callback function `cb` takes an element
 * and an insert index as parameters
 *
 * @param state
 * @param source {array}
 * @param tableId {string} id identifying the table to inject data in
 * @param afterEach {function} callback function to be called on each inserted element
 * @param config {object} view configuration
 * @param rowIdHashFunc {function} generate a row unique id depending on its data
 * @returns {object} the updated state
 * @private
 */
export const injectTabularData = (
  state,
  tableId,
  source,
  afterEach = null,
  config = null,
  rowIdHashFunc = _defaultHashFunc
) => {
  let tableState = _getTableState(state, tableId);

  let colName = _.get([DATA_STATE_KEY, 'sort'], tableState);
  let filters = _.getOr({}, [DATA_STATE_KEY, 'filters'], tableState);

  if (config !== null) {
    const tablePath = ['tables', tableId];
    colName = _.get([...tablePath, 'sorting', 'colName'], config);
    filters = _.get([...tablePath, 'filters'], config);
  }

  let updatedData = _.getOr([], 'data', tableState);

  if (!colName) {
    updatedData = [...updatedData, ...source.map(el => _withRowId(el, rowIdHashFunc))];
  } else {
    const sortedSource = _sortData(source, colName);
    let insertIndex = 0;

    for (const el of sortedSource) {
      const elWithRowId = _withRowId(el, rowIdHashFunc);

      if (typeof elWithRowId !== 'object') {
        continue;
      }

      if (colName in elWithRowId) {
        [updatedData, insertIndex] =
          _insertSortedBy((e => (e && e[colName])), elWithRowId, updatedData, insertIndex);
      } else {
        insertIndex = updatedData.length;
        updatedData = [...updatedData, elWithRowId];
      }

      if (typeof afterEach === 'function') {
        afterEach(elWithRowId, insertIndex);
      }
    }
  }

  const updatedKeep = _getKeptIndexes(updatedData, filters);

  tableState = {
    ...tableState,
    data: updatedData,
    keep: updatedKeep,
  };

  return _.set(
    ['tables', tableId],
    tableState,
    state
  );
};

/**
 * Removes all data that satisfies the specified condition `cond`
 *
 * @param {object} state
 * @param {string} tableId
 * @param cond {function}
 * @return {object} the updated state
 */
export const removeTabularData = (state, tableId, cond) => {
  let tableState = _getTableState(state, tableId);
  tableState = _.set(
    'data',
    _.getOr([], 'data', tableState)
      .filter((e, i) => !cond(e, i)),
    tableState
  );

  tableState = _updateKeptIndexes(tableState);

  return _.set(
    ['tables', tableId],
    tableState,
    state
  );
};

/**
 * Map table state data
 *
 * @param state
 * @param tableId
 * @param mapFunc
 * @returns {void|*|{}}
 */
export const mapTabularData = (state, tableId, mapFunc) => {
  let tableState = _getTableState(state, tableId);
  tableState = _.set(
    'data',
    _.getOr([], 'data', tableState)
      .map((e, i) => mapFunc(e, i)),
    tableState
  );

  tableState = _updateKeptIndexes(tableState);

  return _.set(
    ['tables', tableId],
    tableState,
    state
  );
};

/**
 * Removes all data related to the table identified by the specified `tableId`
 *
 * @param state
 * @param tableId
 * @returns {Object}
 */
export const purgeTabularData = (state, tableId) => removeTabularData(state, tableId, () => true);

/**
 * This is the common data reducer used to handle common data management,
 * such as index synchronization for table views
 *
 * @param dataState
 * @param action
 */
const scopedCommonReducer = (dataState = {}, action) => {
  const tableInitialState = { state: {}, data: [], keep: [] };

  switch (action.type) {
    case WS_VIEW_ADD_BLANK: {
      const { viewId } = action.payload;
      return _.omit([viewId], dataState);
    }
    case WS_VIEW_TABLE_UPDATE_SORT: {
      const { tableId, colName } = action.payload;

      const tablePath = ['tables', tableId];

      let tableState = _.getOr(
        tableInitialState,
        tablePath,
        dataState
      );

      tableState = _.set(
        [DATA_STATE_KEY, 'sort'],
        colName,
        tableState
      );

      tableState = _.set(
        'data',
        _sortData(_.get('data', tableState), colName),
        tableState
      );

      tableState = _updateKeptIndexes(tableState);

      return _.set(
        tablePath,
        tableState,
        dataState
      );
    }
    case WS_VIEW_CHANGE_COL_FILTERS: {
      const { tableId, filters } = action.payload;

      const tablePath = ['tables', tableId];

      let tableState = _.getOr(
        tableInitialState,
        tablePath,
        dataState
      );

      tableState = _.set(
        [DATA_STATE_KEY, 'filters'],
        filters,
        tableState
      );

      tableState = _updateKeptIndexes(tableState);

      return _.set(
        tablePath,
        tableState,
        dataState
      );
    }
    default:
      return dataState;
  }
};

export default createScopedDataReducer(scopedCommonReducer);
