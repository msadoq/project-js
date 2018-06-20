import _ from 'lodash/fp';

import {
  WS_VIEW_TABLE_UPDATE_SORT,
  WS_VIEW_CHANGE_COL_FILTERS,
} from 'store/types';

const DATA_STATE_KEY = 'state';

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
export const _shouldKeepElement = (el, filters = {}) => {
  let ret = true;
// eslint-disable-next-line no-restricted-syntax
  for (const filterKey of Object.keys(filters)) {
    if (el[filterKey] && el[filterKey].indexOf(filters[filterKey]) === -1) {
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
      if (_shouldKeepElement(cur, filters)) {
        return [...acc, index];
      }

      return acc;
    }, []);

const _updateKeptIndexes = (state, tableState) => {
  const filters = _.get([DATA_STATE_KEY, 'filters'], state);
  return _.set(
    'keep',
    _getKeptIndexes(_.get('data', tableState), filters),
    tableState
  );
};

const _getTableStateFromViewSubState =
  (state, tableId) =>
    _.getOr({ data: [], keep: [] }, tableId, state);

/**
 * Injects a range of objects, `source` in data table
 * and updates the filter keep accordingly
 *
 * @param state
 * @param source {array}
 * @param tableId {string} id identifying the table to inject data in
 * @param colName
 * @param filters
 * @returns {object} the updated state
 * @private
 */
export const injectData = (
  state,
  source,
  tableId,
  colName,
  filters = {}
) => {
  let tableState = _getTableStateFromViewSubState(state, tableId);

  let updatedData = _.get('data', tableState);
  let updatedKeep = _.get('keep', tableState);
  let insertIndex = 0;

  source.forEach((el) => {
    // eslint-disable-next-line prefer-const
    [updatedData, insertIndex] =
      _insertSortedBy((e => e[colName]), el, updatedData, insertIndex);

    if (_shouldKeepElement(el, filters)) {
      let insertKeepIndexAt =
        updatedKeep.findIndex(keepIndex => keepIndex === insertIndex);

      if (insertKeepIndexAt === -1) {
        insertKeepIndexAt = 0;
      }

      updatedKeep = [
        ...updatedKeep.slice(0, insertKeepIndexAt),
        insertIndex,
        ...updatedKeep.slice(insertKeepIndexAt).map(i => i + 1),
      ];
    }
  });

  tableState = {
    data: updatedData,
    keep: updatedKeep,
  };

  return _.set(
    tableId,
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
export const removeData = (state, tableId, cond) => {
  let tableState = _getTableStateFromViewSubState(state, tableId);
  tableState = _.set(
    'data',
    _.get('data', tableState).filter((e, i) => !cond(e, i)),
    tableState
  );
  tableState = _updateKeptIndexes(state, tableState);

  return _.set(
    tableId,
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
export const purgeData = (state, tableId) => removeData(state, tableId, () => true);

/**
 * This is the common data reducer used to handle common data management,
 * such as index synchronization for table views
 *
 * @param state
 * @param action
 */
export default (state = {}, action) => {
  const _getTableState = (viewId, tableId) => _.get([viewId, tableId], state);

  switch (action.type) {
    case WS_VIEW_TABLE_UPDATE_SORT: {
      const { viewId, tableId, colName } = action.payload;
      let tableState = _getTableState(viewId, tableId);

      if (!tableState) {
        return state;
      }

      const filters = _.getOr({}, [DATA_STATE_KEY, 'filters'], tableState);

      const tablePath = [viewId, tableId];

      tableState = _.set([DATA_STATE_KEY, 'sort'], colName, tableState);

      tableState = _.set(
        'data',
        _sortData(_.get('data', tableState), colName),
        tableState
      );

      tableState = _.set(
        'keep',
        _getKeptIndexes(_.get('data', tableState), filters),
        tableState
      );

      return _.set(tablePath, tableState, state);
    }
    case WS_VIEW_CHANGE_COL_FILTERS: {
      const { viewId, tableId, filters } = action.payload;

      let tableState = _getTableState(viewId, tableId);

      if (!tableState) {
        return state;
      }

      const tablePath = [viewId, tableId];

      tableState = _.set([DATA_STATE_KEY, 'filters'], filters);

      tableState = _updateKeptIndexes(state, tableState);

      return _.set(tablePath, tableState, state);
    }
    default:
      return state;
  }
};
