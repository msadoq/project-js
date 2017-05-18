import { getStore } from '../../store/isomorphic';
import { getWorkspaceFolder } from '../../store/reducers/hsc';
import { getWindowFocusedPageId } from '../../store/reducers/windows';
import { getPageIsModified, getPage } from '../../store/reducers/pages';
import { updateAbsolutePath, setModified, setPageOid } from '../../store/actions/pages';
import { getPathByFilePicker } from '../dialog';
import { savePage } from '../../documentManager';
import { addOnce as addMessage } from '../../store/actions/messages';
import { getPageModifiedViewsIds } from './selectors';

module.exports = { pageSave, pageSaveAs };

const hasUnsavedViews = (focusedWindow) => {
  const { getState, dispatch } = getStore();
  const state = getState();
  const { windowId } = focusedWindow;
  const pageId = getWindowFocusedPageId(state, { windowId });
  if (getPageModifiedViewsIds(state, { pageId }).length > 0) {
    dispatch(addMessage(pageId, 'danger', 'Please, save the views of this page'));
    return true;
  }
  return false;
};

const pageAlreadySaved = (focusedWindow) => {
  const { dispatch, getState } = getStore();
  const state = getState();
  const { windowId } = focusedWindow;
  const pageId = getWindowFocusedPageId(state, { windowId });
  const isModified = getPageIsModified(state, { pageId });
  if (!isModified) {
    dispatch(addMessage(pageId, 'info', 'Page already saved'));
    return true;
  }
  return false;
};

const savePageByFilePicker = (pageId) => {
  const store = getStore();
  const { dispatch, getState } = store;
  const state = getState();

  const page = getPage(state, { pageId });
  const folder = getWorkspaceFolder(state);
  getPathByFilePicker(folder, 'Page', 'save', (err, newPagePath) => {
    dispatch(updateAbsolutePath(pageId, newPagePath));
    saveFile(pageId, store, (errSaving) => {
      if (errSaving) {
        dispatch(updateAbsolutePath(pageId, page.absolutePath));
        dispatch(setModified(pageId, page.isModified));
        return dispatch(addMessage(pageId, 'danger', errSaving));
      }
      return dispatch(addMessage(pageId, 'success', 'Page successfully saved'));
    });
  });
};

function pageSave(focusedWindow) {
  if (pageAlreadySaved(focusedWindow) || hasUnsavedViews(focusedWindow)) {
    return;
  }
  const store = getStore();
  const { dispatch, getState } = store;
  const state = getState();

  const { windowId } = focusedWindow;
  const pageId = getWindowFocusedPageId(state, { windowId });
  const page = getPage(state, { pageId });
  if (!page.oId && !page.absolutePath) {
    savePageByFilePicker(pageId);
  } else {
    saveFile(pageId, getStore(), (errSaving) => {
      if (errSaving) {
        store.dispatch(addMessage(pageId, 'danger', errSaving));
        return;
      }
      dispatch(addMessage(pageId, 'success', 'Page successfully saved'));
    });
  }
}

function pageSaveAs(focusedWindow) {
  if (hasUnsavedViews(focusedWindow)) {
    return;
  }
  const state = getStore().getState();
  const { windowId } = focusedWindow;
  const pageId = getWindowFocusedPageId(state, { windowId });
  savePageByFilePicker(pageId);
}

function saveFile(pageId, store, callback) {
  savePage(store.getState(), pageId, (err, oid) => {
    if (err) {
      callback(err);
      return;
    }
    if (oid) {
      store.dispatch(setPageOid(pageId, oid));
    }
    store.dispatch(setModified(pageId, false));
    callback(null);
  });
}
