import _ from 'lodash/fp';
import mergeIntervals from 'common/intervals/merge';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import * as types from 'store/types';
import flattenDataId from 'common/flattenDataId';
import removeIntervals from 'common/intervals/remove';
import missingIntervals from 'common/intervals/missing';
import includesTimestamp from 'common/intervals/includesTimestamp';
import getIncludesTimestamp from 'common/intervals/getIncludesTimestamp';
import { get } from 'common/configurationManager';
import _isArray from 'lodash/isArray';

const isCacheDisabled = String(get('DISABLE_LOKI_CACHE')) === 'true';

/* --- Reducer -------------------------------------------------------------- */

/**
 * Update domains property in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */

const knownRangesSamplingOn = (state = {}, action) => {
  switch (action.type) {
    case types.WS_KNOWNINTERVAL_ADD_SAMPLING_ON: {
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
    case types.WS_KNOWNINTERVAL_DELETE_SAMPLING_ON: {
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
    case types.RESET_KNOWN_RANGES_SAMPLING_ON: {
      let newState = { ...state };
      const tbdIdInterval = action.payload.tbdIdInterval;
      const tbdIds = Object.keys(newState);
      for (let i = 0; i < tbdIds.length; i += 1) {
        if (tbdIdInterval[tbdIds[i]]) {
          newState[tbdIds[i]] = {
            ...newState[tbdIds[i]],
            intervals: tbdIdInterval[tbdIds[i]].interval,
          };
        } else {
          newState = _.omit(tbdIds[i], newState);
        }
      }
      return newState;
    }
    default:
      return state;
  }
};

export default isCacheDisabled ? _.always({}) : knownRangesSamplingOn;

/* --- Selectors ------------------------------------------------------------ */

/**
 * Get all the known ranges per tbdId.
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified tbdId
 * @return {object} array of known intervals for tbdId.
 */
export const getKnownRangesSamplingOn = (state, { tbdId }) => state.knownRangesSamplingOn[tbdId];

/**
 * Get the list of tbdIds.
 * @param {object} state - The current state.
 * @return {object} array of known tbdIds.
 */
export const getTbdIdsAndDataIdListSamplingOn = (state) => {
  const tbdIdsList = Object.keys(state.knownRangesSamplingOn);
  const tbdIdAndDataIdList = [];
  for (let i = 0; i < tbdIdsList.length; i += 1) {
    tbdIdAndDataIdList[i] = {
      tbdId: tbdIdsList[i],
      dataId: state.knownRangesSamplingOn[tbdIdsList[i]].dataId,
    };
  }
  return tbdIdAndDataIdList;
};

/**
 * Get known intervalPerLastTbdId for a specified tbdId.
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified tbdId
 * @param {array} queryIntervals - The required interval
 * @return {array} array of missing intervals for the tbdId.
 */
export const getMissingIntervalsSamplingOn = (state, { tbdId, queryInterval }) => {
  const tbdIdRanges = getKnownRangesSamplingOn(state, { tbdId });
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
export const isDataIdInCacheSamplingOn = (state, { dataId }) => {
  // flatten DataId to compare with tbdId
  const flatDataId = flattenDataId(dataId);
  // Checks if DataId exists in tbdId and timestamp is in an interval
  const tbdIds = Object.keys(state.knownRangesSamplingOn);
  return _filter(tbdIds, tbdId => state.knownRangesSamplingOn[tbdId].flatDataId === flatDataId);
};

/**
 * Checks if timestamp is inside knownRanges[tbdId]
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified dataId
 * @param {number} timestamp - The timestamp to check
 * @return {bool} true if timestamp is inside an interval
 */
export const isTimestampInKnownRangesSamplingOn = (state, { tbdId, timestamp }) => {
  const tbdIdRanges = getKnownRangesSamplingOn(state, { tbdId });
  if (!tbdIdRanges) {
    return false;
  }
  return includesTimestamp(tbdIdRanges.intervals, timestamp);
};

/**
 * Checks if upper value of an interval is inside knownRanges[tbdId] and return the found interval
 * @param {object} state - The current state.
 * @param {string} tbdId - The specified dataId
 * @param {number} interval - The interval to get the upper value
 * @return {Object} { isInInterval, interval } - A boolean if is in knownInterval, the interval in which it has been found
 */
export const getUpperIntervalIsInKnownRangesSamplingOn = (state, tbdId, interval) => {
  const tbdIdRanges = getKnownRangesSamplingOn(state, { tbdId });
  if (!tbdIdRanges) {
    return {
      isInInterval: false,
      interval: [],
    };
  }
  return getIncludesTimestamp(tbdIdRanges.intervals, interval[1]);
};
