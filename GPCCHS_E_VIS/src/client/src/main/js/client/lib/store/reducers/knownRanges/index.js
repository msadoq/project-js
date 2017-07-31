import _ from 'lodash/fp';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import * as types from '../../types';
import mergeIntervals from '../../../common/intervals/merge';
import removeIntervals from '../../../common/intervals/remove';
import missingIntervals from '../../../common/intervals/missing';
import includesTimestamp from '../../../common/intervals/includesTimestamp';
import flattenDataId from '../../../common/flattenDataId';

/* --- Reducer -------------------------------------------------------------- */

/**
 * Update domains property in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */
export default function knownRanges(state = {}, action) {
  switch (action.type) {
    case types.WS_KNOWNINTERVAL_ADD: {
      const tbdId = action.payload.tbdId;
      if (!tbdId || !_isArray(action.payload.intervals)) {
        return state;
      }
      let newState = state;
      if (!state[tbdId]) {
        newState = { ...state,
          [tbdId]: {
            flatDataId: flattenDataId(action.payload.dataId),
            filters: action.payload.filters || [],
            intervals: [],
          },
        };
      }
      const mergedIntervals =
        mergeIntervals(newState[tbdId].intervals, action.payload.intervals);
      return {
        ...newState,
        [tbdId]: {
          ...newState[tbdId],
          intervals: mergedIntervals,
        },
      };
    }
    case types.WS_KNOWNINTERVAL_DELETE: {
      const tbdId = action.payload.tbdId;
      if (!tbdId || !_isArray(action.payload.intervals)) {
        return state;
      }
      if (!state[tbdId]) {
        return state;
      }
      // compute remaining intervals
      const remainingIntervals = removeIntervals(state[tbdId].intervals, action.payload.intervals);
      // if no remaining interval, remove tbdId key in state
      if (_isEmpty(remainingIntervals)) {
        return _.omit(tbdId, state);
      }
      return {
        ...state,
        [tbdId]: {
          ...state[tbdId],
          intervals: remainingIntervals,
        },
      };
    }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

/**
 * Get all the known ranges per tbdId.
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified tbdId
 * @return {object} array of known intervals for tbdId.
 */
export const getKnownRanges = (state, { tbdId }) => state.knownRanges[tbdId];

/**
 * Get known intervalPerLastTbdId for a specified tbdId.
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified tbdId
 * @param {array} queryIntervals - The required interval
 * @return {array} array of missing intervals for the tbdId.
 */
export const getMissingIntervals = (state, { tbdId, queryInterval }) => {
  const tbdIdRanges = getKnownRanges(state, { tbdId });
  if (!tbdIdRanges) {
    return [queryInterval];
  }
  return missingIntervals(tbdIdRanges.intervals, queryInterval);
};

/**
 * Checks if dataId is inside knownRanges
 * @param {object} state - The current state.
 * @param {object} dataId - The specified dataId
 * @return {array} list of tbdId corresponding to dataId
 */
export const isDataIdInCache = (state, { dataId }) => {
  // flatten DataId to compare with tbdId
  const flatDataId = flattenDataId(dataId);
  // Checks if DataId exists in tbdId and timestamp is in an interval
  const tbdIds = Object.keys(state.knownRanges);
  return _filter(tbdIds, tbdId => state.knownRanges[tbdId].flatDataId === flatDataId);
};

/**
 * Checks if timestamp is inside knownRanges[tbdId]
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified dataId
 * @param {number} timestamp - The timestamp to check
 * @return {bool} true if timestamp is inside an interval
 */
export const isTimestampInKnownRanges = (state, { tbdId, timestamp }) => {
  const tbdIdRanges = getKnownRanges(state, { tbdId });
  if (!tbdIdRanges) {
    return false;
  }
  return includesTimestamp(tbdIdRanges.intervals, timestamp);
};