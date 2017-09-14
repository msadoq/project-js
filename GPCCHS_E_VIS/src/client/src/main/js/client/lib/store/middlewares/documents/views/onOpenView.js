import * as types from '../../../types';
import { getFocusedWindow } from '../../../selectors/windows';
import { openDialog } from '../../../actions/ui';
import withListenAction from '../../../helpers/withListenAction';

import { getOpenExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnOpenView = documentManager => withListenAction(
  ({ dispatch, listenAction, getState }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_OPEN_VIEW) {
      const { absolutePath } = action.payload;
      const state = getState();
      const window = getFocusedWindow(state);
      const windowId = window.uuid;
      if (absolutePath) {
        dispatch(documentManager.openView({ absolutePath }, window.focusedPage));
      } else {
        dispatch(openDialog(windowId, 'open', {
          filters: getOpenExtensionsFilters(),
          defaultPath: getDefaultFolder(state),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            dispatch(documentManager.openView({ absolutePath: choice[0] }, window.focusedPage));
          }
        });
      }
    }
    return nextAction;
  }
);

export default makeOnOpenView;
