import _ from 'lodash/fp';
import * as types from '../../types';

/* --- Reducer -------------------------------------------------------------- */

const initialState = {
  textViewId: null,
  title: 'TextView HTML editor',
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
    case types.WS_VIEW_CLOSE:
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

/* --- Selectors ------------------------------------------------------------ */

export const getEditorTextViewId = state => _.get('editor.textViewId', state);
export const getEditorTitle = state => _.get('editor.title', state);
export const getIsCodeEditorOpened = state => !!_.get('editor.textViewId', state);
