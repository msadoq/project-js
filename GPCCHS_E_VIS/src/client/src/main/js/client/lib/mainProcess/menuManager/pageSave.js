import { getStore } from '../store';
import { getWorkspaceFolder } from '../../store/reducers/hsc';
import { getWindowFocusedPageId } from '../../store/reducers/windows';
import { getPageIsModified, getPage } from '../../store/reducers/pages';
import { updateAbsolutePath, setModified, setPageOid } from '../../store/actions/pages';
import { getPathByFilePicker } from '../dialog';
import { savePage } from '../../documentManager';
import { add as addMessage } from '../../store/actions/messages';
import { getPageModifiedViewsIds } from './selectors';
import reply from '../../common/ipc/reply';


module.exports = { pageSave, pageSaveAs, hasUnsavedViews };

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

const savePageByFilePicker = (pageId, queryId) => {
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
        dispatch(addMessage(pageId, 'danger', errSaving));
        reply(queryId, errSaving);
        return;
      }
      dispatch(addMessage(pageId, 'success', 'Page successfully saved'));
      reply(queryId, null);
    });
  });
};

function pageSave(focusedWindow, queryId) {
  if (pageAlreadySaved(focusedWindow)) {
    reply(queryId);
    return;
  }
  if (hasUnsavedViews(focusedWindow) && focusedWindow.stopOnUnsavedView) {
    reply(queryId, { err: 'Unsaved views' });
    return;
  }
  const store = getStore();
  const { dispatch, getState } = store;
  const state = getState();

  const { windowId } = focusedWindow;
  const pageId = getWindowFocusedPageId(state, { windowId });
  const page = getPage(state, { pageId });
  if (!page.oId && !page.absolutePath) {
    savePageByFilePicker(pageId, queryId);
  } else {
    saveFile(pageId, getStore(), (errSaving) => {
      if (errSaving) {
        store.dispatch(addMessage(pageId, 'danger', errSaving));
        reply(queryId, { err: 'Saving error' });
        return;
      }
      dispatch(addMessage(pageId, 'success', 'Page successfully saved'));
      reply(queryId, null);
    });
  }
}

function pageSaveAs(focusedWindow, queryId) {
  if (hasUnsavedViews(focusedWindow) && focusedWindow.stopOnUnsavedView) {
    reply(queryId, { err: 'Unsaved views' });
    return;
  }
  const state = getStore().getState();
  const { windowId } = focusedWindow;
  const pageId = getWindowFocusedPageId(state, { windowId });
  savePageByFilePicker(pageId, queryId);
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
