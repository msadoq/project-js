// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Implement ui/dialog reducer . .
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add getDialog selector in store/reducers/ui/dialog
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from 'store/types';

/* --- Reducer -------------------------------------------------------------- */
export default function dialogReducer(state = {}, action) {
  switch (action.type) {
    case types.HSC_OPEN_DIALOG: {
      const { windowId, dialogId, type, options } = action.payload;
      const hasDialog = _.has([windowId, dialogId]);
      const setDialog = _.set([windowId, dialogId]);
      if (!hasDialog(state) && windowId && dialogId && type) {
        return setDialog({ type, options }, state);
      }
      return state;
    }
    case types.HSC_DIALOG_CLOSED: {
      const { windowId, dialogId } = action.payload;
      const hasDialog = _.has([windowId, dialogId]);
      const unsetEmptyWindow = (dialogState) => {
        if (_.isEmpty(dialogState[windowId])) {
          return _.unset(windowId, dialogState);
        }
        return dialogState;
      };
      const unsetDialog = _.pipe(
        _.unset([windowId, dialogId]),
        unsetEmptyWindow
      );
      if (hasDialog(state)) {
        return unsetDialog(state);
      }
      return state;
    }
    default: return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */
export const getAllDialogs = _.get('ui.dialog');
export const getDialog = (state, { windowId, dialogId }) => (
  _.get([windowId, dialogId], getAllDialogs(state))
);
