/* eslint-disable no-restricted-syntax */
import _ from 'lodash/fp';
import * as types from 'store/types';

export const shouldKeepIndex = (index, state, filters = {}) => {
  const epData = _.get(['data', ...index.split(' ')], state);

  let ret = true;
  for (const filterKey of Object.keys(filters)) {
    if (
      !epData ||
      epData[filterKey].indexOf(filters[filterKey]) === -1
    ) {
      ret = false;
      break;
    }
  }

  return ret;
};

/**
 * Maintain a list of array indexes of indexes to keep depending on user filters
 *
 * @param state
 * @param filters
 * @returns {void|*}
 * @private
 */
export const updateFilteredIndexes = (state, filters) => {
  let usedIndex = _.getOr([], ['indexes', 'referenceTimestamp'], state);

  if (usedIndex.length === 0) {
    return state;
  }

  const availableIndexes = _.get(['indexes'], state);

  const otherIndexes =
    Object
      .keys(availableIndexes)
      .filter(indexKey => indexKey !== 'referenceTimestamp' && indexKey !== 'keep');

  if (otherIndexes.length > 0) {
    usedIndex = availableIndexes[otherIndexes[0]];
  }

  /**
   * @const filterIndexesMap specifies the array indexes that should be kept
   *
   *     When using referenceTimestamp index, we get the i-th displayed value by:
   *         referenceTimestampIndex[filterIndexesMap[i]]
   */
  const filterIndexesMap = usedIndex.reduce((acc, cur, index) => {
    if (shouldKeepIndex(cur, state, filters)) {
      return [...acc, index];
    }

    return acc;
  }, []);

  return {
    ...state,
    indexes: {
      ...state.indexes,
      keep: filterIndexesMap,
    },
  };
};

/**
 * This is the common data reducer used to handle common data management,
 * such as index synchronization for table views
 *
 * @param state
 * @param action
 */
export default (state = {
  data: {},
  indexes: {
    referenceTimestamp: [],
  },
}, action) => {
  switch (action.type) {
    case types.WS_VIEW_TABLE_UPDATE_SORT: {
// eslint-disable-next-line no-unused-vars
      const { viewId, colName, filters } = action.payload;

      if (!state[viewId] || !state[viewId].indexes) {
        return state;
      }

      let newState = state;

// eslint-disable-next-line no-loop-func
      const _sortFunc = index => _.get([viewId, 'data', ...index.split(' '), colName], newState);

      const newSortIndex =
        _.sortBy(
          _sortFunc,
          _.getOr([], [viewId, 'indexes', 'referenceTimestamp'], newState)
        );

      newState = {
        ...newState,
        [viewId]: {
          ...newState[viewId],
          indexes: {
            referenceTimestamp: newState[viewId].indexes.referenceTimestamp,
            [colName]: newSortIndex,
            keep: newState[viewId].indexes.keep,
          },
        },
      };

      // re-index filters against updated sort index

      newState = {
        ...newState,
        [viewId]: updateFilteredIndexes(newState, filters)[viewId],
      };

      return newState;
    }
    case types.WS_VIEW_CHANGE_COL_FILTERS: {
      const { viewId, filters } = action.payload;

      if (!state[viewId] || !state[viewId].indexes) {
        return state;
      }

      return {
        ...state,
        [viewId]: updateFilteredIndexes(state, filters)[viewId],
      };
    }
    default:
      return state;
  }
};
