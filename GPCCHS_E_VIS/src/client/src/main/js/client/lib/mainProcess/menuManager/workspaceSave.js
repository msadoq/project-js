import path from 'path';
import { getModifiedPagesIds } from '../../store/reducers/pages';
import { getModifiedViewsIds } from '../../store/reducers/views';
// import { getWindowTitle } from '../../store/reducers/windows';
import { getWorkspaceFile, getWorkspaceFolder } from '../../store/reducers/hsc';
import { getStore } from '../../store/mainStore';
import { updatePath } from '../../store/actions/hsc';
import { setModified as setModifiedWindow } from '../../store/actions/windows';
import { addOnce as addMessage } from '../../store/actions/messages';
import { getModifiedWindowsIds } from './selectors';
import { getPathByFilePicker } from '../dialog';
import { saveWorkspace } from '../../documentManager';

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
  const oldFolder = getWorkspaceFolder(state);
  const file = getWorkspaceFile(state);
  getPathByFilePicker(oldFolder, 'Workspace', 'save', (err, newWsPath) => {
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
  const file = getWorkspaceFile(getState());
  if (!file) {
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
    callback(null);
  });
}
