import path from 'path';
import { getModifiedWindowsIds } from '../../store/selectors/windows';
import { getModifiedPagesIds } from '../../store/selectors/pages';
import { getModifiedViewsIds } from '../../store/selectors/views';
import { getStore } from '../../store/mainStore';
import { updatePath } from '../../store/actions/hsc';
import { setModified as setModifiedWindow } from '../../store/actions/windows';
import { addOnce as addMessage } from '../../store/actions/messages';
import { getPathByFilePicker } from '../dialog';
import { saveWorkspace } from '../../common/documentManager';

module.exports = { workspaceSave, workspaceSaveAs };
const addGlobalError = msg => addMessage('global', 'danger', msg);

const hasNoWindowsFocused = (focusedWindow) => {
  const { dispatch } = getStore();
  if (!focusedWindow) {
    dispatch(addGlobalError('Saving failed : no window focused'));
    return true;
  }
  return false;
};

const hasAlreadySaved = () => {
  const { dispatch, getState } = getStore();
  const state = getState();
  if (getModifiedWindowsIds(state).length === 0) {
    dispatch(addMessage('global', 'info', 'The workspace is already saved'));
    return true;
  }
  return false;
};

const hasUnsavedPages = () => {
  const { dispatch, getState } = getStore();
  const state = getState();
  if (getModifiedPagesIds(state).length > 0 || getModifiedViewsIds(state).length > 0) {
    dispatch(addGlobalError('Please, save the pages and views of this workspace'));
    return true;
  }
  return false;
};

const saveWorkspaceByFilePicker = (focusedWindow) => {
  const { dispatch, getState } = getStore();
  const state = getState();
  const oldFolder = state.hsc.folder;
  const file = state.hsc.file;
  getPathByFilePicker(state.hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
    dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
    saveFile(focusedWindow, (errSaving) => {
      if (errSaving) {
        dispatch(updatePath(oldFolder, file));
        return dispatch(addGlobalError(errSaving));
      }
      return dispatch(addMessage('global', 'success', 'Workspace successfully saved'));
    });
  });
};

function workspaceSave(focusedWindow) {
  if (hasNoWindowsFocused(focusedWindow) || hasAlreadySaved() || hasUnsavedPages()) {
    return;
  }
  const { dispatch, getState } = getStore();
  const state = getState();
  if (!state.hsc.file) {
    saveWorkspaceByFilePicker(focusedWindow);
  } else {
    saveFile(focusedWindow, (errSaving) => {
      if (errSaving) {
        return dispatch(addGlobalError(errSaving));
      }
      return dispatch(addMessage('global', 'success', 'Workspace successfully saved'));
    });
  }
}

function workspaceSaveAs(focusedWindow) {
  if (hasNoWindowsFocused(focusedWindow) || hasUnsavedPages()) {
    return;
  }
  saveWorkspaceByFilePicker(focusedWindow);
}

function saveFile(focusedWindow, callback) {
  saveWorkspace(getStore().getState(), true, (errWin, winIds) => {
    if (errWin) {
      callback(errWin);
      return;
    }
    winIds.forEach((winId) => {
      getStore().dispatch(setModifiedWindow(winId, false));
    });
    const title = getStore().getState().windows[focusedWindow.windowId].title;
    focusedWindow.setTitle(title.concat(' - VIMA'));
    callback(null);
  });
}