import { BrowserWindow } from 'electron';
import path from 'path';
import find from 'lodash/fp/find';
import equals from 'lodash/fp/equals';

import { add as addMessage } from '../../store/actions/messages';
import { getModifiedPagesIds } from '../../store/selectors/pages';
import { getModifiedViewsIds } from '../../store/selectors/views';
import { setModified as setModifiedWindow } from '../../store/actions/windows';
import { updatePath } from '../../store/actions/hsc';
import { saveWorkspace } from '../../common/documentManager';
import { showQuestionMessage, getPathByFilePicker } from '../dialog';
import { getStore } from '../../store/mainStore';
import openDefaultWorkspace from '../../documentManager/openBlankWorkspace';
import { openWorkspace } from '../../documentManager/openWorkspace';

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
    dispatch(openDefaultWorkspace());
  });
}

function workspaceOpen() {
  const store = getStore();
  const { dispatch, getState } = store;
  allDocumentsAreSaved(store, (err) => {
    if (err) {
      return dispatch(addGlobalError(err));
    }
    const folder = getState().hsc.folder;
    // open the file picker
    return getPathByFilePicker(folder, 'workspace', 'open', (errFile, filePath) => {
      if (filePath) {
        workspaceOpenWithPath({ filePath });
      }
    });
  });
}

function workspaceOpenWithPath({ filePath }) {
  const { dispatch } = getStore();
  dispatch(openWorkspace({ absolutePath: filePath }));
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
      if (isCancel(clickedButton)) { // cancel
        return;
      } else if (isNo(clickedButton)) { // no
        cb(null);
        return;
      } else if (isYes(clickedButton) && !viewsAndPagesAreSaved) {
        cb('Please, save the pages and views of this workspace');
        return;
      } else if (isYes(clickedButton) && !state.hsc.file) { // yes
        getPathByFilePicker(state.hsc.folder, 'workspace', 'save', (errWk, pathWk) => {
          if (errWk) {
            cb(errWk);
            return;
          }
          store.dispatch(updatePath(path.dirname(pathWk), path.basename(pathWk)));
          saveWorkspace(store.getState(), true, (err, winIds) => {
            if (err) {
              cb(err);
              return;
            }
            winIds.forEach((id) => {
              store.dispatch(setModifiedWindow(id, false));
            });
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
  const win = findIsModified(state.windows);
  const page = findIsModified(state.pages);
  const view = findIsModified(state.views);
  return !(!win && !page && !view);
}

export default {
  workspaceOpenNew,
  workspaceOpen,
  workspaceOpenWithPath,
};
