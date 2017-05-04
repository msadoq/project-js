import { BrowserWindow } from 'electron';
import path from 'path';
import find from 'lodash/fp/find';
import equals from 'lodash/fp/equals';

import { add as addMessage } from '../../store/actions/messages';
import { getPages, getModifiedPagesIds } from '../../store/reducers/pages';
import { getViews, getModifiedViewsIds } from '../../store/reducers/views';
import { updatePath, setWorkspaceModified } from '../../store/actions/hsc';
import { getWorkspaceFile, getWorkspaceFolder, getWorkspaceIsModified } from '../../store/reducers/hsc';
import { saveWorkspace, openWorkspace, openBlankWorkspace } from '../../documentManager';
import { showQuestionMessage, getPathByFilePicker } from '../dialog';
import { getStore } from '../../store/isomorphic';

const isYes = equals(0);
const isNo = equals(1);
const isCancel = equals(2);
const addGlobalError = msg => addMessage('global', 'danger', msg);

function workspaceOpenNew() {
  const store = getStore();
  const { dispatch } = store;
  allDocumentsAreSaved(store, (err) => {
    if (err) {
      dispatch(addGlobalError(err));
      return;
    }
    dispatch(openBlankWorkspace());
  });
}

function workspaceOpen() {
  const store = getStore();
  const { dispatch, getState } = store;
  allDocumentsAreSaved(store, (err) => {
    if (err) {
      return dispatch(addGlobalError(err));
    }
    const folder = getWorkspaceFolder(getState());
    // open the file picker
    return getPathByFilePicker(folder, 'workspace', 'open', (errFile, filePath) => {
      if (filePath) {
        workspaceOpenWithPath({ absolutePath: filePath });
      }
    });
  });
}

function workspaceOpenWithPath({ absolutePath }) {
  const { dispatch } = getStore();
  dispatch(openWorkspace({ absolutePath }));
}

const isPagesSaved = state => getModifiedPagesIds(state).length === 0;
const isViewsSaved = state => getModifiedViewsIds(state).length === 0;

function allDocumentsAreSaved(store, cb) {
  if (!isSaveNeeded(store.getState())) {
    return cb(null);
  }
  return showQuestionMessage(
    BrowserWindow.getFocusedWindow(),
    'Opening new workspace',
    'Workspace is modified. Do you want to save before closing ?',
    ['yes', 'no', 'cancel'],
    (clickedButton) => {
      const state = store.getState();
      const viewsAndPagesAreSaved = isPagesSaved(state) && isViewsSaved(state);
      const file = getWorkspaceFile(state);
      if (isCancel(clickedButton)) { // cancel
        return;
      } else if (isNo(clickedButton)) { // no
        cb(null);
        return;
      } else if (isYes(clickedButton) && !viewsAndPagesAreSaved) {
        cb('Please, save the pages and views of this workspace');
        return;
      } else if (isYes(clickedButton) && !file) { // yes
        const folder = getWorkspaceFolder(state);
        getPathByFilePicker(folder, 'workspace', 'save', (errWk, pathWk) => {
          if (errWk) {
            cb(errWk);
            return;
          }
          store.dispatch(updatePath(path.dirname(pathWk), path.basename(pathWk)));
          saveWorkspace(store.getState(), true, (err) => {
            if (err) {
              cb(err);
              return;
            }
            store.dispatch(setWorkspaceModified(false));
            cb(null);
          });
        });
        return;
      }
      cb(null);
    });
}

// Returns if at least one file is modified
function isSaveNeeded(state) {
  const findIsModified = find(['isModified', true]);
  const workspace = getWorkspaceIsModified(state);
  const page = findIsModified(getPages(state));
  const view = findIsModified(getViews(state));
  return workspace || page || view;
}

export default {
  workspaceOpenNew,
  workspaceOpen,
  workspaceOpenWithPath,
};
