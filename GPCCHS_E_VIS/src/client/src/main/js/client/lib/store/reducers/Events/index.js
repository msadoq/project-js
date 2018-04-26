// import _ from 'lodash';
import _ from 'lodash/fp';
import * as types from 'store/types';
import { get } from 'common/configurationManager';
import _filter from 'lodash/filter';
import flattenDataId from '../../../common/flattenDataId';

const isCacheDisabled = String(get('DISABLE_LOKI_CACHE')) === 'true';

/* ---------------------- REDUCER ---------------------- */

const Events = (state = {}, action) => {
  switch (action.type) {
    case types.WS_EVENT_ADD: {
      const dataId = action.payload.dataId;
      const eventCategory = dataId.comObject;
      const eventType = dataId.parameterName;
      if (!eventCategory || !eventType) {
        return state;
      }
      // structure construction for event cache
      const parameterName = action.payload.parameterName;
      const eventDate = action.payload.eventDate;
      const tuple = `${dataId.domainId}-${dataId.sessionId}`;
      let newState = state;

      if (!newState[eventCategory]) {
        newState = {
          ...newState,
          [eventCategory]: {
            [eventType]: {
              [tuple]: {
                [parameterName]: [eventDate],
              },
            },
          },
        };
      } else if (!newState[eventCategory][eventType]) {
        newState = {
          ...newState,
          [eventCategory]: {
            ...newState[eventCategory],
            [eventType]: {
              [tuple]: {
                [parameterName]: [eventDate],
              },
            },
          },
        };
      } else if (!newState[eventCategory][eventType][tuple]) {
        newState = {
          ...newState,
          [eventCategory]: {
            ...newState[eventCategory],
            [eventType]: {
              ...newState[eventCategory][eventType],
              [tuple]: {
                [parameterName]: [eventDate],
              },
            },
          },
        };
      } else if (!newState[eventCategory][eventType][tuple][parameterName]) {
        newState = {
          ...newState,
          [eventCategory]: {
            ...newState[eventCategory],
            [eventType]: {
              ...newState[eventCategory][eventType],
              [tuple]: {
                ...newState[eventCategory][eventType][tuple],
                [parameterName]: [eventDate],
              },
            },
          },
        };
      } else {
        newState = {
          ...newState,
          [eventCategory]: {
            ...newState[eventCategory],
            [eventType]: {
              ...newState[eventCategory][eventType],
              [tuple]: {
                ...newState[eventCategory][eventType][tuple],
                [parameterName]: [
                  ...newState[eventCategory][eventType][tuple][parameterName],
                  eventDate,
                ],
              },
            },
          },
        };
      }
      return newState;
    }
    case types.WS_EVENT_DELETE: {
      const eventCategory = action.payload.eventCategory;
      const eventType = action.payload.eventType;
      const tuple = action.payload.tuple;
      const parameterName = action.payload.parameterName;
      const interval = action.payload.interval;
      let newState;
      if (!eventCategory && !eventType && !tuple) {
        return state;
      }

      if (!state[eventCategory] ||
        !state[eventCategory][eventType] ||
        !state[eventCategory][eventType][tuple]) {
        return state;
      }


      if (parameterName.length === 0) {
        newState = _.set(`${eventCategory}.${eventType}`, _.omit(tuple, state[eventCategory][eventType]), state);
      } else if (interval.length === 0) {
        newState = _.set(`${eventCategory}.${eventType}.${tuple}`, _.omit(parameterName, state[eventCategory][eventType][tuple]), state);
      } else {
        newState = _.set(`${eventCategory}.${eventType}.${tuple}.${parameterName}`, _.filter(val => !(val >= interval[0] && val <= interval[1]), state[eventCategory][eventType][tuple][parameterName]), state);
      }

      return newState;
    }
    default:
      return state;
  }
};

export default isCacheDisabled ? _.always({}) : Events;

/* ---------------------- SELECTOR ---------------------- */

export const getEvents =
  (state,
   {
     eventCategory,
     eventType,
     tuple,
     parameterName,
   }) => state.Events[eventCategory][eventType][tuple][parameterName];

export const getObsoleteEvents =
  (state,
   {
     tuple,
     parameterName,
   }) => state.Events.LogbookEvent.OBSOLETE_PARAMETER[tuple][parameterName];

/**
 * Checks if dataId is inside Events
 * @param {object} state - The current state.
 * @param {object} dataId - The specified dataId
 * @return {string} name of paramater
 */
export const isDataIdInEventCache = (state, { dataId, parameter }) => {
  const eventCategory = dataId.comObject;
  const eventType = dataId.parameterName;
  const tuple = `${dataId.domainId}-${dataId.sessionId}`;
  if (eventCategory in state.Events) {
    if (eventType in state.Events[eventCategory]) {
      if (tuple in state.Events[eventCategory][eventType]) {
        return parameter in state.Events[eventCategory][eventType][tuple];
      }
    }
  }

  return false;
};

export const isTimestampEventInEvents = (state, { dataId, parameter, timestamp }) => {
  const eventCategory = dataId.comObject;
  const eventType = dataId.parameterName;
  const tuple = `${dataId.domainId}-${dataId.sessionId}`;
  return state.Events[eventCategory][eventType][tuple][parameter].indexOf(timestamp) !== -1;
}

