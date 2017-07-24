import _ from 'lodash/fp';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import * as types from '../../types';
import mergeIntervals from '../../../common/intervals/merge';
import removeIntervals from '../../../common/intervals/remove';
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
        newState = { ...state, [tbdId]: [] };
      }
      const mergedIntervals =
        mergeIntervals(newState[tbdId], action.payload.intervals);
      return {
        ...newState,
        [tbdId]: mergedIntervals,
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
      const remainingIntervals = removeIntervals(state[tbdId], action.payload.intervals);
      // if no remaining interval, remove tbdId key in state
      if (_isEmpty(remainingIntervals)) {
        return _.omit(tbdId, state);
      }
      return {
        ...state,
        [tbdId]: remainingIntervals,
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
 * @return {object} array of known intervals per tbdId.
 */
export const getKnownRanges = state => state.knownRanges;

/**
 * Get known intervalPerLastTbdId for a specified tbdId.
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified tbdId
 * @return {object} array of known intervals for the tbdId.
 */
export const getKnownIntervals = (state, { tbdId }) => state.knownRanges[tbdId];

/**
 * Checks if dataId with a specified timestamp is inside knownRanges
 * @param {object} state - The current state.
 * @param {string} dataId - The specified dataId
 * @param {number} timestamp - The specified timestamp
 * @return {bool} true if the data is inside a known range.
 */
export const isDataInCache = (state, { dataId, timestamp }) => {
  // flatten DataId to compare with tbdId
  const flatDataId = flattenDataId(dataId);
  // Checks if DataId exists in tbdId and timestamp is in an interval
  const intervals = getKnownIntervals(state, { tbdId: flatDataId });
  if (intervals && includesTimestamp(intervals, timestamp)) {
    return true;
  }
  // Checks if there is / are tbdId containing dataId
  const tbdIds = Object.keys(state.knownRanges);
  for (let i = 0; i < tbdIds.length; i += 1) {
    if (tbdIds[i].startsWith(flatDataId)) {
      // Checks if DataId exists in tbdId and timestamp is in an interval
      const knownIntervals = getKnownIntervals(state, { tbdId: tbdIds[i] });
      if (knownIntervals && includesTimestamp(knownIntervals, timestamp)) {
        return true;
      }
    }
  }
  // No interval includes the dataId with this timestamp
  return false;
};
