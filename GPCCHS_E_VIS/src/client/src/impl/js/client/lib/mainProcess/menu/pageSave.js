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
    getPathByFilePicker(state.hsc.folder, 'Page', 'save', (err, newPagePath) => {
      getStore().dispatch(updateAbsolutePath(pageId, newPagePath));
      return saveFile(pageId, store, (errSaving) => {
        if (errSaving) {
          return store.dispatch(addMessage(pageId, 'danger', errSaving));
        }
        return store.dispatch(addMessage(pageId, 'success', 'Page saved'));
      });
    });
  } else {
    return saveFile(pageId, getStore(), (errSaving) => {
      if (errSaving) {
        return store.dispatch(addMessage(pageId, 'danger', errSaving));
      }
      return getStore().dispatch(addMessage(pageId, 'success', 'Page saved'));
    });
  }
}

function pageSaveAs(focusedWindow) {
  const pageId = getStore().getState().windows[focusedWindow.windowId].focusedPage;
  if (getPageModifiedViewsIds(getStore().getState(), pageId).length) {
    return getStore().dispatch(
      addMessage(getWindowFocusedPageId(getStore().getState(), focusedWindow.windowId,
        'danger',
        'Please, save the views of this page')
      ));
  }
  const state = getStore().getState();
  const page = state.pages[pageId];
  getPathByFilePicker(state.hsc.folder, 'Page', 'save', (err, newPagePath) => {
    getStore().dispatch(updateAbsolutePath(pageId, newPagePath));
    return saveFile(pageId, getStore(), (errSaving) => {
      if (errSaving) {
        getStore().dispatch(updateAbsolutePath(pageId, page.absolutePath));
        getStore().dispatch(setModified(pageId, page.isModified));
        getStore().dispatch(addMessage(pageId, 'danger', errSaving));
        return;
      }
      return getStore().dispatch(addMessage(pageId, 'success', 'Page saved'));
    });
  });
}

function saveFile(pageId, store, callback) {
  savePage(store.getState(), pageId, false, (err, oid) => {
    if (err) {
      return callback(err);
    }
    if (oid) {
      store.dispatch(setPageOid(pageId, oid));
    }
    store.dispatch(setModified(pageId, false));
    callback(null);
  });
}
