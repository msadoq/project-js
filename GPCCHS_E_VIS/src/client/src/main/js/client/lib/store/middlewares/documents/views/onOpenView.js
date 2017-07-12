import * as types from '../../../types';
import { getFocusedWindow } from '../../../selectors/windows';

const onOpenView = documentManager => (
  ({ dispatch, openDialog, getState }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.WS_ASK_OPEN_VIEW) {
      const { absolutePath } = action.payload;
      const window = getFocusedWindow(getState());
      const windowId = window.uuid;
      if (absolutePath) {
        dispatch(documentManager.openView({ absolutePath }, window.focusedPage));
      } else {
        openDialog(windowId, 'open', {}, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            dispatch(documentManager.openView({ absolutePath: choice[0] }, window.focusedPage));
          }
        });
      }
    }
    return returnedAction;
  }
);

export default onOpenView;
