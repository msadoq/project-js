// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// END-HISTORY
// ====================================================================

import * as types from 'store/types';
/* --- Reducer -------------------------------------------------------------- */

export default function modalsReducer(state = {}, action) {
  switch (action.type) {
    case types.WS_MODAL_OPEN: {
      return {
        ...state,
        [action.payload.windowId]: {
          ...action.payload.props,
          opened: true,
        },
      };
    }
    case types.WS_MODAL_CLOSE: {
      const { choice, windowId } = action.payload;
      // if choice is 'close' it means that the user clicks on the modal button 'close' or 'close without saving'
      // in this case the page is close and not saving
      // we need to remove it from PageIds to prevent application crash
      const nextState = {
        ...state,
        [windowId]: {
          ...state[windowId],
          opened: false,
          pageIds: choice === 'close'
            ? []
            : state[windowId].pageIds,
        },
      };
      return nextState;
    }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getModal = (state, { windowId }) => state.modals[windowId];
