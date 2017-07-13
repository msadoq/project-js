import { join } from 'path';
import * as types from '../../../types';
import { getWorkspaceNewPagesIds, getWorkspaceHasNewPages, getNewViewIds } from '../selectors';
import { getWorkspaceFile, getWorkspaceFolder } from '../../../reducers/hsc';

const onSaveWorkspace = documentManager => (
  ({ dispatch, openDialog, openModal, getState }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.WS_ASK_SAVE_WORKSPACE) {
      const { windowId } = action.payload;
      const state = getState();
      const workspaceFile = getWorkspaceFile(state);
      const workspaceFolder = getWorkspaceFolder(state);

      const saveAs = action.payload.saveAs || (!workspaceFile && !workspaceFolder);
      if (getWorkspaceHasNewPages(state)) {
        openModal(windowId, {
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
        });
      } else if (saveAs) {
        openDialog(windowId, 'save', {}, (closeAction) => {
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
    return returnedAction;
  });

export default onSaveWorkspace;
