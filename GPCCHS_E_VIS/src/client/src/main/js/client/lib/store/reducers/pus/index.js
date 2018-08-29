import _ from 'lodash/fp';
import * as types from 'store/types';
import _isArray from 'lodash/isArray';
import missingIntervals from '../../../common/intervals/missing';
import { getPusFlattenId } from '../../../common/flattenDataId';

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
      const dataId = action.payload.dataId;
      const { apids, domainId, sessionId } = dataId;
      const pusService = action.payload.pusService;
      const continuous = action.payload.continuous;
      const interval = action.payload.interval;
      if ((apids && apids.length === 0) || !_isArray(interval)) {
        return state;
      }
      let newState = state;

      apids.forEach((apid) => {
        const flattenId = getPusFlattenId([apid], { domainId, sessionId });
        if (continuous) {
          newState = _.set([pusService, flattenId, 'interval', 1], interval[1], newState);
        } else {
          newState = _.set([pusService, flattenId, 'interval'], interval, newState);
        }
      });

      return newState;

      // if (continuous) {
      //   return _.set([pusService, pusId, 'interval', 1], interval[1], newState);
      // }
      // return _.set([pusService, pusId, 'interval'], interval, newState);
    }
    case types.SAVE_PUS_DATA: {
      const payload = action.payload.payload;
      const pusService = action.payload.pusService;
      const flattenId = action.payload.flattenId;
      const groundDate = action.payload.groundDate;
      const dataType = action.payload.dataType;
      const type = action.payload.isModel ? 'model' : 'deltas';
      const knownInterval = _.getOr({}, [pusService, flattenId, 'interval'], state);
      let newState = state;
      // save data only if they belong to the known interval,
      if (knownInterval && groundDate >= knownInterval[0] && groundDate <= knownInterval[1]) {
        let typePayload;
        if (type === 'model') {
          typePayload = {
            groundDate,
            payload,
          };
        } else {
          typePayload = {
            ..._.getOr({}, [pusService, flattenId, type], state),
            [groundDate]: {
              dataType,
              payload,
            },
          };
        }
        newState = {
          ...state,
          [pusService]: {
            ..._.getOr({}, [pusService], state),
            [flattenId]: {
              ..._.getOr({}, [pusService, flattenId], state),
              [type]: typePayload,
            },
          },
        };

        // if new pus Data is a model we need to delete deltas, there are no longer link to the new model
        if (type === 'model') {
          newState = _.set([pusService, flattenId, 'deltas'], {}, newState);
          const existingInterval = _.getOr([], [pusService, flattenId, 'interval'], newState);
          const newInterval = [groundDate, existingInterval[1]];
          newState = _.set([pusService, flattenId, 'interval'], newInterval, newState);
        }
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
