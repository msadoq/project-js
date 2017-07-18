import _ from 'lodash/fp';
import * as types from '../../types';

/* --- Reducer -------------------------------------------------------------- */

const initialState = {
  viewId: null,
};

/**
 * Update codeEditor property in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */
export default function editor(state = initialState, action) {
  switch (action.type) {
    case types.WS_WINDOW_OPEN_CODE_EDITOR:
      return Object.assign({}, state, {
        viewId: action.payload.viewId,
      });
    case types.WS_WINDOW_CLOSE_CODE_EDITOR:
      return Object.assign({}, state, {
        viewId: null,
      });
    case types.WS_VIEW_CLOSE:
      if (action.payload.viewId === state.viewId) {
        return Object.assign({}, state, {
          viewId: null,
        });
      }
      return state;
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

/**
 * Get the id of the view currently opened in the code editor.
 * @param {object} state - The current state.
 * @return {string} view id.
 */
export const getViewId = state => _.get('codeEditor.viewId', state);

/**
 * Indicate if the code editor is open.
 * @param {object} state - The current state.
 * @return {bool}
 */
export const getIsCodeEditorOpened = state => !!_.get('codeEditor.viewId', state);
