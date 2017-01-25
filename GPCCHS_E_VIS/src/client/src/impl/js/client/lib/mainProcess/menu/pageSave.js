import { getStore } from '../../store/mainStore';
import { getWindowFocusedPageId } from '../../store/selectors/windows';
import { getPageModifiedViewsIds } from '../../store/selectors/pages';
import { updateAbsolutePath, setModified, setPageOid } from '../../store/actions/pages';
import { getPathByFilePicker } from '../dialog';
import { savePage } from '../../common/documentManager';
import { addOnce as addMessage } from '../../store/actions/messages';

module.exports = { pageSave, pageSaveAs };


function pageSave(focusedWindow) {
  if (!focusedWindow) {
    return;
  }
  const state = getStore().getState();
  const pageId = state.windows[focusedWindow.windowId].focusedPage;
  if (getPageModifiedViewsIds(state, pageId).length > 0) {
    return getStore().dispatch(
      addMessage(getWindowFocusedPageId(getStore().getState(), focusedWindow.windowId),
        'danger',
        'Please, save the views of this page')
      );
  }

  const page = state.pages[pageId];
  const store = getStore();
  if (!page.oId && !page.absolutePath) {
    updatePagePath(pageId, store, store.dispatch, (errUp, pId) => {
      if (errUp) {
        return getStore().dispatch(
          addMessage(getWindowFocusedPageId(getStore().getState(), focusedWindow.windowId),
            'danger',
            'Saving Failed')
          );
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
    return getStore().dispatch(
      addMessage(getWindowFocusedPageId(getStore().getState(), focusedWindow.windowId,
        'danger',
        'Please, save the views of this page')
      ));
  }
  updatePagePath(pageId, store, store.dispatch, (errUp, pId) => {
    if (errUp) {
      return store.dispatch(addMessage(pageId, 'danger', errUp));
    }
    saveFile(pId, store);
  });
}

function saveFile(pageId, store) {
  savePage(store.getState(), pageId, false, (err, oid) => {
    if (err) {
      return store.dispatch(addMessage(pageId, 'danger', err));
    }
    if (oid) {
      store.dispatch(setPageOid(pageId, oid));
    }
    store.dispatch(addMessage(pageId, 'success', 'View saved'));
    store.dispatch(setModified(pageId, false));
  });
}

function updatePagePath(pageId, store, dispatch, callback) {
  const state = store.getState();
  getPathByFilePicker(state.hsc.folder, 'Page', 'save', (err, newPagePath) => {
    if (err) {
      return callback(err, null);
    }
    dispatch(updateAbsolutePath(pageId, newPagePath));
    callback(null, pageId);
  });
}
