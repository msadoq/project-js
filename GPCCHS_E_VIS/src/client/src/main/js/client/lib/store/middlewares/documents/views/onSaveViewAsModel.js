import * as types from '../../../types';
import { getWindowIdByViewId } from '../../../selectors/windows';

import { openDialog } from '../../../actions/ui';
import withListenAction from '../../../helpers/withListenAction';

const makeOnSaveViewAsModel = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_SAVE_VIEW_AS_MODEL) {
      const state = getState();
      const { viewId } = action.payload;
      const windowId = getWindowIdByViewId(state, { viewId });
      dispatch(openDialog(windowId, 'save'));
      listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
        if (closeAction.payload.choice) {
          const absolutePath = closeAction.payload.choice;
          dispatch(documentManager.saveViewAsModel(viewId, absolutePath));
        }
      });
    }
    return nextAction;
  }
);

export default makeOnSaveViewAsModel;
