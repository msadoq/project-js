import * as types from '../../../types';
import { withOpenDialog } from '../helpers';
import { getWindowIdByViewId } from '../../../selectors/windows';

const onSaveViewAsModel = documentManager => withOpenDialog(
  ({ dispatch, openDialog, getState }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_SAVE_VIEW_AS_MODEL) {
      const state = getState();
      const { viewId } = action.payload;
      const windowId = getWindowIdByViewId(state, { viewId });
      openDialog(windowId, 'save', {}, (closeAction) => {
        if (closeAction.payload.choice) {
          const absolutePath = closeAction.payload.choice;
          dispatch(documentManager.saveViewAsModel(viewId, absolutePath));
        }
      });
    }
    return nextAction;
  }
);

export default onSaveViewAsModel;
