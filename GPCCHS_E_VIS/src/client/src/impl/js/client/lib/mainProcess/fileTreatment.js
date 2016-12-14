import _map from 'lodash/map';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _each from 'lodash/each';
import { v4 } from 'node-uuid';
import path from 'path';
import { dialog, BrowserWindow } from 'electron';
import { add as addView,
         updateAbsolutePath as updateAbsViewPath,
         setModified as setModifiedView
       } from '../store/actions/views';
import { addAndMount as addAndMountView,
         updateAbsolutePath as updateAbsPagePath
       } from '../store/actions/pages';
import { addAndMount as addAndMountPage,
         setModified as setModifiedWindow
       } from '../store/actions/windows';
import { updatePath } from '../store/actions/hsc';
import { extractViews, readViews } from '../documentsManager/extractViews';
import { readPages } from '../documentsManager/extractPages';
import { getStore } from '../store/mainStore';
import getPathByFilePicker from './filePicker';
import { saveWorkspace } from '../documentsManager/saveWorkspace';
import { saveView } from '../documentsManager/saveView';
import { requestPathFromOId } from './websocket';
import { getModifiedPagesIds } from '../store/selectors/pages';
import { getModifiedViewsIds } from '../store/selectors/views';

export function showErrorMessage(focusedWindow, errTitle, errMsg) {
  dialog.showMessageBox(
    focusedWindow,
    {
      type: 'error',
      title: errTitle,
      message: errMsg,
      buttons: ['ok'],
    });
}

export function openPage(absolutePath, windowId) {
  if (!absolutePath) {
    //  callback(new Error('No filepath'));
    return;
  }
  const focusedWindow = BrowserWindow.getFocusedWindow();
  readPages(undefined, [{ absolutePath }], requestPathFromOId, (pageErr, pages) => {
    if (pageErr) {
      return showErrorMessage(focusedWindow,
        'Error on selected page',
        'Invalid Page file selected');
    }
    const content = { pages: {} };
    const uuid = v4();
    content.pages[uuid] = pages[0];
    extractViews(content, requestPathFromOId, (viewErr, pageAndViews) => {
      if (viewErr) {
        return showErrorMessage(focusedWindow,
          'Error on selected page',
          'Invalid Page file selected');
      }
      showSelectedPage(pageAndViews, uuid, windowId);
    });
  });
}

export function openView(absolutePath, pageId) {
  if (!absolutePath) {
    return;
  }
  const viewPath = [{ absolutePath }];
  readViews(viewPath, requestPathFromOId, (errView, view) => {
    if (errView) {
      showErrorMessage(BrowserWindow.getFocusedWindow(),
        'Error on selected view',
        'Invalid View file selected');
      return;
    }
    const current = view[0];
    current.absolutePath = absolutePath;
    showSelectedView(current, pageId);
  });
}

function showSelectedPage(pageAndViews, pageId, windowId) {
  const store = getStore();
  const layout = _map(pageAndViews.views, v => ({
    i: v.uuid,
    x: v.geometry.x,
    y: v.geometry.y,
    w: v.geometry.w,
    h: v.geometry.h,
  }));
  const viewIds = Object.keys(pageAndViews.views);
  viewIds.forEach((index) => {
    const view = pageAndViews.views[index];
    store.dispatch(addView(index, view.type, view.configuration, view.path, view.oId,
      view.absolutePath, false));
  });
  const page = pageAndViews.pages[pageId];
  page.layout = layout;
  page.views = viewIds;
  store.dispatch(addAndMountPage(windowId, pageId, page));
  // TODO set isModified to false
}

function showSelectedView(view, pageId) {
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
}

export function addNewView(focusedWindow, view) {
  const pageId = getStore().getState().windows[focusedWindow.windowId].focusedPage;
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
  getStore().dispatch(setModifiedView(viewId, true));
}

function addViewInLayout(pageId, viewId) {
  if (!viewId) {
    return;
  }
  if (!getStore().getState().pages[pageId]) {
    return [{ i: viewId, w: 5, h: 5, x: 0, y: 0 }];
  }
  return getStore().getState().pages[pageId].layout.concat({
    i: viewId, w: 5, h: 5, x: 0, y: 0
  });
}

// Returns if at least one file is modified considering level
export function isSaveNeeded(type, state) {
  const win = _find(state.windows, ['isModified', true]);
  const page = _find(state.pages, ['isModified', true]);
  const view = _find(state.views, ['isModified', true]);
  return !(!win && !page && !view);
}

// returns if all documents have a path or an oId given
export function ungivenPaths(all = false) {
  const state = getStore().getState();
  const ungivenPath = { workspace: false };
  ungivenPath.views = _reduce(state.views, (list, view, key) => {
    if ((!view.oId && !view.absolutePath) || all) {
      list.push(key);
    }
    return list;
  }, []);
  ungivenPath.pages = _reduce(state.pages, (list, page, key) => {
    if ((!page.oId && !page.absolutePath) || all) {
      list.push(key);
    }
    return list;
  }, []);
  if (!state.hsc.file || all) {
    ungivenPath.workspace = true;
  }
  return ungivenPath;
}

export function allDocumentsAreSaved(store, dispatch, cb) {
  if (!isSaveNeeded('workspace', store.getState())) {
    return cb(null);
  }
  return dialog.showMessageBox(
    BrowserWindow.getFocusedWindow(),
    {
      type: 'question',
      title: 'Opening new workspace',
      message: 'Workspace is modified. Do you want to save before closing ?',
      buttons: ['yes', 'no', 'cancel']
    }, (button) => {
      if (button === 2) { // cancel
        return cb('canceled');
      } else if (button === 0) { // yes
        if (getModifiedPagesIds(store.getState()).length > 0
          || getModifiedViewsIds(store.getState()).length > 0) {
          cb('Please, save the pages and views of this workspace');
        } else if (ungivenPaths().workspace) {
          getPathByFilePicker(store.getState().hsc.folder, 'workspace', 'save', (errWk, pathWk) => {
            if (errWk) {
              cb(errWk);
            }
            dispatch(updatePath(path.dirname(pathWk), path.basename(pathWk)));
            saveWorkspace(store.getState(), true, (err, winIds) => {
              if (err) {
                cb(err);
              }
              winIds.forEach((id) => {
                dispatch(setModifiedWindow(id, false));
              });
              updateSavedWinTitle();
              cb(null);
            });
          });
        } else {
          cb(null);
        }
      } else {
        cb(null);
      }
    });
}

export function updateViewPath(viewId, store, dispatch, callback) {
  const state = store.getState();
  const view = state.views[viewId];
  getPathByFilePicker(state.hsc.folder, `View '${view.configuration.title}'`, 'save', (err, newViewPath) => {
    if (err) {
      callback(err, null);
    }
    dispatch(updateAbsViewPath(viewId, newViewPath));
    callback(null, viewId);
  });
}

export function updatePagePath(pageId, store, dispatch, callback) {
  const state = store.getState();
  const page = state.pages[pageId];
  getPathByFilePicker(state.hsc.folder, `Page '${page.title}'`, 'save', (err, newPagePath) => {
    if (err) {
      callback(err, null);
    }
    dispatch(updateAbsPagePath(pageId, newPagePath));
    callback(null, pageId);
  });
}

export function updateWorkspacePath(workspaceToSave, store, dispatch, callback) {
  if (workspaceToSave) {
    getPathByFilePicker(store.getState().hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
      if (err) {
        return;
      }
      dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
      callback(null, workspaceToSave);
    });
  }
}


export function saveOneView(viewId, as = false) {
  const state = getStore().getState();
  if (as || (!state[viewId].oId && !state[viewId].path && state[viewId].absolutePath)) {
    saveView(state, viewId);
  } else {
    updateViewPath(viewId, getStore(), getStore().dispatch, (err, vId) => {
      if (err) {
        return;
      }
      saveView(getStore().getState(), vId, (errSave, id) => {
        if (errSave) {
          return;
        }
        getStore().dispatch(setModifiedView(id, false));
      });
    });
  }
}

function updateSavedWinTitle() {
  const windows = BrowserWindow.getAllWindows();
  _each(windows, (window) => {
    let title = window.getTitle();
    if (title.startsWith('* ')) {
      title = title.substring(2);
    }
    window.setTitle(title);
  });
}
