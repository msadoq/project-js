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

function workspaceSave(focusedWindow) {
  if (!focusedWindow) {
    return getStore().dispatch(addGlobalError('Saving failed : no window focused'));
  }
  const state = getStore().getState();
  if (getModifiedWindowsIds(state).length === 0) {
    return getStore().dispatch(addMessage('global', 'info', 'The workspace is already saved'));
  }
  if (getModifiedPagesIds(state).length > 0 || getModifiedViewsIds(state).length > 0) {
    return getStore().dispatch(addGlobalError('Please, save the pages and views of this workspace'));
  }
  if (!state.hsc.file) {
    const oldFolder = state.hsc.folder;
    const file = state.hsc.file;
    getPathByFilePicker(state.hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
      getStore().dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
      saveFile(focusedWindow, (errSaving) => {
        if (errSaving) {
          getStore().dispatch(updatePath(oldFolder, file));
          return getStore().dispatch(addGlobalError(errSaving));
        }
        return getStore().dispatch(addMessage('global', 'success', 'Workspace successfully saved'));
      });
    });
  } else {
    saveFile(focusedWindow, (errSaving) => {
      if (errSaving) {
        return getStore().dispatch(addGlobalError(errSaving));
      }
      return getStore().dispatch(addMessage('global', 'success', 'Workspace successfully saved'));
    });
  }
}

function workspaceSaveAs(focusedWindow) {
  if (!focusedWindow) {
    return getStore().dispatch(addGlobalError('Saving failed : no window focused'));
  }
  const state = getStore().getState();
  if (getModifiedPagesIds(state).length > 0 || getModifiedViewsIds(state).length > 0) {
    getStore().dispatch(addGlobalError('Please, save the pages and views of this workspace'));
  } else {
    const oldFolder = state.hsc.folder;
    const file = state.hsc.file;
    getPathByFilePicker(state.hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
      getStore().dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
      saveFile(focusedWindow, (errSaving) => {
        if (errSaving) {
          getStore().dispatch(updatePath(oldFolder, file));
          return getStore().dispatch(addGlobalError(errSaving));
        }
        return getStore().dispatch(addMessage('global', 'success', 'Workspace successfully saved'));
      });
    });
  }
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
