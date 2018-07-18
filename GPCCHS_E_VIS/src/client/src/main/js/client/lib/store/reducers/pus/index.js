import _ from 'lodash/fp';
import mergeIntervals from 'common/intervals/merge';
import _isEmpty from 'lodash/isEmpty';
import * as types from 'store/types';
import removeIntervals from 'common/intervals/remove';
import { get } from 'common/configurationManager';
import _isArray from 'lodash/isArray';
import missingIntervals from '../../../common/intervals/missing';

const isCacheDisabled = String(get('DISABLE_LOKI_CACHE')) === 'true';

/* --- Reducer -------------------------------------------------------------- */

/**
 * Update domains property in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */

const knownPus = (state = {}, action) => {
  switch (action.type) {
    case types.WS_KNOWN_PUS_INTERVAL_ADD: {
      const pusId = action.payload.id;
      if (!pusId || !_isArray(action.payload.intervals)) {
        return state;
      }
      let newState = state;
      if (!state[pusId]) {
        newState = { ...state,
          [pusId]: {
            apidName: action.payload.apidName,
            intervals: [],
          },
        };
      }
      const mergedIntervals =
        mergeIntervals(newState[pusId].intervals, action.payload.intervals);
      return {
        ...newState,
        [pusId]: {
          ...newState[pusId],
          intervals: mergedIntervals,
        },
      };
    }
    case types.WS_KNOWN_PUS_INTERVAL_DELETE: {
      const pusId = action.payload.pusId;
      if (!pusId || !_isArray(action.payload.intervals)) {
        return state;
      }
      if (!state[pusId]) {
        return state;
      }
      // compute remaining intervals
      const remainingIntervals = removeIntervals(state[pusId].intervals, action.payload.intervals);
      // if no remaining interval, remove pusId key in state
      if (_isEmpty(remainingIntervals)) {
        return _.omit(pusId, state);
      }
      return {
        ...state,
        [pusId]: {
          ...state[pusId],
          intervals: remainingIntervals,
        },
      };
    }
    case types.RESET_KNOWN_PUS: {
      let newState = { ...state };
      const pusIdInterval = action.payload.intervals;
      const pusIds = Object.keys(newState);
      for (let i = 0; i < pusIds.length; i += 1) {
        if (pusIdInterval[pusIds[i]]) {
          newState[pusIds[i]] = {
            ...newState[pusIds[i]],
            intervals: pusIdInterval[pusIds[i]].interval,
          };
        } else {
          newState = _.omit(pusIds[i], newState);
        }
      }
      return newState;
    }
    default:
      return state;
  }
};

export default isCacheDisabled ? _.always({}) : knownPus;

/* --- Selectors ------------------------------------------------------------ */

/**
 * Get all the pus per pusId.
 * @param {object} state - The current state.
 * @param {string} pusId - The specified pusId
 * @return {object} array of known intervals for pusId.
 */
export const getKnownPus = (state, { pusId }) => state.knownPus[pusId];

/**
 * Get known intervalPerLastTbdId for a specified pus id.
 * @param {object} state - The current state.
 * @param {string} pusId - The specified pusId
 * @param {array} queryIntervals - The required interval
 * @return {array} array of missing intervals for the pusId.
 */
export const getMissingIntervals = (state, { pusId, queryInterval }) => {
  const pus = getKnownPus(state, { pusId });
  if (!pus) {
    return [queryInterval];
  }
  return missingIntervals(pus.intervals, queryInterval);
};
