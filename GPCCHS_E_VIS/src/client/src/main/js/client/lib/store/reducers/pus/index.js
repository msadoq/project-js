import _ from 'lodash/fp';
import * as types from 'store/types';
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
      const continuous = action.payload.continuous;
      const interval = action.payload.interval;
      if (!pusId || !_isArray(interval)) {
        return state;
      }
      const newState = state;

      if (continuous) {
        return _.set([pusService, pusId, 'interval', 1], interval[1], newState);
      }
      return _.set([pusService, pusId, 'interval'], interval, newState);
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
        // const existingInterval = _.getOr([], [pusService, flattenId, 'intervals', 0], newState);
        // const newInterval = [groundDate, existingInterval[1]];
        // newState = _.set([pusService, flattenId, 'intervals', 0], newInterval, newState);
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
