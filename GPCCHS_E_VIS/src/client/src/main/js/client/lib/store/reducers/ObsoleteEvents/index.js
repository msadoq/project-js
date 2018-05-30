// import _ from 'lodash';
import _always from 'lodash/fp/always';
import _isEmpty from 'lodash/isEmpty';
import * as types from 'store/types';
import { get } from 'common/configurationManager';
import missingIntervals from 'common/intervals/missing';
import includesTimestamp from 'common/intervals/includesTimestamp';
import getIncludesTimestamp from 'common/intervals/getIncludesTimestamp';
import mergeIntervals from 'common/intervals/merge';
import _isArray from 'lodash/isArray';
import _ from 'lodash/fp';
import removeIntervals from '../../../common/intervals/remove';
import flattenDataId from '../../../common/flattenDataId';

const isCacheDisabled = String(get('DISABLE_LOKI_CACHE')) === 'true';

/* ---------------------- REDUCER ---------------------- */

const ObsoleteEvents = (state = {}, action) => {
  switch (action.type) {
    case types.WS_OBSOLETE_EVENT_ADD: {
      const tbdId = action.payload.tbdId;
      if (!tbdId || !_isArray(action.payload.intervals)) {
        return state;
      }
      let newState = state;
      if (!state[tbdId]) {
        newState = { ...state,
          [tbdId]: {
            dataId: action.payload.dataId,
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
    case types.WS_OBSOLETE_EVENT_DELETE: {
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
};

export default isCacheDisabled ? _always({}) : ObsoleteEvents;

/* ---------------------- SELECTOR ---------------------- */

export const getObsoleteEvents = (state, { tbdId }) => state.ObsoleteEvents[tbdId];

/**
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified tbdId
 * @param {array} queryIntervals - The required interval
 * @return {array} array of missing intervals for the tbdId.
 */
export const getMissingIntervals = (state, { tbdId, queryInterval }) => {
  const idObsoleteEvents = getObsoleteEvents(state, { tbdId });
  if (!idObsoleteEvents) {
    return [queryInterval];
  }
  return missingIntervals(idObsoleteEvents.intervals, queryInterval);
};

/**
 * Checks if timestamp is inside getObsoleteEvents[id]
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified dataId
 * @param {number} timestamp - The timestamp to check
 * @return {bool} true if timestamp is inside an interval
 */
export const isTimestampInObsoleteEvents = (state, { tbdId, timestamp }) => {
  const idObsoleteEvents = getObsoleteEvents(state, { tbdId });
  if (!idObsoleteEvents) {
    return false;
  }
  return includesTimestamp(idObsoleteEvents.intervals, timestamp);
};

/**
 * Checks if upper value of an interval is inside ObsoleteEvents[id] and return the found interval
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified dataId
 * @param {number} interval - The interval to get the upper value
 * @return {Object} { isInInterval, interval } - A boolean if is in knownInterval, the interval in which it has been found
 */
export const getUpperIntervalIsInObsoleteEvents = (state, tbdId, interval) => {
  const idObsoleteEvents = getObsoleteEvents(state, { tbdId });
  if (!idObsoleteEvents) {
    return {
      isInInterval: false,
      interval: [],
    };
  }
  return getIncludesTimestamp(idObsoleteEvents.intervals, interval[1]);
};
