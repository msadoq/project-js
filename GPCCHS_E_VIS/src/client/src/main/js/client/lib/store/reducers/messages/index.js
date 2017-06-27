import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import * as types from '../../types';

/* --- Reducer -------------------------------------------------------------- */

const messageTypes = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
};

const createNewMessages = (messageType, messages) => _.map((msg = null) => ({
  uuid: msg.uuid,
  message: msg.content,
  type: messageTypes[messageType] || 'danger',
  removing: false,
}), messages);

export default function messagesReducer(state = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE: {
      if (action.payload.keepMessages) {
        return state;
      }
      return {};
    }
    case types.WS_MESSAGE_ADD: {
      const { containerId } = action.payload;
      const newMessage = createNewMessages(action.payload.type, action.payload.messages);
      const addNewMessage = (msgList = []) => _.concat(msgList, newMessage);
      return _.update(containerId, addNewMessage, state);
    }
    case types.WS_MESSAGE_REMOVING: {
      const { containerId, uuid } = action.payload;
      return _.update(containerId, _.map((x) => {
        if (x.uuid === uuid) {
          return _.set('removing', true, x);
        }
        return x;
      }), state);
    }
    case types.WS_MESSAGE_CANCEL_REMOVING: {
      const { containerId, uuid } = action.payload;
      return _.update(containerId, _.map((x) => {
        if (x.uuid === uuid) {
          return _.set('removing', false, x);
        }
        return x;
      }), state);
    }
    case types.WS_MESSAGE_REMOVE: {
      const { containerId, uuid } = action.payload;
      return _.update(containerId, _.reject(_.propEq('uuid', uuid)), state);
    }
    case types.WS_MESSAGE_RESET: {
      return _.set(action.payload.containerId, [], state);
    }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getAllMessages = state => state.messages;
export const getGlobalMessages = state => state.messages.global;
export const getMessages = (state, { containerId }) => state.messages[containerId];

export const getTimeSetterMessages = createSelector(
  getAllMessages,
  (state, { timebarUuid }) => timebarUuid,
  (messages, timebarUuid) => _.getOr(null, `timeSetter-${timebarUuid}`, messages)
);
