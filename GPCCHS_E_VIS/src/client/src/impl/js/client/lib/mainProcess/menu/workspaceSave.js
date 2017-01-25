import path from 'path';
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
    return getStore().dispatch(addGlobalError('Saving failed : any window focused'));
  }
  const state = getStore().getState();
  if (getModifiedPagesIds(state).length > 0 || getModifiedViewsIds(state).length > 0) {
    return getStore().dispatch(addGlobalError('Please, save the pages and views of this workspace'));
  }
  if (!state.hsc.file) {
    getPathByFilePicker(state.hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
      if (err) {
        return getStore().dispatch(addGlobalError(err));
      }
      getStore().dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
      saveFile(focusedWindow);
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
    getStore().dispatch(addGlobalError('Please, save the pages and views of this workspace'));
  } else {
    getPathByFilePicker(state.hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
      if (err) {
        return getStore().dispatch(addGlobalError(err));
      }
      if (!err && newWsPath) {
        getStore().dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
        saveFile(focusedWindow);
      }
    });
  }
}

function saveFile(focusedWindow) {
  saveWorkspace(getStore().getState(), true, (errWin, winIds) => {
    if (errWin) {
      return getStore().dispatch(addGlobalError(errWin));
    }
    winIds.forEach((winId) => {
      getStore().dispatch(setModifiedWindow(winId, false));
    });
    const title = getStore().getState().windows[focusedWindow.windowId].title;
    focusedWindow.setTitle(title.concat(' - VIMA'));
    getStore().dispatch(addMessage('global', 'success', 'Workspace successfully saved'));
  });
}
