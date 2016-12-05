import u from 'updeep';
import _get from 'lodash/get';
import * as types from '../types';

/**
 * Reducer
 */
export default function messages(stateMessages = {}, action) {
  switch (action.type) {
    case types.WS_MESSAGE_ADD: {
      if (action.payload.instanceType === 'global') {
        const arr = (stateMessages.global || []).concat(message(undefined, action));
        return u({ global: arr }, stateMessages);
      }
      const arr = _get(
        stateMessages,
        [action.payload.instanceType, action.payload.instanceId],
        []
      ).concat(message(undefined, action));
      return u({
        [action.payload.instanceType]: {
          [action.payload.instanceId]: arr
        }
      }, stateMessages);
    }
    case types.WS_MESSAGE_REMOVE: {
      if (action.payload.instanceType === 'global') {
        const arr = stateMessages.global.filter((v, i) => action.payload.index !== i);
        return u({ global: arr }, stateMessages);
      }
      const arr = stateMessages[action.payload.instanceType][action.payload.instanceId].filter(
        (v, i) => action.payload.index !== i
      );
      return u({
        [action.payload.instanceType]: {
          [action.payload.instanceId]: arr
        }
      }, stateMessages);
    }
    default:
      return stateMessages;
  }
}

const initialState = {
  message: 'Erreur',
  type: 'danger',
};

function message(stateMessage = initialState, action) {
  switch (action.type) {
    case types.WS_MESSAGE_ADD:
      return Object.assign({}, stateMessage, {
        message: action.payload.message || stateMessage.message,
        // authorized : success, warning, danger, info
        type: (action.payload.type === 'error' ? 'danger' : action.payload.type) || stateMessage.type,
      });
    default:
      return stateMessage;
  }
}
