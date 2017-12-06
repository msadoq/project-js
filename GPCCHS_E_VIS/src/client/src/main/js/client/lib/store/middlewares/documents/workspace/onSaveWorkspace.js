import { join } from 'path';
import * as types from 'store/types';

import { getWorkspaceFile, getWorkspaceFolder, getFocusedWindowId } from 'store/reducers/hsc';
import { openDialog } from 'store/actions/ui';

import { open as openModal } from 'store/actions/modals';
import withListenAction from 'store/helpers/withListenAction';
import { getWorkspaceNewPagesIds, getWorkspaceHasNewPages, getNewViewIds } from '../selectors';

import { getSaveExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnSaveWorkspace = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_SAVE_WORKSPACE) {
      const state = getState();
      const windowId = action.payload.windowId || getFocusedWindowId(state);
      const workspaceFile = getWorkspaceFile(state);
      const workspaceFolder = getWorkspaceFolder(state);

      const saveAs = action.payload.saveAs || (!workspaceFile && !workspaceFolder);
      if (getWorkspaceHasNewPages(state)) {
        dispatch(openModal(windowId, {
          title: 'new views must be saved',
          type: 'saveWizard',
          documentType: 'workspace',
          mode: 'save',
          pageIds: getWorkspaceNewPagesIds(state),
          viewIds: getNewViewIds(state),
          buttons: [
            {
              savedDocuments: { label: 'Ok', value: 'ok', type: 'secondary' },
              unsavedDocuments: { label: 'Ok', value: 'ok', type: 'secondary', disabled: true },
            },
          ],
        }));
      } else if (saveAs) {
        dispatch(openDialog(windowId, 'save', {
          filters: getSaveExtensionsFilters('WorkSpace'),
          defaultPath: getDefaultFolder(state),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            const absolutePath = choice;
            dispatch(documentManager.saveWorkspace(absolutePath));
          }
        });
      } else {
        dispatch(documentManager.saveWorkspace(join(workspaceFolder, workspaceFile)));
      }
    }
    return nextAction;
  });

export default makeOnSaveWorkspace;
