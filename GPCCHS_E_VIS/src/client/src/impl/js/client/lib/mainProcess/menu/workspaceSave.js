import path from 'path';
import { getModifiedPagesIds } from '../../store/selectors/pages';
import { getModifiedViewsIds } from '../../store/selectors/views';
import { getStore } from '../../store/mainStore';
import { updatePath } from '../../store/actions/hsc';
import { setModified as setModifiedWindow } from '../../store/actions/windows';
import getPathByFilePicker from '../filePicker';
import { showErrorMessage } from '../dialog';
import { saveWorkspace } from '../../documentsManager/saveWorkspace';

module.exports = { workspaceSave, workspaceSaveAs };


function workspaceSave(focusedWindow) {
  if (!focusedWindow) {
    return;
  }
  const state = getStore().getState();
  if (getModifiedPagesIds(state).length > 0 || getModifiedViewsIds(state).length > 0) {
    showErrorMessage(focusedWindow,
      'Error', 'Please, save the pages and views of this workspace', () => {});
    return;
  }
  if (!state.hsc.file) {
    getPathByFilePicker(state.hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
      if (!err) {
        getStore().dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
        saveFile(focusedWindow);
      }
    });
  } else {
    saveFile(focusedWindow);
  }
}

function workspaceSaveAs(focusedWindow) {
  if (!focusedWindow) {
    return;
  }
  const state = getStore().getState();
  if (getModifiedPagesIds(state).length > 0 || getModifiedViewsIds(state).length > 0) {
    showErrorMessage(focusedWindow,
      'Error', 'Please, save the pages and views of this workspace', () => {});
  } else {
    getPathByFilePicker(state.hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
      if (!err) {
        getStore().dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
        saveFile(focusedWindow);
      }
    });
  }
}

function saveFile(focusedWindow) {
  saveWorkspace(getStore().getState(), false, (errWin, winIds) => {
    if (errWin) {
      return;
    }
    winIds.forEach((winId) => {
      getStore().dispatch(setModifiedWindow(winId, false));
    });
    const title = getStore().getState().windows[focusedWindow.windowId].title;
    focusedWindow.setTitle(title.concat(' - VIMA'));
  });
}
