// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Split documents middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add helpers in documents middleware + refacto + opti pipeMiddlewares function
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : documents middleware now next the action before doing anything else
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add an options parameter to openDialog documents helper
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog enhancers directly in each middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction' in middlewares
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withListenAction enhancer in documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add extensions filter when open a page
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add defaultPath when open or save a document
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --PAGE
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : Add some TODO tests in onOpenPage and onOpenView documents middlewares
// END-HISTORY
// ====================================================================

import * as types from 'store/types';
import { askOpenWorkspace } from 'store/actions/hsc';
import { openDialog } from 'store/actions/ui';
import withListenAction from 'store/helpers/withListenAction';
import { getFocusedWindowId, getIsWorkspaceOpened, getWorkspaceFolder } from 'store/reducers/hsc';

import { getUniqueWindowId } from '../selectors';
import { getOpenExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnOpenPage = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_OPEN_PAGE) {
      if (!getIsWorkspaceOpened(getState())) {
        dispatch(askOpenWorkspace(null, null, true, true)); // TODO test this branch
      }
      const { absolutePath } = action.payload;
      const windowId = action.payload.windowId
        || getFocusedWindowId(getState()) // TODO test this branch
        || getUniqueWindowId(getState()); // TODO test this branch
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
