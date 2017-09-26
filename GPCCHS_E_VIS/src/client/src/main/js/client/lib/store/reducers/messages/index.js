// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/messages . . .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Add ControlsSelector tests . .
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Remove messages when close a workspace
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Change addMessage action behavior .
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Automatically remove messages after a while
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Add animation to messages removing
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the mouse over the message
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Remove Timebar/Controls/ControlsSelectors + tests .
// END-HISTORY
// ====================================================================

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
