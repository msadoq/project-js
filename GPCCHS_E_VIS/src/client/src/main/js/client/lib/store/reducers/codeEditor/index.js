// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files.
//  Possibility to add it in editor using context menu
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Add JSDoc on codeEditor, domains & health reducers
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from 'store/types';

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
      return {
        ...state,
        viewId: action.payload.viewId,
      };
    case types.WS_WINDOW_CLOSE_CODE_EDITOR:
      return {
        ...state,
        viewId: null,
      };
    case types.WS_VIEW_CLOSE:
      if (action.payload.viewId === state.viewId) {
        return {
          ...state,
          viewId: null,
        };
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
