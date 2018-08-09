import _ from 'lodash/fp';
import mergeIntervals from 'common/intervals/merge';
import _isEmpty from 'lodash/isEmpty';
import * as types from 'store/types';
import removeIntervals from 'common/intervals/remove';
import _isArray from 'lodash/isArray';
import missingIntervals from '../../../common/intervals/missing';

/* --- Reducer -------------------------------------------------------------- */

/**
 * Update domains property in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */
/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
const knownPus = (state = {}, action) => {
  switch (action.type) {
    case types.WS_KNOWN_PUS_INTERVAL_ADD: {
      const pusId = action.payload.id;
      const pusService = action.payload.pusService;
      if (!pusId || !_isArray(action.payload.intervals)) {
        return state;
      }
      const newState = state;

      const intervals = _.getOr([], [pusService, pusId, 'intervals'], newState);

      const mergedIntervals =
        mergeIntervals(intervals, action.payload.intervals);
      return _.set([pusService, pusId, 'intervals'], mergedIntervals, newState);
    }
    case types.WS_KNOWN_PUS_INTERVAL_DELETE: {
      const pusId = action.payload.pusId;
      if (!pusId || !_isArray(action.payload.intervals) || !state[pusId]) {
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
    case types.SAVE_PUS_DATA: {
      const payload = action.payload.payload;
      const pusService = action.payload.pusService;
      const flattenId = action.payload.flattenId;
      const groundDate = action.payload.groundDate;
      const dataType = action.payload.dataType;
      const type = action.payload.isModel ? 'model' : 'deltas';
      const serviceApid = payload.serviceApid;
      let typePayload;
      if (type === 'model') {
        typePayload = {
          groundDate,
          payload,
        };
      } else {
        typePayload = {
          ..._.getOr({}, [pusService, flattenId, serviceApid, type], state),
          [groundDate]: {
            dataType,
            payload,
          },
        };
      }
      let newState = {
        ...state,
        [pusService]: {
          ..._.getOr({}, [pusService], state),
          [flattenId]: {
            ..._.getOr({}, [pusService, flattenId], state),
            [serviceApid]: {
              ..._.getOr({}, [pusService, flattenId, serviceApid], state),
              [type]: typePayload,
            },
          },
        },
      };

      // if new pus Data is a model we need to delete deltas, there are no longer link to the new model
      if (type === 'model') {
        newState = _.set([pusService, flattenId, serviceApid, 'deltas'], {}, newState);
      }
      return newState;
    }
    default:
      return state;
  }
};

export default knownPus;

/* --- Selectors ------------------------------------------------------------ */

/**
 * Get all the pus per pusId.
 * @param {object} state - The current state.
 * @param {string} pusId - The specified pusId
 * @return {object} array of known intervals for pusId.
 */
export const getKnownPus = (state, { pusService, pusId }) => _.getOr(false, ['knownPus', pusService, pusId], state);

/**
 * Get known intervalPerLastTbdId for a specified pus id.
 * @param {object} state - The current state.
 * @param {string} pusId - The specified pusId
 * @param {array} queryIntervals - The required interval
 * @return {array} array of missing intervals for the pusId.
 */
export const getMissingIntervals = (state, { pusService, pusId, queryInterval }) => {
  const pus = getKnownPus(state, { pusService, pusId });
  if (!pus) {
    return [queryInterval];
  }
  return missingIntervals(pus.intervals, queryInterval);
};
