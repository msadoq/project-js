import * as types from '../../../types';

import { askOpenWorkspace } from '../../../actions/hsc';
import { openDialog } from '../../../actions/ui';
import withListenAction from '../../../helpers/withListenAction';
import { getFocusedWindowId, getIsWorkspaceOpened, getWorkspaceFolder } from '../../../reducers/hsc';

import { getUniqueWindowId } from '../selectors';
import { getOpenExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnOpenPage = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_OPEN_PAGE) {
      if (!getIsWorkspaceOpened(getState())) { // TODO tests
        dispatch(askOpenWorkspace(null, null, true, true));
      }
      const { absolutePath } = action.payload;
      const windowId = action.payload.windowId
        || getFocusedWindowId(getState())
        || getUniqueWindowId(getState());
      const workspaceFolder = getWorkspaceFolder(getState());
      if (absolutePath) {
        dispatch(documentManager.openPage({
          windowId,
          path: absolutePath,
          workspaceFolder,
        }));
      } else {
        dispatch(openDialog(windowId, 'open', {
          filters: getOpenExtensionsFilters('Page'),
          defaultPath: getDefaultFolder(getState()),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            dispatch(documentManager.openPage({
              windowId,
              absolutePath: choice[0],
              workspaceFolder,
            }));
          }
        });
      }
    }
    return nextAction;
  }
);

export default makeOnOpenPage;
