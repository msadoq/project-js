import { BrowserWindow } from 'electron';
import path from 'path';
import _find from 'lodash/find';

import { getModifiedPagesIds } from '../../store/selectors/pages';
import { getModifiedViewsIds } from '../../store/selectors/views';
import { setModified as setModifiedWindow } from '../../store/actions/windows';
import { updatePath, closeWorkspace, isWorkspaceOpening } from '../../store/actions/hsc';
import { saveWorkspace } from '../../documentsManager/saveWorkspace';
import { showQuestionMessage, showErrorMessage, getPathByFilePicker } from '../dialog';
import { getStore } from '../../store/mainStore';
import { openDefaultWorkspace, readWkFile } from '../openWorkspace';

function workspaceOpenNew(focusedWindow) {
  allDocumentsAreSaved(getStore(), getStore().dispatch, (err) => {
    if (err) {
      return showErrorMessage(focusedWindow, 'Error', err, () => {
      });
    }
    const folder = getStore().getState().hsc.folder;
    getStore().dispatch(closeWorkspace());
    openDefaultWorkspace(getStore().dispatch, folder);
  });
}

function workspaceOpen(focusedWindow) {
  allDocumentsAreSaved(getStore(), getStore().dispatch, (err) => {
    if (err) {
      return showErrorMessage(focusedWindow, 'Error', err, () => {
      });
    }
    const folder = getStore().getState().hsc.folder;
    // open the file picker
    getPathByFilePicker(folder, 'workspace', 'open', (errFile, filePath) => {
      if (filePath) {
        getStore().dispatch(isWorkspaceOpening(true));
        readWkFile(
          getStore().dispatch,
          getStore().getState,
          path.dirname(filePath),
          path.basename(filePath),
          (errWk) => {
            if (errWk) {
              showErrorMessage(focusedWindow,
                'Error on selected workspace',
                'Invalid Workspace file selected');
            }
            getStore().dispatch(isWorkspaceOpening(false));
          }
        );
      }
    });
  });
}

function allDocumentsAreSaved(store, dispatch, cb) {
  if (!isSaveNeeded(store.getState())) {
    return cb(null);
  }
  return showQuestionMessage(
    BrowserWindow.getFocusedWindow(),
    'Opening new workspace',
    'Workspace is modified. Do you want to save before closing ?',
    ['yes', 'no', 'cancel'],
    (button) => {
      if (button === 2) { // cancel
        return cb('canceled');
      } else if (button === 0) { // yes
        const state = store.getState();
        if (getModifiedPagesIds(state).length > 0
          || getModifiedViewsIds(state).length > 0) {
          cb('Please, save the pages and views of this workspace');
        } else {
          if (!state.hsc.file) {
            getPathByFilePicker(state.hsc.folder, 'workspace', 'save', (errWk, pathWk) => {
              if (errWk) {
                cb(errWk);
              }
              dispatch(updatePath(path.dirname(pathWk), path.basename(pathWk)));
              saveWorkspace(store.getState(), true, (err, winIds) => {
                if (err) {
                  cb(err);
                }
                winIds.forEach((id) => {
                  dispatch(setModifiedWindow(id, false));
                });
              });
            });
          }
          cb(null);
        }
      } else {
        cb(null);
      }
    });
}

// Returns if at least one file is modified
function isSaveNeeded(state) {
  const win = _find(state.windows, ['isModified', true]);
  const page = _find(state.pages, ['isModified', true]);
  const view = _find(state.views, ['isModified', true]);
  return !(!win && !page && !view);
}

export default {
  workspaceOpenNew,
  workspaceOpen
};
