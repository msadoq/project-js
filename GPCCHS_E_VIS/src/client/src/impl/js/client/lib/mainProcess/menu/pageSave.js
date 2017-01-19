import { getStore } from '../../store/mainStore';
import { getPageModifiedViewsIds } from '../../store/selectors/pages';
import { updateAbsolutePath, setModified } from '../../store/actions/pages';
import { showErrorMessage, getPathByFilePicker } from '../dialog';
import { savePage } from '../../documentManager/savePage';

module.exports = { pageSave, pageSaveAs };


function pageSave(focusedWindow) {
  if (!focusedWindow) {
    return;
  }
  const state = getStore().getState();
  const pageId = state.windows[focusedWindow.windowId].focusedPage;
  if (getPageModifiedViewsIds(state, pageId).length > 0) {
    showErrorMessage(focusedWindow,
      'Error', 'Please, save the views of this page', () => {});
    return;
  }

  const page = state.pages[pageId];
  const store = getStore();
  if (!page.oId && !page.absolutePath) {
    updatePagePath(pageId, store, store.dispatch, (errUp, pId) => {
      if (errUp) {
        return;
      }
      saveFile(pId, store);
    });
  } else {
    saveFile(pageId, store);
  }
}

function pageSaveAs(focusedWindow) {
  const store = getStore();
  const pageId = store.getState().windows[focusedWindow.windowId].focusedPage;
  if (getPageModifiedViewsIds(store.getState(), pageId).length) {
    showErrorMessage(focusedWindow,
      'Error', 'Please, save the views of this page', () => {});
    return;
  }
  updatePagePath(pageId, store, store.dispatch, (errUp, pId) => {
    if (errUp) {
      return;
    }
    saveFile(pId, store);
  });
}

function saveFile(pageId, store) {
  savePage(store.getState(), pageId, false, (err) => {
    if (err) {
      return;
    }
    store.dispatch(setModified(pageId, false));
  });
}

function updatePagePath(pageId, store, dispatch, callback) {
  const state = store.getState();
  getPathByFilePicker(state.hsc.folder, 'Page', 'save', (err, newPagePath) => {
    if (err) {
      callback(err, null);
    }
    dispatch(updateAbsolutePath(pageId, newPagePath));
    callback(null, pageId);
  });
}
