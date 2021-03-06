// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Split documents middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add helpers in documents middleware + refacto
//  + opti pipeMiddlewares function
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : documents middleware now next the action
//  before doing anything else
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add an options parameter to openDialog
//  documents helper
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog
//  enhancers directly in each middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction'
//  in middlewares
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withListenAction enhancer in documents
//  middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add extensions filter when open a page
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add defaultPath when open or save a document
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --PAGE
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : Add some TODO tests in onOpenPage and onOpenView
//  documents middlewares
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import * as types from 'store/types';
import { askOpenWorkspace } from 'store/actions/hsc';
import { openDialog } from 'store/actions/ui';
import withListenAction from 'store/helpers/withListenAction';
import { getFocusedWindowId, getIsWorkspaceOpened, getWorkspaceFolder } from 'store/reducers/hsc';
import { open as openModal } from 'store/actions/modals';
import { focusPage } from 'store/actions/windows';
import { getUniqueWindowId } from '../selectors';
import { getOpenExtensionsFilters, getDefaultFolder } from '../utils';


const findOpenedPage = (state, pageAbsolutePath) =>
  state.pages && Object.values(state.pages).find(p => p.absolutePath === pageAbsolutePath);

const onOpenPage = (state, action, dispatch, documentManager, listenAction) => {
  const { absolutePath } = action.payload;
  const windowId = action.payload.windowId
    || getFocusedWindowId(state) // TODO test this branch
    || getUniqueWindowId(state); // TODO test this branch
  const workspaceFolder = getWorkspaceFolder(state);
  if (absolutePath) {
    dispatch(documentManager.openPage({
      windowId,
      path: absolutePath,
      workspaceFolder,
    }));
  } else {
    dispatch(openDialog(windowId, 'open', {
      filters: getOpenExtensionsFilters('Page'),
      defaultPath: getDefaultFolder(state),
    }));
    listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
      const { choice } = closeAction.payload;
      if (choice) {
        const toOpenPageAbsolutePath = choice[0];
        const foundOpenedPage = findOpenedPage(state, toOpenPageAbsolutePath);

        const askOpenPageConfirmation = () => {
          dispatch(openModal(windowId, {
            type: 'dialog',
            title: 'Confirmation for opening page',
            message: 'This page file is already open. Do you want to open a copy?',
            buttons: [
              { label: 'Cancel', value: 'cancel', type: 'default' },
              { label: 'Display existing page', value: 'focus', type: 'default' },
              { label: 'Open a copy in a new tab', value: 'open', type: 'primary' },
            ],
          }));
          listenAction(types.WS_MODAL_CLOSE, (confirmCloseAction) => {
            if (confirmCloseAction.payload.choice === 'cancel') {
              // closes modal and do nothing
            }

            if (confirmCloseAction.payload.choice === 'open') {
              dispatch(documentManager.openPage({
                windowId,
                absolutePath: foundOpenedPage.absolutePath,
                workspaceFolder,
                isModified: true,
              }));
            }

            if (confirmCloseAction.payload.choice === 'focus') {
              dispatch(focusPage(windowId, foundOpenedPage.uuid));
            }
          });
        };

        if (foundOpenedPage) {
          askOpenPageConfirmation();
        } else {
          dispatch(documentManager.openPage({
            windowId,
            absolutePath: choice[0],
            workspaceFolder,
          }));
        }
      }
    });
  }
};

const makeOnOpenPage = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const state = getState();

    if (action.type === types.WS_ASK_OPEN_PAGE) {
      if (!getIsWorkspaceOpened(state)) {
        listenAction(types.WS_WORKSPACE_OPENED, () => {
          onOpenPage(getState(), action, dispatch, documentManager, listenAction);
        });
        dispatch(askOpenWorkspace(null, null, true, true)); // TODO test this branch
      } else {
        onOpenPage(getState(), action, dispatch, documentManager, listenAction);
      }
    }
    return next(action);
  }
);

export default makeOnOpenPage;
