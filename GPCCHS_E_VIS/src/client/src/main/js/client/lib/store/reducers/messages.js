import __ from 'lodash/fp';
import * as types from '../types';

const messageTypes = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
};

const createNewMessage = action => ({
  message: action.payload.message || null,
  type: messageTypes[action.payload.type] || 'danger',
});

export default function messages(state = {}, action) {
  switch (action.type) {
    case types.WS_MESSAGE_ADD: {
      const { containerId } = action.payload;
      const newMessage = createNewMessage(action);
      const addNewMessage = (msgList = []) => __.concat(msgList, newMessage);
      return __.update(containerId, addNewMessage, state);
    }
    case types.WS_MESSAGE_REMOVE: {
      const { containerId, index } = action.payload;
      return __.update(containerId, __.pullAt(index), state);
    }
    case types.WS_MESSAGE_RESET: {
      return __.set(action.payload.containerId, [], state);
    }
    default:
      return state;
  }
}
