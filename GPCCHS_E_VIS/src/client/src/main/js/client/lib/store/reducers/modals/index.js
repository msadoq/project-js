import * as types from '../../types';

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
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          opened: false,
        },
      };
    }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getModal = (state, { windowId }) => state.modals[windowId];
