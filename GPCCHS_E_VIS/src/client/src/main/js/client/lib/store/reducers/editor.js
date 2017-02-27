import * as types from '../types';

const initialState = {
  textViewId: null,
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case types.WS_WINDOW_OPEN_HTML_EDITOR:
      return Object.assign({}, state, {
        textViewId: action.payload.viewId,
      });
    case types.WS_WINDOW_CLOSE_HTML_EDITOR:
      return Object.assign({}, state, {
        textViewId: null,
      });
    case types.WS_VIEW_REMOVE:
      if (action.payload.viewId === state.textViewId) {
        return Object.assign({}, state, {
          textViewId: null,
        });
      }
      return state;
    default:
      return state;
  }
}
